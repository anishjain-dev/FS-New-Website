'use strict';

require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { generateCampusHTML, DEFAULT_SECTIONS } = require('./template');

// ── Auth config (loaded from .env) ───────────────────────────────────────────
const GOOGLE_CLIENT_ID     = process.env.GOOGLE_CLIENT_ID     || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const SESSION_SECRET       = process.env.SESSION_SECRET       || 'fs-cms-secret-2026';
const BASE_URL             = process.env.BASE_URL             || 'http://localhost:3000';

// Auth enabled only when real credentials are present
const AUTH_ENABLED = GOOGLE_CLIENT_ID !== 'PASTE_YOUR_CLIENT_ID_HERE';

// Multer storage: save to campus folder or images/ subfolder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const id = req.params.id;
    const campusFile = path.join(__dirname, 'data', `${id}.json`);
    let folder = path.join(__dirname, id);
    if (fs.existsSync(campusFile)) {
      try {
        const d = JSON.parse(fs.readFileSync(campusFile, 'utf8'));
        folder = path.join(__dirname, d.folder || id);
      } catch {}
    }
    const imgDir = path.join(folder, 'images');
    if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
    cb(null, imgDir);
  },
  filename(req, file, cb) {
    // Keep original filename
    cb(null, file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

const app = express();
const PORT = 3000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data');
const USERS_FILE = path.join(DATA, 'users.json');

// ── Users helpers ────────────────────────────────────────────────────────────
function readUsers() {
  try { return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8')); } catch { return []; }
}
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
}
function findUser(email) { return readUsers().find(u => u.email === email); }
function isAdmin(user) { return user && user.role === 'admin'; }
function canEditCampus(user, campusId) {
  if (!user) return false;
  if (user.role === 'admin') return true;
  return user.role === 'editor' && (user.campuses || []).includes(campusId);
}

// ── Session & Passport ───────────────────────────────────────────────────────
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 } // 7 days
}));
app.use(passport.initialize());
app.use(passport.session());

if (AUTH_ENABLED) {
  passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/auth/google/callback`
  }, (accessToken, refreshToken, profile, done) => {
    const email = (profile.emails[0] || {}).value || '';
    let user = findUser(email);
    if (!user) return done(null, false, { message: 'no_access' });
    // Update googleId and photo
    const users = readUsers();
    const idx = users.findIndex(u => u.email === email);
    if (idx >= 0) {
      users[idx].googleId = profile.id;
      users[idx].name = users[idx].name || profile.displayName;
      users[idx].photo = (profile.photos[0] || {}).value || '';
      writeUsers(users);
      user = users[idx];
    }
    return done(null, user);
  }));
}

passport.serializeUser((user, done) => done(null, user.email));
passport.deserializeUser((email, done) => {
  const user = findUser(email);
  done(null, user || false);
});

// ── Auth middleware ──────────────────────────────────────────────────────────
function requireLogin(req, res, next) {
  if (!AUTH_ENABLED) return next(); // dev mode: no auth
  if (req.isAuthenticated()) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'Not authenticated' });
  res.redirect('/admin/login.html');
}
function requireAdmin(req, res, next) {
  if (!AUTH_ENABLED) return next();
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  if (!isAdmin(req.user)) return res.status(403).json({ error: 'Admin access required' });
  next();
}
function requireCampusAccess(req, res, next) {
  if (!AUTH_ENABLED) return next();
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  const campusId = req.params.id;
  if (!canEditCampus(req.user, campusId)) return res.status(403).json({ error: 'No access to this campus' });
  next();
}

// ── Google OAuth routes ───────────────────────────────────────────────────────
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/admin/login.html?error=no_access' }),
  (req, res) => res.redirect('/admin')
);
app.get('/auth/logout', (req, res) => {
  req.logout(() => res.redirect('/admin/login.html'));
});

// ── Me endpoint ───────────────────────────────────────────────────────────────
app.get('/api/me', (req, res) => {
  if (!AUTH_ENABLED) return res.json({ name: 'Dev Mode', role: 'admin', email: '' });
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Not authenticated' });
  const { name, email, role, photo, campuses } = req.user;
  res.json({ name, email, role, photo, campuses });
});

app.use(express.json());

// ── Admin HTML routes (protected — must be BEFORE express.static) ─────────────
app.get('/admin', requireLogin, (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'index.html'));
});
app.get('/admin/', requireLogin, (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'index.html'));
});
app.get('/admin/index.html', requireLogin, (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'index.html'));
});
app.get('/admin/edit.html', requireLogin, (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'edit.html'));
});
app.get('/admin/users.html', requireLogin, requireAdmin, (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'users.html'));
});

// Login page always public
app.get('/admin/login.html', (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'login.html'));
});

// Static files (campus HTML, images, assets) — after protected routes
app.use(express.static(ROOT));

// ── User management API (admin only) ─────────────────────────────────────────
app.get('/api/users', requireAdmin, (req, res) => {
  res.json(readUsers());
});
app.post('/api/users', requireAdmin, (req, res) => {
  const { email, name, role, campuses } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });
  const users = readUsers();
  const idx = users.findIndex(u => u.email === email);
  const entry = { googleId: (users[idx] || {}).googleId || '', email, name: name || '', role: role || 'editor', campuses: role === 'admin' ? [] : (campuses || []), photo: (users[idx] || {}).photo || '' };
  if (idx >= 0) users[idx] = entry; else users.push(entry);
  writeUsers(users);
  res.json({ success: true });
});
app.delete('/api/users/:email', requireAdmin, (req, res) => {
  const email = decodeURIComponent(req.params.email);
  const users = readUsers().filter(u => u.email !== email);
  writeUsers(users);
  res.json({ success: true });
});

// GET /api/campuses — filtered by user access
app.get('/api/campuses', requireLogin, (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(DATA, 'campuses.json'), 'utf8'));
    // Editors only see their assigned campuses
    if (AUTH_ENABLED && req.user && req.user.role === 'editor') {
      return res.json(data.filter(c => (req.user.campuses || []).includes(c.id)));
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/campus/:id
app.get('/api/campus/:id', requireLogin, requireCampusAccess, (req, res) => {
  const id = req.params.id;
  const file = path.join(DATA, `${id}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Campus not found' });
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    // Runtime migration: inject default sections if missing
    if (!data.sections) {
      data.sections = DEFAULT_SECTIONS.map(s => Object.assign({}, s));
    }
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/campus/new — create new campus (admin only)
app.post('/api/campus/new', requireAdmin, (req, res) => {
  try {
    const body = req.body;
    const id = body.id || body.folder;
    if (!id) return res.status(400).json({ error: 'id is required' });

    const campusFile = path.join(DATA, `${id}.json`);
    const folder = path.join(ROOT, body.folder || id);

    // Create folder if needed
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });

    // Build campus data with defaults
    const campusData = Object.assign({
      id,
      folder: body.folder || id,
      name: body.name || id,
      shortCode: body.shortCode || id.toUpperCase(),
      color: body.color || '#005BAA',
      launched: false,
      metaTitle: body.name || id,
      metaDescription: '',
      logo: `${id}-logo.png`,
      heroImage: `${id}-hero.jpg`,
      heroHeading: body.name || id,
      heroSubtext: '',
      heroButtonPrimary: 'Explore Campus',
      heroButtonSecondary: 'Apply for Admission',
      utilBar: { policyLabel: 'Child Protection Policy', policyFile: `${(body.shortCode || id).toUpperCase()} Child Protection Policy.pdf`, phones: [], email: '' },
      nav: { about: { label: `About ${body.shortCode || id.toUpperCase()}` }, academics: { label: 'Academics' }, admissions: { label: 'Admissions' }, campusLife: { label: 'Campus Life' }, contact: { label: 'Contact Us' }, policies: { label: 'Policies' } },
      tabs: [
        { id: 'about-tab', label: `About ${body.shortCode || id.toUpperCase()}` },
        { id: 'academics-tab', label: 'Academics' },
        { id: 'admissions-tab', label: 'Admissions' },
        { id: 'policies-tab', label: 'Policies' },
        { id: 'life-tab', label: 'Student Life' },
        { id: 'media-tab', label: 'Media' },
        { id: 'contact-tab', label: 'Contact' }
      ],
      stats: [],
      about: { sectionLabel: `About ${body.shortCode || id.toUpperCase()}`, heading: body.name || id, intro: '', image: '', imageCaption: '', leadershipHeading: 'People', leadershipLabel: 'Leadership', leaders: [] },
      academics: { sectionLabel: 'Academics', heading: 'Academic Programmes', programmes: [], learningModelHeading: 'The FS Learning Model', learningModelLabel: 'Learning Philosophy', learningModelQuote: '', learningModelText1: '', learningModelText2: '', mythsHeading: 'Common Myths', mythsLabel: 'Demystifying IB', myths: [] },
      admissions: { sectionLabel: 'Admissions', heading: 'How admission works', subheading: '', processHeading: 'The PAE Process', steps: [], docsRequired: [] },
      contact: { sectionLabel: 'Contact', heading: `Reach ${body.name || id}`, phones: [], email: '', whatsapp: '', address: '', mapEmbed: '', instagram: '', facebook: '', youtube: '', linkedin: '' },
      studentLife: { sectionLabel: 'Student Life', heading: 'Life at Campus', sportsLabel: 'Sports', sportsHeading: 'Sports Facilities', sportsBody: '', sportsTags: [], hdpHeading: 'HDP Programme', hdpBody: '' },
      footer: { description: body.name || id, year: new Date().getFullYear().toString() },
      ctaBand: { heading: `See ${body.shortCode || id.toUpperCase()} for yourself`, subtext: '', buttonLabel: 'Book a Campus Visit' }
    }, body);

    // Write campus JSON
    fs.writeFileSync(campusFile, JSON.stringify(campusData, null, 2), 'utf8');

    // Generate HTML
    const html = generateCampusHTML(campusData);
    fs.writeFileSync(path.join(folder, 'index.html'), html, 'utf8');

    // Update campuses.json
    const campusesFile = path.join(DATA, 'campuses.json');
    const campuses = JSON.parse(fs.readFileSync(campusesFile, 'utf8'));
    const existing = campuses.findIndex(c => c.id === id);
    const entry = { id, folder: campusData.folder, name: campusData.name, shortCode: campusData.shortCode, color: campusData.color, launched: campusData.launched };
    if (existing >= 0) campuses[existing] = entry;
    else campuses.push(entry);
    fs.writeFileSync(campusesFile, JSON.stringify(campuses, null, 2), 'utf8');

    res.json({ success: true, id, message: `Campus ${id} created successfully.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/campus/:id — update campus
app.post('/api/campus/:id', requireLogin, requireCampusAccess, (req, res) => {
  try {
    const id = req.params.id;
    const campusFile = path.join(DATA, `${id}.json`);

    // Merge with existing if present
    let existing = {};
    if (fs.existsSync(campusFile)) {
      existing = JSON.parse(fs.readFileSync(campusFile, 'utf8'));
    }
    const campusData = Object.assign({}, existing, req.body, { id });

    // Write updated JSON
    fs.writeFileSync(campusFile, JSON.stringify(campusData, null, 2), 'utf8');

    // Regenerate HTML
    const folder = path.join(ROOT, campusData.folder || id);
    if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
    const html = generateCampusHTML(campusData);
    fs.writeFileSync(path.join(folder, 'index.html'), html, 'utf8');

    // Update campuses.json
    const campusesFile = path.join(DATA, 'campuses.json');
    const campuses = JSON.parse(fs.readFileSync(campusesFile, 'utf8'));
    const idx = campuses.findIndex(c => c.id === id);
    const entry = { id, folder: campusData.folder || id, name: campusData.name, shortCode: campusData.shortCode, color: campusData.color, launched: campusData.launched };
    if (idx >= 0) campuses[idx] = entry;
    else campuses.push(entry);
    fs.writeFileSync(campusesFile, JSON.stringify(campuses, null, 2), 'utf8');

    res.json({ success: true, id, message: `Campus ${id} updated and HTML regenerated.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/upload/:id — upload image for a campus
app.post('/api/upload/:id', requireLogin, requireCampusAccess, upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const id = req.params.id;
    const campusFile = path.join(__dirname, 'data', `${id}.json`);
    let folder = id;
    if (fs.existsSync(campusFile)) {
      try { folder = JSON.parse(fs.readFileSync(campusFile, 'utf8')).folder || id; } catch {}
    }
    const url = `/${folder}/images/${req.file.filename}`;
    res.json({ success: true, url, filename: req.file.filename });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE /api/campus/:id — delete campus (admin only)
app.delete('/api/campus/:id', requireAdmin, (req, res) => {
  try {
    const id = req.params.id;
    const campusFile = path.join(DATA, `${id}.json`);
    if (!fs.existsSync(campusFile)) return res.status(404).json({ error: 'Campus not found' });

    // Read campus data to get folder name
    const campusData = JSON.parse(fs.readFileSync(campusFile, 'utf8'));
    const folder = path.join(ROOT, campusData.folder || id);

    // Delete JSON file
    fs.unlinkSync(campusFile);

    // Delete HTML folder recursively
    if (fs.existsSync(folder)) fs.rmSync(folder, { recursive: true, force: true });

    // Remove from campuses.json
    const campusesFile = path.join(DATA, 'campuses.json');
    const campuses = JSON.parse(fs.readFileSync(campusesFile, 'utf8'));
    const updated = campuses.filter(c => c.id !== id);
    fs.writeFileSync(campusesFile, JSON.stringify(updated, null, 2), 'utf8');

    res.json({ success: true, message: `Campus ${id} deleted.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/campus/:id/images — list image files in campus images folder
app.get('/api/campus/:id/images', requireLogin, requireCampusAccess, (req, res) => {
  const id = req.params.id;
  const campusFile = path.join(DATA, `${id}.json`);
  let folder = id;
  if (fs.existsSync(campusFile)) {
    try { folder = JSON.parse(fs.readFileSync(campusFile, 'utf8')).folder || id; } catch {}
  }
  const imgDir = path.join(ROOT, folder, 'images');
  if (!fs.existsSync(imgDir)) return res.json({ files: [] });
  const IMAGE_EXT = /\.(jpe?g|png|gif|webp|svg|avif)$/i;
  const files = fs.readdirSync(imgDir).filter(f => IMAGE_EXT.test(f));
  res.json({ files });
});

app.listen(PORT, () => {
  console.log(`FS Website CMS running at http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});
