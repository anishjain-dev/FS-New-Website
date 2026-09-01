'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { generateCampusHTML } = require('./template');

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

app.use(express.json());
app.use(express.static(ROOT));

// Serve admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(ROOT, 'admin', 'index.html'));
});

// GET /api/campuses
app.get('/api/campuses', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(DATA, 'campuses.json'), 'utf8'));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET /api/campus/:id
app.get('/api/campus/:id', (req, res) => {
  const id = req.params.id;
  const file = path.join(DATA, `${id}.json`);
  if (!fs.existsSync(file)) return res.status(404).json({ error: 'Campus not found' });
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/campus/new — create new campus
app.post('/api/campus/new', (req, res) => {
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
app.post('/api/campus/:id', (req, res) => {
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
app.post('/api/upload/:id', upload.single('image'), (req, res) => {
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

// DELETE /api/campus/:id — delete campus
app.delete('/api/campus/:id', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`FS Website CMS running at http://localhost:${PORT}`);
  console.log(`Admin dashboard: http://localhost:${PORT}/admin`);
});
