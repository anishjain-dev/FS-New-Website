'use strict';

function generateMainHTML(d) {
  const h   = d.hero    || {};
  const a   = d.about   || {};
  const ct  = d.ctaBand || {};
  const con = d.contact || {};
  const ft  = d.footer  || {};
  const dp  = (d.results || {}).dp  || {};
  const myp = (d.results || {}).myp || {};
  const tagline = d.tagline || 'To Nurture Leaders with Character and Competence';

  const phone1 = con.phone1 || '8000-130-031';
  const phone2 = con.phone2 || '0261-3501300';
  const email  = con.email  || 'surat@fountainheadschools.org';
  const wa     = con.whatsapp || '918000130031';
  const addr   = con.address  || 'Opp. Ambetha Water Tank, Nr. Village Kunkni, Rander–Dandi Road, Surat – 395005';

  const footerYear = ft.year || new Date().getFullYear().toString();
  const footerTag  = ft.tagline || 'An IB School Group with six campuses across Surat, Vapi and Chhatrapati Sambhajinagar. Nurturing leaders with character and competence since 2005.';

  // If image value is just a filename (no /), prefix with images/ for root-level index.html
  const imgPath = v => v ? (v.includes('/') ? v : `images/${v}`) : '';

  const heroImgSrc = imgPath(h.image || d.heroImage || '');
  const heroImg = heroImgSrc ? `<img src="${heroImgSrc}" alt="Fountainhead School" class="hero-bg">` : '';
  const aboutImgSrc = imgPath(a.image || '');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escHtml(d.metaTitle || 'Fountainhead Schools — An IB School Group')}</title>
<meta name="description" content="${escAttr(d.metaDescription || '')}">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- UTILITY BAR -->
<div class="utility-bar">
  <div class="utility-inner">
    <a href="policies/FSK Child Protection Policy.pdf" target="_blank">Child Protection Policy</a>
    <div class="util-right">
      <a href="tel:+91${phone1.replace(/[^0-9]/g,'')}">  ${escHtml(phone1)}</a>
      <a href="mailto:${escAttr(email)}">${escHtml(email)}</a>
    </div>
  </div>
</div>

<!-- HEADER -->
<header class="site-header" id="navbar">
  <div class="header-row">
    <a href="index.html" class="nav-logo">
      <img src="images/fs-icon-colour.png" alt="Fountainhead Schools" style="height:3rem;width:auto;display:block;" onerror="this.src='images/fs-main-logo.png'">
    </a>

    <nav class="nav-desktop" aria-label="Primary">
      <details class="nav-group" name="primary-nav">
        <summary>About Us</summary>
        <div class="nav-submenu">
          <a href="#about">About Us Overview</a>
          <a href="#about-story">Our Story &amp; Founders</a>
          <a href="#about-values">Values, Mission &amp; Philosophy</a>
          <a href="#about-mission">IB Mission Statement</a>
        </div>
      </details>
      <details class="nav-group" name="primary-nav">
        <summary>Our Schools</summary>
        <div class="nav-submenu">
          <a href="#campuses">All Campuses</a>
          <a href="fsk/index.html">Fountainhead School Kunkni</a>
          <a href="fsm/index.html">Fountainhead School Malgama</a>
          <a href="fwgs/index.html">Fountainhead Wockhardt Global School</a>
          <a href="falh/index.html">Fountainhead Avadh Learning Hub</a>
          <a href="fpa/index.html">Fountainhead Preschool Adajan</a>
          <a href="fpv/index.html">Fountainhead Preschool Vesu</a>
        </div>
      </details>
      <details class="nav-group" name="primary-nav">
        <summary>Academics</summary>
        <div class="nav-submenu">
          <a href="#academics">Learning Model</a>
          <a href="#academics">Primary Years Programme (PYP)</a>
          <a href="#academics">Middle Years Programme (MYP)</a>
          <a href="#academics">Diploma Programme (DP)</a>
          <a href="#academics">Fountainhead High School Diploma (FHSD)</a>
          <a href="#academics-myths">Demystifying IB Myths</a>
        </div>
      </details>
      <a href="#admissions-steps">Admissions</a>
      <a href="#news">News &amp; Happenings</a>
      <a href="#accolades">Accolades &amp; Certifications</a>
      <details class="nav-group" name="primary-nav">
        <summary>Testimonials</summary>
        <div class="nav-submenu">
          <a href="#testimonials">Voices at the Campuses</a>
          <a href="#testimonials-students">Hear from FSK Students</a>
          <a href="#testimonials-parents">Hear from FSK Parents</a>
        </div>
      </details>
      <a href="#results">Results &amp; University Destinations</a>
      <a href="policies/FSK Child Protection Policy.pdf" target="_blank">Policies</a>
    </nav>

    <a class="nav-inquire" href="#connect">Enquire</a>

    <button class="hamburger" popovertarget="site-nav" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- MOBILE NAV PANEL -->
<nav id="site-nav" class="nav-panel" popover aria-label="Primary, mobile">
  <details class="panel-group" name="mobile-nav">
    <summary>About Us</summary>
    <div class="panel-submenu">
      <a href="#about">About Us Overview</a>
      <a href="#about-story">Our Story &amp; Founders</a>
      <a href="#about-values">Values, Mission &amp; Philosophy</a>
      <a href="#about-mission">IB Mission Statement</a>
    </div>
  </details>
  <details class="panel-group" name="mobile-nav">
    <summary>Our Schools</summary>
    <div class="panel-submenu">
      <a href="#campuses">All Campuses</a>
      <a href="fsk/index.html">Fountainhead School Kunkni</a>
      <a href="fsm/index.html">Fountainhead School Malgama</a>
      <a href="fwgs/index.html">Fountainhead Wockhardt Global School</a>
      <a href="falh/index.html">Fountainhead Avadh Learning Hub</a>
      <a href="fpa/index.html">Fountainhead Preschool Adajan</a>
      <a href="fpv/index.html">Fountainhead Preschool Vesu</a>
    </div>
  </details>
  <details class="panel-group" name="mobile-nav">
    <summary>Academics</summary>
    <div class="panel-submenu">
      <a href="#academics">Learning Model</a>
      <a href="#academics">Primary Years Programme (PYP)</a>
      <a href="#academics">Middle Years Programme (MYP)</a>
      <a href="#academics">Diploma Programme (DP)</a>
      <a href="#academics">Fountainhead High School Diploma (FHSD)</a>
      <a href="#academics-myths">Demystifying IB Myths</a>
    </div>
  </details>
  <a href="#admissions-steps">Admissions</a>
  <a href="#news">News &amp; Happenings</a>
  <a href="#accolades">Accolades &amp; Certifications</a>
  <details class="panel-group" name="mobile-nav">
    <summary>Testimonials</summary>
    <div class="panel-submenu">
      <a href="#testimonials">Voices at the Campuses</a>
      <a href="#testimonials-students">Hear from FSK Students</a>
      <a href="#testimonials-parents">Hear from FSK Parents</a>
    </div>
  </details>
  <a href="#results">Results &amp; University Destinations</a>
  <a href="policies/FSK Child Protection Policy.pdf" target="_blank">Policies</a>
  <a class="panel-enquire" href="#connect">Enquire</a>
</nav>

<!-- HERO -->
<section class="hero">
  ${heroImg}
  <div class="hero-overlay"></div>
  <div class="container">
    <div class="hero-content">
      <div class="hero-eyebrow">${escHtml(h.eyebrow || 'An IB School Group · 6 Campuses · 3 Cities')}</div>
      <h1>${escHtml(h.heading || 'Schools Built Around How Children Actually Learn')}</h1>
      <p class="hero-sub">${escHtml(h.subtext || '')}</p>
      <div class="hero-actions">
        <a href="#campuses" class="btn-hero-primary">${escHtml(h.btnPrimary || 'Explore Admissions')}</a>
        <a href="#about" class="btn-hero-outline">${escHtml(h.btnSecondary || 'Our Philosophy')}</a>
      </div>
    </div>
  </div>
  <div class="hero-scroll">
    <div class="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- TAGLINE BAND -->
<div class="tagline-band">
  <div class="container">
    <h2>"${escHtml(tagline)}"</h2>
  </div>
</div>

<!-- WHO WE ARE -->
<section class="section" id="about">
  <div class="container">
    <div class="about-grid">
      <div class="about-text">
        <span class="label">The Group</span>
        <h2>${escHtml(a.heading || 'One conviction, every campus')}</h2>
        <p>${escHtml(a.body || '')}</p>
        <p>${escHtml(a.subtext || '')}</p>
        <div style="margin-top:36px; display:flex; gap:16px; flex-wrap:wrap;">
          <a href="#campuses" class="btn-hero-primary" style="background:var(--dark);">Find Your Campus →</a>
          <a href="fsk/index.html#admissions" style="display:inline-flex;align-items:center;gap:8px;font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);border-bottom:1px solid var(--dark);padding-bottom:2px;">Apply for Admission</a>
        </div>
      </div>
      <div class="about-img">
        ${aboutImgSrc ? `<img src="${escAttr(aboutImgSrc)}" alt="${escAttr(a.heading || 'Fountainhead School Campus')}">` : ''}
        <div class="about-img-caption">${escHtml(a.imageCaption || '')}</div>
      </div>
    </div>
  </div>
</section>

<!-- FS LOGO DESCRIPTION -->
<div class="divider"></div>
<section class="section-sm" style="padding:80px 0;">
  <div class="container">
    <div style="max-width:800px; margin:0 auto; text-align:center;">
      <span class="label" style="justify-content:center;display:flex;">The FS Logo</span>
      <h2 style="margin-bottom:40px;">The Story Behind Our Symbol</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);">
      <div style="background:white;padding:48px;">
        <div style="font-family:'Montserrat',serif;font-size:3rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:16px;line-height:1;">01</div>
        <p style="font-size:0.95rem;color:var(--mid);line-height:1.9;">The logo shows the relationship between teacher and student. The school — the spring, the source — extends a hand to the student, the stream, the beneficiary. Open arms. An invitation to learn without fear. Children are free to express ideas. Teachers work to bring out each child — not to fill them in.</p>
      </div>
      <div style="background:var(--light-gray);padding:48px;">
        <div style="font-family:'Montserrat',serif;font-size:3rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:16px;line-height:1;">02</div>
        <p style="font-size:0.95rem;color:var(--mid);line-height:1.9;">The logo is about the bond. The one who imparts and the one who receives — together they make something possible that neither could make alone. That bond, when strong, is where learning actually happens. The Fountainhead symbol is a picture of that relationship — the same one at the heart of every campus we run.</p>
      </div>
    </div>
  </div>
</section>
<div class="divider"></div>

<!-- UNIQUELY FS — STATS -->
<section class="stats-section section">
  <div class="container">
    <div class="stats-heading">
      <span class="label">By The Numbers</span>
      <h2>Uniquely Fountainhead</h2>
    </div>
    <div class="stats-grid-ois">
${(d.stats || [
  {label:'Cfore 2026',num:'4th',desc:'Ranked 4th Best Co-Ed Day School in India. Highest nationally in both Pedagogy and Curriculum.'},
  {label:'Campuses',num:'6',desc:'Six campuses across Surat, Vapi and Chhatrapati Sambhajinagar.'},
  {label:'IB Continuum',num:'IB',desc:'Full EY→Diploma continuum across all campuses.'},
  {label:'Philosophy',num:'1',desc:'One shared philosophy of learning — IB world schools.'},
  {label:'Years of IB',num:'20',desc:'Twenty years of IB education in India.'}
]).map(s=>`  <div class="stat-ois">
    <span class="stat-label-top">${escHtml(s.label)}</span>
    <span class="num">${escHtml(s.num)}</span>
    <p>${escHtml(s.desc)}</p>
  </div>`).join('\n')}
    </div>
  </div>
</section>

<!-- OUR SCHOOLS / CAMPUSES -->
<section class="campuses-section" id="campuses">
  <div class="container-wide">
    <div class="campuses-header">
      <div>
        <span class="label">Our Schools</span>
        <h2>Find Your Fountainhead</h2>
      </div>
    </div>
    <div class="campuses-grid-ois">

      <div class="campus-ois" onclick="window.open('fsk/index.html','_blank')">
        <img src="fsk/images/FSK Front Facade Image.jpg" alt="Fountainhead School Kunkni">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Surat, Gujarat</div>
          <h3>Fountainhead School Kunkni</h3>
          <p>India's 4th ranked IB school. Full EY→Diploma continuum on Rander-Dandi Road, Surat.</p>
          <a href="fsk/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <div class="campus-ois" onclick="window.open('fsm/index.html','_blank')">
        <img src="images/fsm-facade.jpg" alt="Fountainhead School Malgama">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Surat, Gujarat</div>
          <h3>Fountainhead School Malgama</h3>
          <p>Full IB continuum campus on Malgama, Surat.</p>
          <a href="fsm/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <div class="campus-ois" onclick="window.open('fwgs/index.html','_blank')" style="background:linear-gradient(135deg,#003d7a 0%,#005BAA 60%,#0070cc 100%);">
        <div class="campus-ois-overlay" style="background:linear-gradient(to top,rgba(0,0,0,0.85) 0%,rgba(0,30,80,0.5) 100%);">
          <div class="campus-ois-city">📍 Chhatrapati Sambhajinagar, Maharashtra</div>
          <h3>Fountainhead Wockhardt Global School</h3>
          <p>IB World School in Maharashtra — EYP to DP.</p>
          <a href="fwgs/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <div class="campus-ois" onclick="window.open('falh/index.html','_blank')" style="background:#0a1628;">
        <img src="images/falh-logo.jpg" alt="FALH" style="opacity:0.55;object-fit:contain;padding:30px;">
        <div class="campus-ois-overlay" style="background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.4) 60%);">
          <div class="campus-ois-city">📍 Vapi, Gujarat</div>
          <h3>Fountainhead Avadh Learning Hub</h3>
          <p>Preschool and after-school programmes in Vapi.</p>
          <a href="falh/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <div class="campus-ois" onclick="window.open('fpa/index.html','_blank')">
        <img src="fpa/images/FPA Front Facade.jpeg" alt="Fountainhead Preschool Adajan">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Adajan, Surat</div>
          <h3>Fountainhead Preschool Adajan</h3>
          <p>Early years programmes for ages 2–6.</p>
          <a href="fpa/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <div class="campus-ois" onclick="window.open('fpv/index.html','_blank')">
        <img src="fpv/images/FPV and FSM Front Facade.JPG" alt="Fountainhead Preschool Vesu">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Vesu, Surat</div>
          <h3>Fountainhead Preschool Vesu</h3>
          <p>Early years programmes for ages 2–6, Vesu.</p>
          <a href="fpv/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- PHILOSOPHY / IB PROGRAMMES -->
<section class="philosophy-section" id="academics">
  <div class="container">
    <div class="philosophy-inner">
      <div class="philosophy-text">
        <span class="label">Philosophy &amp; Academics</span>
        <h2>The full IB continuum — EY to DP</h2>
        <div class="philosophy-quote">
          <p>"The IB aims to develop inquiring, knowledgeable and caring young people who help to create a better and more peaceful world through intercultural understanding and respect."</p>
        </div>
        <p>We run the International Baccalaureate from Early Years through the Diploma Programme. Every programme in the continuum shares one framework — inquiry, action, reflection — and one goal: a student who knows how to learn, not just what to learn.</p>
        <p>Academic competence. Physical fitness. Social and emotional wellbeing. All three, not one at the expense of the others.</p>

        <div id="about-mission" style="margin-top:36px;padding:28px;border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:12px;">IB Mission Statement</span>
          <p style="color:rgba(255,255,255,0.7);font-style:italic;font-size:0.9rem;">"The International Baccalaureate aims to develop inquiring, knowledgeable and caring young people who help to create a better and more peaceful world through intercultural understanding and respect."</p>
        </div>

        <div style="margin-top:20px;padding:28px;border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:12px;">Fountainhead Vision</span>
          <p style="color:rgba(255,255,255,0.7);font-size:0.9rem;">We believe that learning is a lifelong process and seek to inculcate in students, parents and teachers the sheer sense of enjoyment of the learning process — providing a happy, purposeful, safe and nurturing environment.</p>
        </div>
      </div>

      <div>
        <!-- FS LEARNING MODEL DIAGRAM -->
        <div style="text-align:center;margin-bottom:32px;">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:16px;">The FS Learning Model</span>
          <img src="images/fs-learning-model.png" alt="FS Learning Model Diagram" style="max-width:100%;width:420px;height:auto;display:inline-block;">
        </div>
        <div class="ib-programs-grid">
          <div class="ib-prog">
            <span class="age">3–6</span>
            <h4>Early Years / PYP</h4>
            <p>Play-based inquiry rooted in the IB Primary Years Programme</p>
          </div>
          <div class="ib-prog">
            <span class="age">6–11</span>
            <h4>PYP Grade 1–5</h4>
            <p>Six transdisciplinary units of inquiry per year</p>
          </div>
          <div class="ib-prog">
            <span class="age">11–16</span>
            <h4>MYP Grade 6–10</h4>
            <p>Eight subject groups, global context, service as action</p>
          </div>
          <div class="ib-prog">
            <span class="age">16–19</span>
            <h4>IB Diploma DP</h4>
            <p>Internationally recognised university preparation — TOK, EE, CAS</p>
          </div>
        </div>

        <div style="margin-top:32px;padding:32px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:16px;">Parent Role in Education</span>
          <p style="color:rgba(255,255,255,0.7);font-size:0.875rem;">A child's education works best when school and parents run it together. That means PTCs, SLCs, events, home learning, and an honest two-way conversation — not occasional contact.</p>
          <a href="fsk/index.html#academics" style="display:inline-flex;align-items:center;gap:8px;margin-top:16px;font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);border-bottom:1px solid var(--gold);padding-bottom:2px;">Learn More →</a>
        </div>

        <div id="academics-myths" style="margin-top:32px;padding:32px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
          <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:16px;">Demystifying IB Myths</span>
          <p style="color:rgba(255,255,255,0.7);font-size:0.875rem;">Have questions about the IB? <a href="#connect" style="color:var(--gold);border-bottom:1px solid var(--gold);">Talk to our admissions team →</a></p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="values-section" id="about-values" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:url('images/fs-values-banner.jpg');background-size:cover;background-position:center;opacity:0.12;pointer-events:none;"></div>
  <div class="container" style="position:relative;">
    <div style="text-align:center;margin-bottom:60px;">
      <span class="label" style="color:rgba(255,255,255,0.4);justify-content:center;display:flex;">Our Values</span>
      <h2 style="color:white;">What We Stand For</h2>
      <p style="color:rgba(255,255,255,0.55);font-size:0.95rem;margin-top:12px;">To nurture leaders with character and competence.</p>
    </div>
    <div class="values-inner" style="grid-template-columns:repeat(3,1fr);gap:2px;">
      <div class="value-ois"><span class="value-num">01</span><h3>Together, We Thrive.</h3><p>We grow as one — students, teachers, and families. Community is not a backdrop; it is the engine.</p></div>
      <div class="value-ois"><span class="value-num">02</span><h3>Students' Growth, Our Compass.</h3><p>Every decision, every programme, every initiative is oriented toward one question: does this help the student grow?</p></div>
      <div class="value-ois"><span class="value-num">03</span><h3>Make Each Other Better.</h3><p>We challenge, support, and elevate one another — not as competition, but as collaboration.</p></div>
      <div class="value-ois"><span class="value-num">04</span><h3>Learn. Evolve. Excel.</h3><p>Learning does not stop at the school gate. We are a community of lifelong learners — teachers, students, and parents alike.</p></div>
      <div class="value-ois"><span class="value-num">05</span><h3>Take Charge and Follow Through.</h3><p>Ownership. Initiative. Responsibility. The habits built here follow students into every room they walk into.</p></div>
      <div class="value-ois"><span class="value-num">06</span><h3>Character &amp; Competence.</h3><p>Character is doing the right thing when no one is watching. Competence is being good at what you do — academically and beyond. Together, they define our tagline.</p></div>
    </div>
  </div>
</section>

<!-- ACCOLADES -->
<section class="accolades-strip" id="accolades">
  <div class="container">
    <div class="accolades-strip-header">
      <span class="label" style="justify-content:center;display:flex;">Recognition &amp; Awards</span>
      <h2>Accolades &amp; Certifications</h2>
    </div>
    <div class="accolades-grid-ois">
      <div class="accolade-ois"><div class="accolade-year-tag">Cfore 2026</div><h4>4th Best Co-Ed Day School in India</h4><p>Up from 5th in 2025. Two points behind 2nd. Highest in Pedagogy and Curriculum nationally — the second year running we moved up.</p></div>
      <div class="accolade-ois"><div class="accolade-year-tag">Cfore 2025</div><h4>5th Best Co-Ed Day School in India</h4><p>Co-Ed Day Schools — International Curriculum category. The year before we moved to 4th.</p></div>
      <div class="accolade-ois"><div class="accolade-year-tag">IDA Awards 2025</div><h4>Excellence in Wellbeing &amp; Engagement</h4><p>Seven trained counsellors. Two check-ins per student per year. Six Bricks, Leader in Me, Life Classes — wellbeing built into the school day, not added on top of it.</p></div>
      <div class="accolade-ois"><div class="accolade-year-tag">ScooNews 2023</div><h4>Best Skill Development Initiative</h4><p>Maverick Learning Centre — awarded at ScooNews Global Educators Fest, Jaipur. 700+ school leaders. One award.</p></div>
      <div class="accolade-ois"><div class="accolade-year-tag">CareerGuide 2021</div><h4>Career ChangeMakers Award</h4><p>Top Career Development Cell. Received by Anish Nair, Career Counselor, on 17 April 2021.</p></div>
      <div class="accolade-ois"><div class="accolade-year-tag">Great Place to Work</div><h4>Certified Great Place to Work</h4><p>Our staff said so — anonymously, through the Great Place to Work survey. That is the only way this certification works.</p></div>
    </div>
  </div>
</section>

<!-- TIMELINE SECTION -->
<section class="section" id="about-story" style="background:var(--light-gray);padding:80px 0;">
  <div class="container">
    <span class="label">Our Journey</span>
    <h2 style="margin-bottom:12px;">The FS Timeline</h2>
    <p style="color:var(--mid);margin-bottom:48px;max-width:600px;">From 6 students in Adajan to 6 campuses across India — two decades of building schools around how children actually learn.</p>
  </div>
  <div style="overflow-x:auto;padding-bottom:24px;">
    <div style="display:flex;gap:0;min-width:max-content;padding:0 40px;align-items:flex-start;">
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2005</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Founded with 6 students under the brand The Fountainhead Preschool, Adajan</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2008</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Established Fountainhead School, Kunkni</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2011</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Authorized for IB PYP</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2014</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Ankita conferred with the Global Teacher Accreditation award by British Council · Authorized for IB DP</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2016</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">1st Graduating Class of Fountainhead School</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#005BAA;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2017</div><div style="width:1px;height:24px;background:#B8292F;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #B8292F;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Opened 2nd Fountainhead Preschool, Vesu</div><div style="width:1px;height:24px;background:#B8292F;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#005BAA;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2018</div><div style="width:1px;height:24px;background:#B8292F;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #B8292F;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Authorized for IB MYP</div><div style="width:1px;height:24px;background:#B8292F;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#005BAA;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2019</div><div style="width:1px;height:24px;background:#B8292F;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #B8292F;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">In-house project based 'Maverick Learning Centre' established</div><div style="width:1px;height:24px;background:#B8292F;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#005BAA;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2020</div><div style="width:1px;height:24px;background:#B8292F;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #B8292F;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Accredited by MSA-CESS for offering American High School Diploma</div><div style="width:1px;height:24px;background:#B8292F;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#005BAA;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2023</div><div style="width:1px;height:24px;background:#B8292F;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #B8292F;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Ranked Best International School in Surat (EW) · Vardan authored <em>Reimagining Indian Education</em></div><div style="width:1px;height:24px;background:#B8292F;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2024</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Great Place To Work® Certified</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2025</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Stands proudly among India's Top Schools — Ranked 5th Nationwide (Cfore) · Opened 2nd Fountainhead School, Malgama K12 IB School</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#B8292F;color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2026</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #005BAA;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">Fountainhead joined hands with Wockhardt Global School, Chhatrapati Sambhajinagar · Opened 3rd Fountainhead Preschool, Vapi · Ranked 4th Nationwide (Cfore)</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
      <div style="display:flex;flex-direction:column;align-items:center;width:220px;flex-shrink:0;"><div style="background:#F2C418;color:#111;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.85rem;padding:6px 18px;border-radius:20px;margin-bottom:16px;">2027</div><div style="width:1px;height:24px;background:#005BAA;"></div><div style="background:white;border:1px solid var(--border);border-top:3px solid #F2C418;padding:20px;width:100%;box-sizing:border-box;font-size:0.82rem;line-height:1.5;color:#111;">K12 IB School — Next Chapter, Vapi</div><div style="width:1px;height:24px;background:#005BAA;"></div></div>
    </div>
  </div>
</section>

<!-- PEOPLE -->
<section class="section" id="leadership">
  <div class="container">
    <div style="margin-bottom:48px;"><span class="label">Leadership</span><h2>The Fountainhead Team</h2></div>
    <div class="people-grid-ois">
      <div class="person-ois"><div class="person-initials">BP</div><h4>Bhumika Parmar</h4><div class="person-role">Head of School — FSK</div><p>Bhumika Parmar has been associated with Fountainhead School since 2009 — Home Room Teacher, Team Leader, Middle Years Coordinator, and now HOS. She holds degrees in Commerce, Law, Education, and School Leadership Management.</p></div>
      <div class="person-ois"><div class="person-initials">SS</div><h4>Shezin Siganporia</h4><div class="person-role">Senior School Principal — FSK</div><p>A Chartered Accountant who enjoys taking on new challenges. Passionate about Finance and Business Management. Shezin has been working with FS since 2013.</p></div>
      <div class="person-ois"><div class="person-initials">UO</div><h4>Utsav Oza</h4><div class="person-role">Senior School Principal — FSK</div><p>Engineer. Gold medal, SCET. Dewang Mehta IT Award 2017. National quiz competitor — IIM-Ahmedabad, IIT-Bombay. At FS because this is where curiosity is taken seriously.</p></div>
    </div>
  </div>
</section>

<!-- NEWS -->
<section class="news-section bg-light-wrap" id="news" style="background:var(--light-gray);padding:100px 0;">
  <div class="container">
    <div class="news-header">
      <div><span class="label">News &amp; Happenings</span><h2>Latest from the Campuses</h2></div>
      <a href="news.html" class="see-all">View All →</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1px;background:var(--border);margin-bottom:64px;">
      <div style="background:white;overflow:hidden;"><div style="height:200px;overflow:hidden;"><img src="images/fsk-facade.jpg" alt="Cfore 2026" style="width:100%;height:100%;object-fit:cover;"></div><div style="padding:28px;"><div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;"><span style="font-size:0.6rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:3px 8px;background:var(--dark);color:white;">Kunkni</span><span style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.06em;">20 Jul 2026</span></div><h4 style="font-size:1rem;line-height:1.3;margin-bottom:10px;">FSK Ranked 4th Nationally — Highest in Pedagogy &amp; Curriculum</h4><p style="font-size:0.8rem;color:var(--mid);margin-bottom:16px;">Fountainhead School has moved to 4th place nationally in the Cfore 2026 rankings.</p><a href="news/cfore-2026.html" style="font-size:0.65rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);border-bottom:1px solid var(--dark);padding-bottom:2px;">Read More →</a></div></div>
      <div style="background:white;overflow:hidden;"><div style="height:200px;overflow:hidden;"><img src="images/ida-awards-2025-wellbeing-team.png" alt="IDA Awards 2025" style="width:100%;height:100%;object-fit:cover;"></div><div style="padding:28px;"><div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;"><span style="font-size:0.6rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:3px 8px;background:var(--dark);color:white;">Group-Wide</span><span style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.06em;">2025</span></div><h4 style="font-size:1rem;line-height:1.3;margin-bottom:10px;">Honoured at the IDA Awards 2025 — Excellence in Wellbeing</h4><p style="font-size:0.8rem;color:var(--mid);margin-bottom:16px;">7 trained counsellors, Life Classes, Six Bricks, Leader in Me — our wellbeing model earns national recognition.</p><a href="news/ida-awards-2025.html" style="font-size:0.65rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);border-bottom:1px solid var(--dark);padding-bottom:2px;">Read More →</a></div></div>
      <div style="background:white;overflow:hidden;"><div style="height:200px;overflow:hidden;"><img src="images/scoonews-2023-award.png" alt="ScooNews Global 2023" style="width:100%;height:100%;object-fit:cover;"></div><div style="padding:28px;"><div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;"><span style="font-size:0.6rem;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;padding:3px 8px;background:var(--fs-yellow);color:white;">Kunkni</span><span style="font-size:0.65rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.06em;">2023</span></div><h4 style="font-size:1rem;line-height:1.3;margin-bottom:10px;">Best Skill Development Initiative — ScooNews Global 2023</h4><p style="font-size:0.8rem;color:var(--mid);margin-bottom:16px;">Maverick Learning Centre felicitated at ScooNews Global Educators Fest, Jaipur — 700+ school leaders.</p><a href="news/scoonews-2023.html" style="font-size:0.65rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);border-bottom:1px solid var(--dark);padding-bottom:2px;">Read More →</a></div></div>
    </div>
    <div style="margin-top:0;"><span class="label">On YouTube</span><h3 style="margin-bottom:32px;">Fountainhead on Film</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);">
        <div style="background:white;padding:28px;"><div class="video-wrap" style="margin-bottom:16px;"><iframe src="https://www.youtube.com/embed/_zSARmA2aP0" title="Career ChangeMakers Award — Fountainhead School" allowfullscreen></iframe></div><p style="font-size:0.82rem;margin:0;">Career ChangeMakers Award 2021 — Top Career Development Cell</p></div>
        <div style="background:white;padding:28px;"><div class="video-wrap" style="margin-bottom:16px;"><iframe src="https://www.youtube.com/embed/sEyztOfiJA4" title="What and When of Detention — FSK" allowfullscreen></iframe></div><p style="font-size:0.82rem;margin:0;">The What, When &amp; How of Detention — FSK Discipline Policy</p></div>
      </div>
      <p style="margin-top:16px;font-size:0.82rem;">Subscribe to our <a href="https://www.youtube.com/@fountainheadschools" target="_blank" style="color:var(--dark);font-weight:700;border-bottom:1px solid var(--dark);">YouTube Channel →</a> &nbsp;·&nbsp; <a href="news.html" style="color:var(--dark);font-weight:700;border-bottom:1px solid var(--dark);">All News &amp; Happenings →</a></p>
    </div>
  </div>
</section>

<!-- CONNECT WITH US FORM -->
<section id="connect" style="padding:100px 0;background:#f5f7fa;">
  <div class="container">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;">
      <div>
        <span style="font-size:0.65rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--fs-blue);display:block;margin-bottom:14px;">Connect With Us</span>
        <h2 style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:2.4rem;line-height:1.15;margin-bottom:20px;color:var(--dark);">How can we<br>help you?</h2>
        <p style="font-family:'Nunito',sans-serif;font-size:1rem;line-height:1.7;color:var(--gray);margin-bottom:40px;">Please fill in the details below and select the reason for your visit. Our team will get in touch with you shortly.</p>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="display:flex;gap:16px;align-items:flex-start;">
            <div style="width:40px;height:40px;background:var(--fs-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.5 6.5l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--dark);margin-bottom:4px;">Phone</div><a href="tel:+91${phone1.replace(/[^0-9]/g,'')}" style="font-family:'Nunito',sans-serif;font-size:0.95rem;color:var(--gray);text-decoration:none;">${escHtml(phone1)}</a></div>
          </div>
          <div style="display:flex;gap:16px;align-items:flex-start;">
            <div style="width:40px;height:40px;background:var(--fs-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg></div>
            <div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.78rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--dark);margin-bottom:4px;">Email</div><a href="mailto:${escAttr(email)}" style="font-family:'Nunito',sans-serif;font-size:0.95rem;color:var(--gray);text-decoration:none;">${escHtml(email)}</a></div>
          </div>
        </div>
      </div>
      <div style="background:white;padding:44px 40px;box-shadow:0 4px 32px rgba(0,91,171,0.08);">
        <form id="fs-contact-form" onsubmit="handleFSForm(event)">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;">
            <div><label style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);display:block;margin-bottom:8px;">Name *</label><input type="text" name="name" required placeholder="Your full name" style="width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e0e4eb;font-family:'Nunito',sans-serif;font-size:0.9rem;color:var(--dark);outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='#e0e4eb'"></div>
            <div><label style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);display:block;margin-bottom:8px;">Email ID *</label><input type="email" name="email" required placeholder="your@email.com" style="width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e0e4eb;font-family:'Nunito',sans-serif;font-size:0.9rem;color:var(--dark);outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='#e0e4eb'"></div>
          </div>
          <div style="margin-bottom:20px;"><label style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);display:block;margin-bottom:8px;">Contact Number *</label><input type="tel" name="phone" required placeholder="+91 00000 00000" style="width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e0e4eb;font-family:'Nunito',sans-serif;font-size:0.9rem;color:var(--dark);outline:none;transition:border 0.2s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='#e0e4eb'"></div>
          <div style="margin-bottom:20px;"><label style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);display:block;margin-bottom:8px;">Reason for Visit *</label><select name="reason" required style="width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e0e4eb;font-family:'Nunito',sans-serif;font-size:0.9rem;color:var(--dark);outline:none;background:white;appearance:none;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23005BAA' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E&quot;);background-repeat:no-repeat;background-position:right 14px center;transition:border 0.2s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='#e0e4eb'"><option value="" disabled selected>Select a reason</option><option>Admission / School Enquiry</option><option>Campus Visit (School Tour)</option><option>Career / Job Opportunity</option><option>Internship / Work Experience</option><option>Business / Vendor Enquiry</option><option>Collaboration / Partnership</option><option>Media / Press</option><option>Alumni</option><option>Event / Programme</option><option>Other</option></select></div>
          <div style="margin-bottom:28px;"><label style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--dark);display:block;margin-bottom:8px;">Brief Description</label><textarea name="message" rows="4" placeholder="Please write briefly about the reason selected above..." style="width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e0e4eb;font-family:'Nunito',sans-serif;font-size:0.9rem;color:var(--dark);outline:none;resize:vertical;transition:border 0.2s;" onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='#e0e4eb'"></textarea></div>
          <button type="submit" style="width:100%;background:var(--fs-blue);color:white;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.78rem;letter-spacing:0.14em;text-transform:uppercase;padding:16px 24px;border:none;cursor:pointer;transition:background 0.2s;" onmouseover="this.style.background='#004a8f'" onmouseout="this.style.background='var(--fs-blue)'">Send Message →</button>
          <div id="fs-form-msg" style="margin-top:16px;font-family:'Nunito',sans-serif;font-size:0.9rem;display:none;"></div>
        </form>
      </div>
    </div>
  </div>
</section>
<style>@media(max-width:768px){#connect .container > div { grid-template-columns:1fr !important; gap:40px !important; }}</style>
<script>function handleFSForm(e){e.preventDefault();const msg=document.getElementById('fs-form-msg');msg.style.display='block';msg.style.color='var(--gold)';msg.textContent='Thank you! We have received your message and will get in touch with you shortly.';e.target.reset();}</script>

<!-- ADMISSIONS STEPS -->
<section class="section" id="admissions-steps" style="padding:100px 0;background:white;">
  <div class="container">
    <div style="text-align:center;margin-bottom:64px;"><span class="label" style="justify-content:center;display:flex;">Admissions</span><h2>How Admissions Works</h2><p style="color:var(--mid);max-width:540px;margin:16px auto 0;">Four steps. No entrance test. No donation. A warm welcome.</p></div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);">
      <div style="background:white;padding:40px;border-top:4px solid var(--dark);"><div style="font-family:'Montserrat',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:12px;">01</div><h4 style="margin-bottom:12px;">Tell us about your child</h4><p style="color:var(--mid);font-size:0.9rem;">Fill the enquiry form. Read the same day.</p></div>
      <div style="background:white;padding:40px;border-top:4px solid var(--gold);"><div style="font-family:'Montserrat',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:12px;">02</div><h4 style="margin-bottom:12px;">Visit the campus</h4><p style="color:var(--mid);font-size:0.9rem;">See a working school day — we insist on it.</p></div>
      <div style="background:white;padding:40px;border-top:4px solid var(--fs-blue);"><div style="font-family:'Montserrat',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:12px;">03</div><h4 style="margin-bottom:12px;">Conversation with our team</h4><p style="color:var(--mid);font-size:0.9rem;">Relaxed, not a test.</p></div>
      <div style="background:white;padding:40px;border-top:4px solid #2ecc71;"><div style="font-family:'Montserrat',sans-serif;font-size:2.5rem;font-weight:900;color:rgba(0,0,0,0.06);margin-bottom:12px;">04</div><h4 style="margin-bottom:12px;">Offer &amp; welcome</h4><p style="color:var(--mid);font-size:0.9rem;">Fee payment, orientation, warm welcome.</p></div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="section" id="testimonials" style="background:var(--light-gray);padding:100px 0;">
  <div class="container">
    <div style="text-align:center;margin-bottom:64px;"><span class="label" style="justify-content:center;display:flex;">Testimonials — Voices at the Campuses</span><h2>What Our Community Says</h2></div>

    <div id="testimonials-students" style="margin-bottom:48px;">
      <h3 style="font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--fs-blue);margin-bottom:24px;padding-bottom:12px;border-bottom:2px solid var(--fs-blue);">Hear from FSK Students</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);">
        <div style="background:white;padding:48px;"><p style="font-size:1.1rem;line-height:1.8;color:var(--dark);font-style:italic;margin-bottom:28px;">"The IB taught me how to think, not what to think. That difference showed up in my first semester of university — I was not surprised by anything the course demanded."</p><div style="display:flex;align-items:center;gap:16px;"><div style="width:40px;height:40px;border-radius:50%;background:var(--fs-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:white;font-size:0.7rem;font-weight:700;">S</span></div><div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.82rem;color:var(--dark);">FSK Student</div><div style="font-size:0.72rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.08em;">IB Diploma Graduate</div></div></div></div>
        <div style="background:white;padding:48px;"><p style="font-size:1.1rem;line-height:1.8;color:var(--dark);font-style:italic;margin-bottom:28px;">"Being in Chhatrapati Sambhajinagar and having access to a full IB continuum &mdash; PYP through DP &mdash; was not something we expected when we moved here. Fountainhead Wockhardt changed that for our family."</p><div style="display:flex;align-items:center;gap:16px;"><div style="width:40px;height:40px;border-radius:50%;background:var(--fs-blue);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:white;font-size:0.7rem;font-weight:700;">F</span></div><div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.82rem;color:var(--dark);">FWGS Student</div><div style="font-size:0.72rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.08em;">Chhatrapati Sambhajinagar</div></div></div></div>
      </div>
    </div>

    <div id="testimonials-parents">
      <h3 style="font-family:'Montserrat',sans-serif;font-size:1rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--fs-red);margin-bottom:24px;padding-bottom:12px;border-bottom:2px solid var(--fs-red);">Hear from FSK Parents</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border);">
        <div style="background:white;padding:48px;"><p style="font-size:1.1rem;line-height:1.8;color:var(--dark);font-style:italic;margin-bottom:28px;">"When we joined Fountainhead, we did not fully understand the IB. The school took time to explain — not just once, but every year. That investment in us as parents made us better partners to our child."</p><div style="display:flex;align-items:center;gap:16px;"><div style="width:40px;height:40px;border-radius:50%;background:var(--dark);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:white;font-size:0.7rem;font-weight:700;">P</span></div><div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.82rem;color:var(--dark);">FSK Parent</div><div style="font-size:0.72rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.08em;">Current School Parent, Kunkni</div></div></div></div>
        <div style="background:white;padding:48px;"><p style="font-size:1.05rem;line-height:1.8;color:var(--dark);font-style:italic;margin-bottom:28px;">"We enrolled in the reading guild as an add-on. Within three months, our daughter was reading independently for the first time. The programme is genuinely well-designed."</p><div style="display:flex;align-items:center;gap:16px;"><div style="width:40px;height:40px;border-radius:50%;background:var(--dark);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><span style="color:white;font-size:0.7rem;font-weight:700;">F</span></div><div><div style="font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.82rem;color:var(--dark);">FALH Family</div><div style="font-size:0.72rem;color:var(--gray);text-transform:uppercase;letter-spacing:0.08em;">Reading Guild Parent, Vapi</div></div></div></div>
      </div>
    </div>
  </div>
</section>

<!-- DP / MYP RESULTS -->
<section class="section" id="results" style="padding:100px 0;">
  <div class="container">
    <div style="text-align:center;margin-bottom:64px;"><span class="label" style="justify-content:center;display:flex;">IB Results</span><h2>What Our Students Achieve</h2><p style="color:var(--mid);max-width:560px;margin:16px auto 0;">Consistent, genuine outcomes &mdash; not a good year, but a pattern.</p></div>

    <h3 style="margin-bottom:24px;font-size:1.1rem;">IB Diploma ${escHtml(dp.year || '2026')} &mdash; Fountainhead School Kunkni</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:48px;">
      <div style="background:var(--dark);color:white;padding:36px;text-align:center;"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--gold);">${escHtml(dp.average || '32.97')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);">School Average<br><span style="font-weight:400;">World avg: 30.9</span></p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--gold);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(dp.students || '157')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Students</p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--fs-blue);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(dp.diplomas || '115')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Full Diplomas</p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--dark);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(dp.highest || '44')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Highest Score</p></div>
    </div>

    <h3 style="margin-bottom:24px;font-size:1.1rem;">IB MYP ${escHtml(myp.year || '2025')} &mdash; Fountainhead School Kunkni</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:48px;">
      <div style="background:var(--dark);color:white;padding:36px;text-align:center;"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--gold);">${escHtml(myp.average || '45.68')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.55);">School Average<br><span style="font-weight:400;">World avg: 37.71</span></p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--gold);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(myp.students || '157')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Students</p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--fs-blue);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(myp.scored40 || '128')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Scored 40+</p></div>
      <div style="background:white;padding:36px;text-align:center;border-top:3px solid var(--dark);"><span style="font-size:2.6rem;font-weight:900;font-family:'Montserrat',sans-serif;color:var(--dark);">${escHtml(myp.highest || '55')}</span><p style="margin:8px 0 0;font-size:0.65rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--mid);">Highest Score</p></div>
    </div>

    <div style="background:var(--dark);padding:64px;text-align:center;margin-bottom:48px;">
      <span class="label" style="justify-content:center;display:flex;color:var(--gold);">Class of ${escHtml(dp.year || '2026')} &mdash; ${escHtml(dp.students || '157')} Students</span>
      <h3 style="color:white;margin:16px 0 8px;">University Destinations</h3>
      <p style="color:rgba(255,255,255,0.6);margin-bottom:40px;max-width:500px;margin-left:auto;margin-right:auto;">Where FSK graduates go</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:40px;">
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">Auro University (12)</span>
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">Ahmedabad Uni (9)</span>
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">NMIMS (5)</span>
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">Plaksha (5)</span>
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">Purdue (3)</span>
        <span style="background:rgba(255,255,255,0.08);color:white;padding:8px 16px;font-size:0.72rem;font-weight:600;">FLAME (3)</span>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:32px;">
        <p style="color:rgba(255,255,255,0.5);font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:16px;">World-Leading Universities</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">UCL</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">HKU</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Loughborough</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Warwick</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Boston College</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Duke</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Penn State</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Northeastern</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Pepperdine</span><span style="color:rgba(255,255,255,0.2);">&bull;</span>
          <span style="color:rgba(255,255,255,0.55);font-size:0.78rem;">Case Western</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- VALUES, MISSION & PHILOSOPHY CTA -->
<section style="padding:80px 0;background:white;">
  <div class="container">
    <div style="max-width:700px;margin:0 auto;text-align:center;">
      <span class="label" style="justify-content:center;display:flex;">Why We Teach This Way</span>
      <h2 style="margin-bottom:20px;">Values, Mission &amp; Philosophy</h2>
      <p style="font-size:1rem;color:var(--mid);line-height:1.8;margin-bottom:36px;">What we believe about how children learn — character, competence, and a love of learning that lasts a lifetime.</p>
      <a href="fsk/index.html#about" style="display:inline-flex;align-items:center;gap:10px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:0.72rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--dark);border-bottom:2px solid var(--dark);padding-bottom:4px;">Read Our Philosophy →</a>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<div class="cta-band">
  <div class="container">
    <div class="cta-inner">
      <div>
        <h2>${escHtml(ct.heading || 'See a campus for yourself')}</h2>
        <p>${escHtml(ct.subtext || 'The best way to understand Fountainhead is to walk through it on a school day.')}</p>
      </div>
      <a href="#connect" class="btn-cta-white">${escHtml(ct.button || 'Book a Visit →')}</a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="f-logo"><img src="images/fs-main-logo.png" alt="Fountainhead Schools" style="height:3rem;width:auto;display:block;margin-bottom:8px;"></div>
        <p>${escHtml(footerTag)}</p>
        <div style="display:flex;gap:10px;margin-top:20px;flex-wrap:wrap;">
          <a href="https://instagram.com/fountainheadschools" target="_blank" style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);padding:7px 14px;transition:all 0.2s;" onmouseover="this.style.color='white';this.style.borderColor='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)';this.style.borderColor='rgba(255,255,255,0.1)'">Instagram</a>
          <a href="https://linkedin.com/company/fountainheadschools" target="_blank" style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);padding:7px 14px;transition:all 0.2s;" onmouseover="this.style.color='white';this.style.borderColor='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)';this.style.borderColor='rgba(255,255,255,0.1)'">LinkedIn</a>
          <a href="https://www.youtube.com/@fountainheadschools" target="_blank" style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);padding:7px 14px;transition:all 0.2s;" onmouseover="this.style.color='white';this.style.borderColor='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)';this.style.borderColor='rgba(255,255,255,0.1)'">YouTube</a>
          <a href="https://wa.me/${escAttr(wa)}" target="_blank" style="font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.1);padding:7px 14px;transition:all 0.2s;" onmouseover="this.style.color='white';this.style.borderColor='white'" onmouseout="this.style.color='rgba(255,255,255,0.4)';this.style.borderColor='rgba(255,255,255,0.1)'">WhatsApp</a>
        </div>
      </div>
      <div><h6>Our Schools</h6><ul><li><a href="fsk/index.html" target="_blank">FSK — Surat (Kunkni)</a></li><li><a href="fsm/index.html" target="_blank">FSM — Surat (Malgama)</a></li><li><a href="fwgs/index.html" target="_blank">FWGS — Chh. Sambhajinagar</a></li><li><a href="falh/index.html" target="_blank">FALH — Vapi</a></li><li><a href="fpa/index.html" target="_blank">FPA — Adajan, Surat</a></li><li><a href="fpv/index.html" target="_blank">FPV — Vesu, Surat</a></li></ul></div>
      <div><h6>Quick Links</h6><ul><li><a href="#academics">IB Programmes</a></li><li><a href="#accolades">Accolades</a></li><li><a href="fsk/index.html#policies">School Policies</a></li><li><a href="fsk/index.html#admissions">Admissions</a></li><li><a href="https://parents.fountainheadschools.org/Login" target="_blank">Nucleus Portal</a></li><li><a href="https://apps.apple.com/in/app/fs-nucleus/id1625806958" target="_blank">Nucleus App (iOS)</a></li></ul></div>
      <div><h6>Contact</h6><ul><li><a href="tel:+91${phone1.replace(/[^0-9]/g,'')}">${escHtml(phone1)}</a></li><li><a href="tel:+91${phone2.replace(/[^0-9]/g,'')}">${escHtml(phone2)}</a></li><li><a href="mailto:${escAttr(email)}">${escHtml(email)}</a></li><li><a href="https://wa.me/${escAttr(wa)}">WhatsApp</a></li><li style="color:rgba(255,255,255,0.3);font-size:0.78rem;margin-top:12px;line-height:1.7;">${escHtml(addr).replace(/,\s*/g,',<br>')}</li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>© ${escHtml(footerYear)} Fountainhead Schools. All rights reserved.</span>
      <div class="footer-policies"><a href="fsk/index.html#policies">Child Protection Policy</a><a href="fsk/index.html#policies">DPDP 2023</a><a href="#connect">Contact Us</a><a href="#">Careers</a></div>
    </div>
  </div>
</footer>

<script src="js/main.js" defer></script>
</body>
</html>`;
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
function escAttr(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

module.exports = { generateMainHTML };
