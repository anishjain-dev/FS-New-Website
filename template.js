'use strict';

/**
 * generateCampusHTML(data)
 * Generates a complete campus index.html from a campus data object.
 * Section order and visibility are driven by data.sections array.
 */

const DEFAULT_SECTIONS = [
  {id:'s_utilBar_1',  type:'utilBar',     order:0,  visible:true},
  {id:'s_nav_2',      type:'nav',         order:1,  visible:true},
  {id:'s_hero_3',     type:'hero',        order:2,  visible:true},
  {id:'s_stats_4',    type:'stats',       order:3,  visible:true},
  {id:'s_about_5',    type:'about',       order:4,  visible:true},
  {id:'s_academics_6',type:'academics',   order:5,  visible:true},
  {id:'s_admissions_7',type:'admissions', order:6,  visible:true},
  {id:'s_policies_8', type:'policies',    order:7,  visible:true},
  {id:'s_studentLife_9',type:'studentLife',order:8, visible:true},
  {id:'s_media_10',   type:'media',       order:9,  visible:true},
  {id:'s_contact_11', type:'contact',     order:10, visible:true},
  {id:'s_ctaBand_12', type:'ctaBand',     order:11, visible:true},
  {id:'s_footer_13',  type:'footer',      order:12, visible:true}
];

const TAB_TYPES = new Set(['about','academics','admissions','policies','studentLife','media','contact']);
// Maps tab type to its index in the d.tabs array (legacy structure)
const TAB_TYPE_TO_TABS_IDX = {about:0, academics:1, admissions:2, policies:3, studentLife:4, media:5, contact:6};

function generateCampusHTML(data) {
  const d = data;
  const phones = d.utilBar.phones || [];
  const tabs = d.tabs || [];
  const stats = d.stats || [];
  const leaders = (d.about && d.about.leaders) || [];
  const programmes = (d.academics && d.academics.programmes) || [];
  const myths = (d.academics && d.academics.myths) || [];
  const steps = (d.admissions && d.admissions.steps) || [];
  const docs = (d.admissions && d.admissions.docsRequired) || [];
  const contactPhones = (d.contact && d.contact.phones) || [];
  const sportsTags = (d.studentLife && d.studentLife.sportsTags) || [];

  const progColors = [
    'var(--dark)', 'var(--gold)', '#8B6914', 'var(--fs-blue)', '#c0392b', '#0891b2'
  ];

  const programmesHTML = programmes.map((p, i) => `
        <div style="background:white;padding:36px;border-left:4px solid ${progColors[i] || 'var(--dark)'};">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);">${p.ages}</span>
          <h3 style="margin:8px 0;">${p.title}</h3>
          <p>${p.body}</p>
        </div>`).join('');

  const mythsHTML = myths.map(m => `
          <div class="myth-card">
            <div class="myth-q">Myth</div>
            <h4 style="font-family:'Montserrat',serif;font-size:1rem;margin-bottom:10px;">${m.myth}</h4>
            <p class="myth-a">${m.fact}</p>
          </div>`).join('');

  const stepsHTML = steps.map(s => `
            <div class="admission-step-ois">
              <div class="step-circle">${s.letter}</div>
              <div class="step-body">
                <h4>${s.title}</h4>
                <p>${s.body}</p>
              </div>
            </div>`).join('');

  const docsHTML = docs.map(doc => `<li>${doc}</li>`).join('\n              ');

  const leadersHTML = leaders.map(l => `
          <div class="person-ois">
            <div class="person-initials">${l.initials}</div>
            <h4>${l.name}</h4>
            <div class="person-role">${l.role}</div>
            <p>${l.bio}</p>
          </div>`).join('');

  const statsHTML = stats.map(s => `
      <div class="campus-stat"><span class="cnum">${s.value}</span><p>${s.label}</p></div>`).join('');

  const statsGridCols = `repeat(${stats.length},1fr)`;

  const phonesUtilHTML = phones.map((p) => {
    const num = p.replace(/[^0-9]/g, '');
    return `<a href="tel:+91${num}">${p}</a>`;
  }).join('\n      ');

  const contactPhonesHTML = contactPhones.map(p => {
    const num = p.replace(/[^0-9]/g, '');
    return `<a href="tel:+91${num}">${p}</a>`;
  }).join('<br>');

  const sportsTagsHTML = sportsTags.map(t => `<span class="sport-tag">&#9977; ${t}</span>`).join('\n            ');

  const navAbout = (d.nav && d.nav.about && d.nav.about.label) || 'About';
  const navAcademics = (d.nav && d.nav.academics && d.nav.academics.label) || 'Academics';
  const navAdmissions = (d.nav && d.nav.admissions && d.nav.admissions.label) || 'Admissions';
  const navCampusLife = (d.nav && d.nav.campusLife && d.nav.campusLife.label) || 'Campus Life';
  const navContact = (d.nav && d.nav.contact && d.nav.contact.label) || 'Contact Us';
  const navPolicies = (d.nav && d.nav.policies && d.nav.policies.label) || 'Policies';

  const addressHTML = (d.contact.address || '').replace(/\n/g, '<br>');
  const mapEmbed = d.contact.mapEmbed || '';
  const whatsappNum = (d.contact.whatsapp || '').replace(/[^0-9]/g, '');

  // ── Section ordering ────────────────────────────────────────────────────────
  const rawSections = d.sections || DEFAULT_SECTIONS;
  const sorted = [...rawSections]
    .sort((a, b) => a.order - b.order)
    .filter(s => s.visible !== false);

  // Tab sections in their display order
  const tabSections = sorted.filter(s => TAB_TYPES.has(s.type));

  // Map tab type → tab data object from legacy d.tabs array
  const tabDataByType = {};
  Object.entries(TAB_TYPE_TO_TABS_IDX).forEach(([type, idx]) => {
    tabDataByType[type] = tabs[idx] || { id: `${type}-tab`, label: type };
  });

  // Visible index within the tab bar for each type (needed for showTab calls)
  const tabIdx = {};
  tabSections.forEach((s, i) => { tabIdx[s.type] = i; });

  const aboutTabId      = tabDataByType.about.id;
  const academicsTabId  = tabDataByType.academics.id;
  const admTabId        = tabDataByType.admissions.id;
  const policiesTabId   = tabDataByType.policies.id;
  const lifeTabId       = tabDataByType.studentLife.id;
  const mediaTabId      = tabDataByType.media.id;
  const contactTabId    = tabDataByType.contact.id;

  const aIdx   = tabIdx.about       !== undefined ? tabIdx.about       : 0;
  const acIdx  = tabIdx.academics   !== undefined ? tabIdx.academics   : 1;
  const admIdx = tabIdx.admissions  !== undefined ? tabIdx.admissions  : 2;
  const polIdx = tabIdx.policies    !== undefined ? tabIdx.policies    : 3;
  const liIdx  = tabIdx.studentLife !== undefined ? tabIdx.studentLife : 4;
  const meIdx  = tabIdx.media       !== undefined ? tabIdx.media       : 5;
  const coIdx  = tabIdx.contact     !== undefined ? tabIdx.contact     : 6;

  // Tab bar buttons
  const tabBtnsHTML = tabSections.map((s, i) => {
    const td = tabDataByType[s.type];
    if (!td) return '';
    return `\n      <button class="tab-btn${i === 0 ? ' active' : ''}" onclick="showTab('${td.id}',${i})">${td.label}</button>`;
  }).join('');

  // Tab IDs array for JS
  const tabIdsJS = tabSections.map(s => `'${tabDataByType[s.type].id}'`).join(',');

  // ── Section HTML builders ───────────────────────────────────────────────────

  function buildUtilBar() {
    return `
<!-- UTILITY BAR -->
<div class="utility-bar">
  <div class="utility-inner">
    <a href="../policies/${d.utilBar.policyFile}" target="_blank">${d.utilBar.policyLabel}</a>
    <div class="util-right">
      ${phonesUtilHTML}
      <a href="mailto:${d.utilBar.email}">${d.utilBar.email}</a>
    </div>
  </div>
</div>`;
  }

  function buildNav() {
    return `
<!-- HEADER -->
<header class="site-header" id="navbar">
  <div class="header-row">
    <a href="../index.html" class="nav-logo">
      <img src="../images/${d.logo}" alt="${d.name}" style="height:3rem;width:auto;display:block;">
    </a>

    <nav class="nav-desktop" aria-label="Primary">
      <details class="nav-group" name="primary-nav">
        <summary>${navAbout}</summary>
        <div class="nav-submenu">
          <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">${navAbout}</a>
          <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">Values, Mission &amp; Philosophy</a>
          <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">IB Mission Statement</a>
          <a href="#" onclick="showTab('${policiesTabId}',${polIdx})">Child Protection</a>
        </div>
      </details>
      <details class="nav-group" name="primary-nav">
        <summary>${navAcademics}</summary>
        <div class="nav-submenu">
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Academics Overview</a>
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">The Fountainhead Learning Model</a>
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Primary Years Programme</a>
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Middle Years Programme</a>
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Diploma Programme</a>
          <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Demystifying IB Myths</a>
        </div>
      </details>
      <a href="#" onclick="showTab('${admTabId}',${admIdx})">${navAdmissions}</a>
      <details class="nav-group" name="primary-nav">
        <summary>${navCampusLife}</summary>
        <div class="nav-submenu">
          <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Campus Life Overview</a>
          <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Student Life</a>
          <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Student Support</a>
          <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Transport</a>
        </div>
      </details>
      <a href="#" onclick="showTab('${contactTabId}',${coIdx})">${navContact}</a>
      <a href="#" onclick="showTab('${policiesTabId}',${polIdx})">${navPolicies}</a>
    </nav>

    <a class="nav-inquire" href="#" onclick="showTab('${admTabId}',${admIdx})">Enquire</a>

    <button class="hamburger" popovertarget="site-nav" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- MOBILE NAV PANEL -->
<nav id="site-nav" class="nav-panel" popover aria-label="Primary, mobile">
  <details class="panel-group" name="mobile-nav">
    <summary>${navAbout}</summary>
    <div class="panel-submenu">
      <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">${navAbout}</a>
      <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">Values, Mission &amp; Philosophy</a>
      <a href="#" onclick="showTab('${aboutTabId}',${aIdx})">IB Mission Statement</a>
      <a href="#" onclick="showTab('${policiesTabId}',${polIdx})">Child Protection</a>
    </div>
  </details>
  <details class="panel-group" name="mobile-nav">
    <summary>${navAcademics}</summary>
    <div class="panel-submenu">
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Academics Overview</a>
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">The Fountainhead Learning Model</a>
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Primary Years Programme</a>
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Middle Years Programme</a>
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Diploma Programme</a>
      <a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Demystifying IB Myths</a>
    </div>
  </details>
  <a href="#" onclick="showTab('${admTabId}',${admIdx})">${navAdmissions}</a>
  <details class="panel-group" name="mobile-nav">
    <summary>${navCampusLife}</summary>
    <div class="panel-submenu">
      <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Campus Life Overview</a>
      <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Student Life</a>
      <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Student Support</a>
      <a href="#" onclick="showTab('${lifeTabId}',${liIdx})">Transport</a>
    </div>
  </details>
  <a href="#" onclick="showTab('${contactTabId}',${coIdx})">${navContact}</a>
  <a href="#" onclick="showTab('${policiesTabId}',${polIdx})">${navPolicies}</a>
  <a href="#" onclick="showTab('${admTabId}',${admIdx})" class="panel-enquire">Enquire</a>
</nav>`;
  }

  function buildHero() {
    return `
<!-- CAMPUS HERO -->
<section class="campus-hero-ois">
  <img src="../images/${d.heroImage}" alt="${d.name}">
  <div class="campus-hero-ois-overlay"></div>
  <div class="container">
    <div class="campus-hero-ois-content">
      <div class="breadcrumb-ois">
        <a href="../index.html">FS Group</a>
        <span>›</span>
        <span>${d.name}</span>
      </div>
      <h1>${d.heroHeading}</h1>
      <p>${d.heroSubtext}</p>
      <div class="campus-hero-actions">
        <a href="#content" class="btn-hero-primary">${d.heroButtonPrimary} ↓</a>
        <a href="#" onclick="showTab('${admTabId}',${admIdx})" class="btn-hero-outline">${d.heroButtonSecondary}</a>
      </div>
    </div>
  </div>
</section>`;
  }

  function buildStats() {
    return `
<!-- STATS BAND -->
<div class="campus-stats-band">
  <div class="container">
    <div class="campus-stats-inner" style="grid-template-columns:${statsGridCols};">
      ${statsHTML}
    </div>
  </div>
</div>`;
  }

  function buildCtaBand() {
    return `
<!-- CTA BAND -->
<div class="cta-band">
  <div class="container">
    <div class="cta-inner">
      <div>
        <h2>${d.ctaBand.heading}</h2>
        <p>${d.ctaBand.subtext}</p>
      </div>
      <a href="#" onclick="showTab('${contactTabId}',${coIdx})" class="btn-cta-white">${d.ctaBand.buttonLabel} →</a>
    </div>
  </div>
</div>`;
  }

  function buildFooter() {
    return `
<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="f-logo">
          <img src="../images/${d.logo}" alt="${d.name}" style="height:3rem;width:auto;display:block;margin-bottom:12px;filter:brightness(0) invert(1);">
        </div>
        <p>${d.footer.description}</p>
        <div style="margin-top:16px;font-size:0.8rem;color:rgba(255,255,255,0.4);">Part of the <a href="../index.html" style="color:rgba(242,196,24,0.8);">FS Group →</a></div>
      </div>
      <div>
        <h6>Programmes</h6>
        <ul>
          <li><a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Early Years / PYP</a></li>
          <li><a href="#" onclick="showTab('${academicsTabId}',${acIdx})">Middle Years (MYP)</a></li>
          <li><a href="#" onclick="showTab('${academicsTabId}',${acIdx})">IB Diploma (DP)</a></li>
          <li><a href="#" onclick="showTab('${academicsTabId}',${acIdx})">BTec / MLC</a></li>
        </ul>
      </div>
      <div>
        <h6>Policies</h6>
        <ul>
          <li><a href="#" onclick="showTab('${policiesTabId}',${polIdx});window.scrollTo({top:0,behavior:'smooth'})">Child Protection</a></li>
          <li><a href="#" onclick="showTab('${policiesTabId}',${polIdx});window.scrollTo({top:0,behavior:'smooth'})">Academic Integrity</a></li>
          <li><a href="#" onclick="showTab('${policiesTabId}',${polIdx});window.scrollTo({top:0,behavior:'smooth'})">Admissions</a></li>
          <li><a href="#" onclick="showTab('${policiesTabId}',${polIdx});window.scrollTo({top:0,behavior:'smooth'})">Assessment</a></li>
        </ul>
      </div>
      <div>
        <h6>Contact</h6>
        <ul>
          ${contactPhones.map(p => `<li><a href="tel:+91${p.replace(/[^0-9]/g,'')}">${p}</a></li>`).join('\n          ')}
          <li><a href="mailto:${d.contact.email}">${d.contact.email}</a></li>
          <li><a href="https://wa.me/${whatsappNum}">WhatsApp Us</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${d.footer.year} ${d.name}. All rights reserved.</span>
      <div class="footer-policies">
        <a href="#" onclick="showTab('${policiesTabId}',${polIdx});window.scrollTo({top:0,behavior:'smooth'})">Child Protection Policy</a>
        <a href="#">DPDP 2023</a>
        <a href="#" onclick="showTab('${contactTabId}',${coIdx})">Contact Us</a>
        <a href="../index.html">FS Group Home</a>
      </div>
    </div>
  </div>
</footer>`;
  }

  // ── Tab panel builders ──────────────────────────────────────────────────────

  function buildAboutPanel(activeClass) {
    return `
    <!-- --- ABOUT --- -->
    <div class="tab-panel${activeClass}" id="${aboutTabId}">

      <!-- Intro -->
      <div class="about-grid" style="margin-bottom:80px;">
        <div class="about-text">
          <span class="label">${d.about.sectionLabel}</span>
          <h2>${d.about.heading}</h2>
          <p>${d.about.intro}</p>
        </div>
        <div class="about-img">
          <img src="../images/${d.about.image}" alt="${d.about.heading}">
          <div class="about-img-caption">${d.about.imageCaption}</div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- People -->
      <div style="padding-top:80px;">
        <div style="text-align:center; margin-bottom:56px;">
          <span class="label" style="display:flex;justify-content:center;">${d.about.leadershipLabel}</span>
          <h2>${d.about.leadershipHeading}</h2>
        </div>
        <div class="people-grid-ois">
          ${leadersHTML}
        </div>
      </div>
    </div>`;
  }

  function buildAcademicsPanel(activeClass) {
    return `
    <!-- --- ACADEMICS --- -->
    <div class="tab-panel${activeClass}" id="${academicsTabId}">
      <span class="label">${d.academics.sectionLabel}</span>
      <h2 style="margin-bottom:48px;">${d.academics.heading}</h2>

      <!-- Programmes -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);margin-bottom:60px;">
        ${programmesHTML}
      </div>

      <!-- Learning Model -->
      <div class="philosophy-section" style="border-radius:0;margin:0 -40px;padding:64px 40px;">
        <div class="philosophy-inner">
          <div class="philosophy-text">
            <span class="label">${d.academics.learningModelLabel}</span>
            <h2>${d.academics.learningModelHeading}</h2>
            <div class="philosophy-quote">
              <p>"${d.academics.learningModelQuote}"</p>
            </div>
            <p>${d.academics.learningModelText1}</p>
            <p>${d.academics.learningModelText2}</p>
            <a href="../images/FS Learning Model.pdf" download style="display:inline-flex;align-items:center;gap:8px;margin-top:20px;padding:12px 22px;background:var(--gold);color:white;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;text-decoration:none;">↓ Download FS Learning Model (PDF)</a>
          </div>
          <div>
            <div class="ib-programs-grid">
              <div class="ib-prog"><span class="age">3—6</span><h4>Early Years</h4><p>Play, inquiry, agency</p></div>
              <div class="ib-prog"><span class="age">6—11</span><h4>PYP</h4><p>Transdisciplinary inquiry</p></div>
              <div class="ib-prog"><span class="age">11—16</span><h4>MYP</h4><p>Global context, service</p></div>
              <div class="ib-prog"><span class="age">16—19</span><h4>Diploma</h4><p>University preparation</p></div>
            </div>
          </div>
        </div>
      </div>

      <!-- IB Myths -->
      <div style="padding-top:64px;">
        <span class="label">${d.academics.mythsLabel}</span>
        <h2 style="margin-bottom:36px;">${d.academics.mythsHeading}</h2>
        <div class="myth-grid">
          ${mythsHTML}
        </div>
      </div>
    </div>`;
  }

  function buildAdmissionsPanel(activeClass) {
    return `
    <!-- --- ADMISSIONS --- -->
    <div class="tab-panel${activeClass}" id="${admTabId}">
      <span class="label">${d.admissions.sectionLabel}</span>
      <h2 style="margin-bottom:12px;">${d.admissions.heading}</h2>
      <p style="margin-bottom:60px;font-size:1rem;">${d.admissions.subheading}</p>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">
        <div>
          <h3 style="margin-bottom:0;">${d.admissions.processHeading}</h3>
          <div class="admission-steps-ois">
            ${stepsHTML}
          </div>

          <div style="margin-top:48px;padding:32px;background:var(--light-gray);">
            <span class="label">Documents Required</span>
            <ul style="padding-left:20px;color:var(--mid);line-height:2.2;font-size:0.9rem;">
              ${docsHTML}
            </ul>
          </div>
        </div>

        <div>
          <div style="background:var(--dark);padding:40px;margin-bottom:24px;">
            <span class="label" style="color:var(--gold);">Parent Portal</span>
            <h3 style="color:white;margin-bottom:16px;">Nucleus — Your Window In</h3>
            <p style="color:rgba(255,255,255,0.7);">All ${d.shortCode} parents have access to Nucleus — progress tracking, calendars, communication, and more. Available on web and iOS.</p>
            <div class="qlinks" style="margin-top:24px;background:none;grid-template-columns:1fr;">
              <a href="https://parents.fountainheadschools.org/Login" target="_blank" class="qlink" style="background:rgba(255,255,255,0.06);color:white;border:1px solid rgba(255,255,255,0.1);"><span>&#128274;</span> Nucleus Web Portal</a>
              <a href="https://apps.apple.com/in/app/fs-nucleus/id1625806958" target="_blank" class="qlink" style="background:rgba(255,255,255,0.06);color:white;border:1px solid rgba(255,255,255,0.1);"><span>&#128241;</span> Nucleus App (iOS)</a>
              <a href="https://curricle.io" target="_blank" class="qlink" style="background:rgba(255,255,255,0.06);color:white;border:1px solid rgba(255,255,255,0.1);"><span>&#128197;</span> School Calendar (Curricle)</a>
            </div>
          </div>

          <div style="padding:32px;border:1px solid var(--border);">
            <span class="label">Contact Admissions</span>
            <div class="contact-item-ois">
              <div class="contact-icon-ois">&#128222;</div>
              <div><h5>Phone</h5><p>${contactPhones.map((p) => `<a href="tel:+91${p.replace(/[^0-9]/g,'')}">${p}</a>`).join(' &nbsp;/&nbsp; ')}</p></div>
            </div>
            <div class="contact-item-ois">
              <div class="contact-icon-ois">&#9993;</div>
              <div><h5>Email</h5><p><a href="mailto:${d.contact.email}">${d.contact.email}</a></p></div>
            </div>
            <div class="contact-item-ois">
              <div class="contact-icon-ois">&#128172;</div>
              <div><h5>WhatsApp</h5><p><a href="https://wa.me/${whatsappNum}">+91 ${d.contact.phones[0] || ''}</a></p></div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  function buildPoliciesPanel(activeClass) {
    return `
    <!-- --- POLICIES --- -->
    <div class="tab-panel${activeClass}" id="${policiesTabId}">
      <span class="label">Download Policies</span>
      <h2 style="margin-bottom:8px;">${d.shortCode} School Policies</h2>
      <p style="margin-bottom:0;">Click any policy below to open the PDF in a new tab.</p>
      <div class="policies-grid">
        <a href="../policies/${d.shortCode} Child Protection Policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#128737;</div><span>Child Protection Policy</span></a>
        <a href="../policies/${d.shortCode} Admission policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#128196;</div><span>Admission Policy</span></a>
        <a href="../policies/${d.shortCode} Assessment Policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#128203;</div><span>Assessment Policy</span></a>
        <a href="../policies/${d.shortCode} Discipline Policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#128218;</div><span>Discipline Policy</span></a>
        <a href="../policies/${d.shortCode} Language Policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#128172;</div><span>Language Policy</span></a>
        <a href="../policies/${d.shortCode} Academic Integrity policy.pdf" target="_blank" class="policy-card"><div class="policy-icon">&#127891;</div><span>Academic Integrity Policy</span></a>
      </div>
    </div>`;
  }

  function buildStudentLifePanel(activeClass) {
    return `
    <!-- --- STUDENT LIFE --- -->
    <div class="tab-panel${activeClass}" id="${lifeTabId}">
      <span class="label">${d.studentLife.sectionLabel}</span>
      <h2 style="margin-bottom:48px;">${d.studentLife.heading}</h2>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-bottom:80px;">
        <div>
          <span class="label">${d.studentLife.sportsLabel}</span>
          <h3>${d.studentLife.sportsHeading}</h3>
          <p>${d.studentLife.sportsBody}</p>
          <div class="sport-tags">
            ${sportsTagsHTML}
          </div>
          <div style="margin-top:28px;padding:24px;background:var(--dark);color:white;">
            <h4 style="color:white;font-size:1rem;margin-bottom:8px;">${d.studentLife.hdpHeading}</h4>
            <p style="color:rgba(255,255,255,0.7);font-size:0.85rem;margin:0;">${d.studentLife.hdpBody}</p>
          </div>
        </div>
        <div>
          <img src="../images/${d.about.image}" alt="${d.studentLife.sportsHeading}" style="width:100%;height:400px;object-fit:cover;display:block;">
        </div>
      </div>

      <div class="divider"></div>

      <div style="padding-top:64px;">
        <span class="label">Resources</span>
        <h3 style="margin-bottom:8px;">Quick Links for Students &amp; Parents</h3>
        <div class="qlinks">
          <a href="https://parents.fountainheadschools.org/Login" target="_blank" class="qlink"><span>&#128274;</span>Nucleus Web Portal</a>
          <a href="https://apps.apple.com/in/app/fs-nucleus/id1625806958" target="_blank" class="qlink"><span>&#128241;</span>Nucleus App (iOS)</a>
          <a href="https://curricle.io" target="_blank" class="qlink"><span>&#128197;</span>School Calendar</a>
        </div>
      </div>
    </div>`;
  }

  function buildMediaPanel(activeClass) {
    return `
    <!-- --- MEDIA --- -->
    <div class="tab-panel${activeClass}" id="${mediaTabId}">
      <span class="label">Recognition</span>
      <h2 style="margin-bottom:48px;">${d.shortCode} in the News</h2>
      <div class="accolades-grid-ois" style="margin-bottom:64px;">
        <div class="accolade-ois">
          <div class="accolade-year-tag">${d.stats[0] ? d.stats[0].label : ''}</div>
          <h4>${d.stats[0] ? d.stats[0].value + ' ' + d.stats[0].label : ''}</h4>
          <p>Recognised for excellence in education and student outcomes.</p>
        </div>
      </div>
    </div>`;
  }

  function buildContactPanel(activeClass) {
    return `
    <!-- --- CONTACT --- -->
    <div class="tab-panel${activeClass}" id="${contactTabId}">
      <span class="label">${d.contact.sectionLabel}</span>
      <h2 style="margin-bottom:48px;">${d.contact.heading}</h2>

      <div class="contact-grid-ois">
        <div>
          <div class="contact-item-ois">
            <div class="contact-icon-ois">&#128222;</div>
            <div>
              <h5>Phone Numbers</h5>
              <p>${contactPhonesHTML}</p>
            </div>
          </div>
          <div class="contact-item-ois">
            <div class="contact-icon-ois">&#9993;</div>
            <div>
              <h5>Email</h5>
              <p><a href="mailto:${d.contact.email}">${d.contact.email}</a></p>
            </div>
          </div>
          <div class="contact-item-ois">
            <div class="contact-icon-ois">&#128172;</div>
            <div>
              <h5>WhatsApp</h5>
              <p><a href="https://wa.me/${whatsappNum}">+91 ${d.contact.phones[0] || ''}</a></p>
            </div>
          </div>
          <div class="contact-item-ois">
            <div class="contact-icon-ois">&#128205;</div>
            <div>
              <h5>Address</h5>
              <p>${addressHTML}</p>
            </div>
          </div>
          <div class="contact-item-ois">
            <div class="contact-icon-ois">&#9679;</div>
            <div>
              <h5>Follow ${d.shortCode}</h5>
              <div class="social-row">
                ${d.contact.instagram ? `<a href="${d.contact.instagram}" target="_blank" class="soc-btn">IG Instagram</a>` : ''}
                ${d.contact.facebook ? `<a href="${d.contact.facebook}" target="_blank" class="soc-btn">FB Facebook</a>` : ''}
                ${d.contact.youtube ? `<a href="${d.contact.youtube}" target="_blank" class="soc-btn">▶ YouTube</a>` : ''}
                ${d.contact.linkedin ? `<a href="${d.contact.linkedin}" target="_blank" class="soc-btn">in LinkedIn</a>` : ''}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="map-box">
            <iframe src="${mapEmbed}" allowfullscreen loading="lazy"></iframe>
          </div>
          <a href="https://maps.google.com" target="_blank" style="display:inline-flex;align-items:center;gap:8px;margin-top:14px;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);border-bottom:1px solid var(--dark);padding-bottom:2px;">&#128205; Open in Google Maps</a>
        </div>
      </div>
    </div>`;
  }

  function buildTabPanel(sec, i) {
    const activeClass = i === 0 ? ' active' : '';
    switch (sec.type) {
      case 'about':       return buildAboutPanel(activeClass);
      case 'academics':   return buildAcademicsPanel(activeClass);
      case 'admissions':  return buildAdmissionsPanel(activeClass);
      case 'policies':    return buildPoliciesPanel(activeClass);
      case 'studentLife': return buildStudentLifePanel(activeClass);
      case 'media':       return buildMediaPanel(activeClass);
      case 'contact':     return buildContactPanel(activeClass);
      default:            return '';
    }
  }

  function buildTabContainer() {
    const panelsHTML = tabSections.map((sec, i) => buildTabPanel(sec, i)).join('');
    return `
<!-- MAIN CONTENT -->
<section class="section" id="content">
  <div class="container">

    <!-- TAB BAR -->
    <div class="tab-bar">
      ${tabBtnsHTML}
    </div>

    ${panelsHTML}

  </div><!-- container -->
</section>`;
  }

  // ── Assemble body in sorted section order ───────────────────────────────────
  const bodyParts = [];
  let tabContainerInserted = false;

  for (const sec of sorted) {
    if (TAB_TYPES.has(sec.type)) {
      if (!tabContainerInserted) {
        bodyParts.push(buildTabContainer());
        tabContainerInserted = true;
      }
      // Individual tab panels are rendered inside the container above; skip here
    } else if (sec.type === 'custom') {
      bodyParts.push(`\n<div class="section"><div class="container">${(sec.content && sec.content.html) || ''}</div></div>`);
    } else {
      switch (sec.type) {
        case 'utilBar': bodyParts.push(buildUtilBar()); break;
        case 'nav':     bodyParts.push(buildNav());     break;
        case 'hero':    bodyParts.push(buildHero());    break;
        case 'stats':   bodyParts.push(buildStats());   break;
        case 'ctaBand': bodyParts.push(buildCtaBand()); break;
        case 'footer':  bodyParts.push(buildFooter());  break;
      }
    }
  }

  // ── Hash-routing JS (indices are now dynamic) ───────────────────────────────
  const hashRoutingJS = `
const h = window.location.hash;
if(h==='#admissions') showTab('${admTabId}',${admIdx});
else if(h==='#policies') showTab('${policiesTabId}',${polIdx});
else if(h==='#academics') showTab('${academicsTabId}',${acIdx});
else if(h==='#student-life') showTab('${lifeTabId}',${liIdx});
else if(h==='#contact') showTab('${contactTabId}',${coIdx});`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${d.metaTitle}</title>
<meta name="description" content="${d.metaDescription}">
<link rel="stylesheet" href="../css/style.css">
</head>
<body>
${bodyParts.join('\n')}

<script>
const tabs = [${tabIdsJS}];
function showTab(id, idx) {
  tabs.forEach(t => { document.getElementById(t).classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.tab-btn')[idx].classList.add('active');
  document.getElementById('content').scrollIntoView({behavior:'smooth'});
}
${hashRoutingJS}
</script>

<script src="../js/main.js" defer></script>
</body>
</html>`;
}

module.exports = { generateCampusHTML, DEFAULT_SECTIONS };
