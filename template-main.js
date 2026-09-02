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
<title>${escHtml(d.metaTitle || 'Fountainhead Schools An IB School Group')}</title>
<meta name="description" content="${escAttr(d.metaDescription || '')}">
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<!-- HEADER -->
<header class="site-header" id="navbar">
  <!-- MAIN NAV ROW -->
  <div class="header-row">
    <a href="index.html" class="nav-logo">
      <img src="images/fs-main-logo.png" alt="Fountainhead Schools" class="nav-logo-img">
    </a>

    <nav class="nav-desktop" aria-label="Primary">

      <!-- 1. About Us -->
      <a href="#about" class="nav-link">About Us</a>

      <!-- 2. Our Story & Founders -->
      <a href="#about-story" class="nav-link">Our Story</a>

      <!-- 3. Values, Mission & IB -->
      <a href="#about-values" class="nav-link">Mission &amp; Values</a>

      <!-- 4. Our Schools -->
      <a href="#campuses" class="nav-link">Our Schools</a>

      <!-- 5. Academics -->
      <a href="#academics" class="nav-link">Academics</a>

      <!-- 6. Admissions -->
      <a href="#admissions" class="nav-link">Admissions</a>

      <!-- 7. News & Happenings -->
      <a href="#news" class="nav-link">News</a>

      <!-- 8. Accolades -->
      <a href="#accolades" class="nav-link">Accolades</a>

      <!-- 9. Testimonials -->
      <a href="#testimonials" class="nav-link">Testimonials</a>

    </nav>

    <a class="nav-inquire" href="#connect">Enquire</a>

    <button class="hamburger" popovertarget="site-nav" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<!-- MOBILE NAV PANEL -->
<nav id="site-nav" class="nav-panel" popover aria-label="Primary, mobile">
  <a href="#about">About Us</a>
  <a href="#about-story">Our Story &amp; Founders</a>
  <a href="#about-values">Values, Mission &amp; IB</a>
  <details class="panel-group" name="mobile-nav">
    <summary>Our Schools</summary>
    <div class="panel-submenu">
      <a href="fsk/index.html">Fountainhead School Kunkni</a>
      <a href="fsm/index.html">Fountainhead School Malgama</a>
      <a href="fwgs/index.html">Fountainhead Wockhardt Global School</a>
      <a href="falh/index.html">Fountainhead Avadh Learning Hub</a>
      <a href="fpa/index.html">Fountainhead Preschool Adajan</a>
      <a href="fpv/index.html">Fountainhead Preschool Vesu</a>
    </div>
  </details>
  <a href="#academics">Academics</a>
  <a href="#admissions">Admissions</a>
  <a href="#news">News &amp; Happenings</a>
  <a href="#accolades">Accolades &amp; Certifications</a>
  <a href="#testimonials">Testimonials</a>
  <a class="panel-enquire" href="#connect">Enquire</a>
</nav>

<!-- HERO -->
<section class="hero" style="min-height:100vh;">
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

</section>

<!-- ABOUT US -->
<section class="section-about" id="about">
  <div class="container">
    <div class="about-fs-grid">
      <div class="about-fs-text">
        <span class="label">Who We Are</span>
        <h2>One conviction,<br>every campus.</h2>
        <p style="font-size:1.05rem;line-height:1.85;color:var(--mid);margin-bottom:20px;">With students at the centre of everything we do, at Fountainhead we place a strong emphasis on fostering a love of learning. Our pedagogy is learner-centred and aims to create a positive and supportive environment.</p>
        <p style="font-size:0.95rem;line-height:1.85;color:var(--mid);margin-bottom:32px;">We help students focus on academic competencies, but at the same time understand the value of physical fitness, creativity and social-emotional well-being. The values we inculcate develop the skills, attitudes, and character necessary for long-term success.</p>
        <div class="about-fs-stats">
          <div class="about-stat"><span class="about-stat-num">4th</span><span class="about-stat-label">Nationally Ranked<br><small>Cfore 2026</small></span></div>
          <div class="about-stat"><span class="about-stat-num">6</span><span class="about-stat-label">Campuses<br><small>Surat · Vapi · Maharashtra</small></span></div>
          <div class="about-stat"><span class="about-stat-num">20+</span><span class="about-stat-label">Years of IB<br><small>in India</small></span></div>
        </div>
        <div style="margin-top:36px;display:flex;gap:16px;flex-wrap:wrap;">
          <a href="#campuses" class="btn-about-primary">Find Your Campus →</a>
          <a href="fsk/index.html#admissions" class="btn-about-secondary">Apply for Admission</a>
        </div>
      </div>
      <div class="about-fs-visual">
        <div class="about-fs-campus-photo">
          <img src="images/fsk-ground.jpg" alt="Fountainhead School Kunkni Campus">
        </div>
        <div class="about-fs-values-row">
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-blue)"></span><span>Together, We Thrive</span></div>
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-red)"></span><span>Students' Growth, Our Compass</span></div>
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-blue)"></span><span>Make Each Other Better</span></div>
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-yellow)"></span><span>Learn. Evolve. Excel.</span></div>
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-red)"></span><span>Take Charge and Follow Through</span></div>
          <div class="about-fs-value"><span class="afv-dot" style="background:var(--fs-blue)"></span><span>Character &amp; Competence</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- OUR STORY & FOUNDERS -->
<section class="story-section" id="about-story">
  <div class="story-header container">
    <div class="story-header-text">
      <span class="label">Our Story &amp; Founders</span>
      <h2>From 6 students in Adajan to 6 campuses across India.</h2>
      <p>Two decades of building schools around how children actually learn — one conviction, consistently kept.</p>
    </div>
    <div class="story-header-quote">
      <blockquote>"Fountainhead shall be the principal source of knowledge and education that primarily <em>facilitates learning</em> not teaching in the conventional sense."</blockquote>
      <cite>The Fountainhead Ideology</cite>
    </div>
  </div>

  <!-- JOURNEY TIMELINE — PDF IMAGE -->
  <div class="journey-timeline container">
    <span class="section-label" style="color:var(--fs-blue)">Our Journey</span>
    <h3 class="journey-title">The Evolution of Fountainhead Schools</h3>
    <div class="timeline-img-wrap">
      <img src="images/fs-timeline-1.png" alt="Fountainhead Schools Journey Timeline" class="timeline-img">
    </div>
  </div>
  <!-- hidden scrolling timeline kept for reference -->
  <div class="story-timeline-wrap" style="display:none">
    <div class="story-timeline">

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2005</span>
        <div class="st-card">
          <h4>The Fountainhead Preschool, Adajan</h4>
          <p>Founded with 6 students under the brand The Fountainhead Preschool, Adajan.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2008</span>
        <div class="st-card">
          <h4>Fountainhead School, Kunkni</h4>
          <p>Established Fountainhead School, Kunkni — the first K12 IB school.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2011</span>
        <div class="st-card">
          <h4>Authorized for IB PYP</h4>
          <p>Authorized for the IB Primary Years Programme.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2014</span>
        <div class="st-card">
          <h4>Global Recognition & IB DP</h4>
          <p>Ankita conferred with the Global Teacher Accreditation award by British Council. Authorized for IB Diploma Programme.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2016</span>
        <div class="st-card">
          <h4>1st Graduating Class</h4>
          <p>1st Graduating Class of Fountainhead School.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2017</span>
        <div class="st-card">
          <h4>Fountainhead Preschool, Vesu</h4>
          <p>Opened 2nd Fountainhead Preschool, Vesu.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2018</span>
        <div class="st-card">
          <h4>Authorized for IB MYP</h4>
          <p>Authorized for the IB Middle Years Programme.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2019</span>
        <div class="st-card">
          <h4>Maverick Learning Centre</h4>
          <p>In-house project based 'Maverick Learning Centre' established.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2020</span>
        <div class="st-card">
          <h4>MSA-CESS Accreditation</h4>
          <p>Accredited by MSA-CESS for offering American High School Diploma.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2023</span>
        <div class="st-card">
          <h4>Best International School, Surat</h4>
          <p>Ranked Best International School in Surat by Education World. Vardan authored Reimagining Indian Education.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-blue)">2024</span>
        <div class="st-card">
          <h4>Great Place To Work® Certified</h4>
          <p>Great Place To Work® Certified (Nov 2024–Nov 2025, INDIA).</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2025</span>
        <div class="st-card">
          <h4>5th Nationally · FSM & FWGS Open</h4>
          <p>Ranked 5th Nationwide by Cfore. Opened Fountainhead School Malgama K12 IB. Joined hands with Wockhardt Global School, Chhatrapati Sambhajinagar.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:var(--fs-red)">2026</span>
        <div class="st-card">
          <h4>4th Nationally · Preschool Vapi</h4>
          <p>Stands Proudly Among India's Top Schools Ranked 4th Nationwide. Opened 3rd Fountainhead Preschool, Vapi.</p>
        </div>
      </div>

      <div class="st-item">
        <span class="st-year" style="background:#b8960a">2027</span>
        <div class="st-card st-card-future">
          <h4>Next Chapter — Vapi</h4>
          <p>K12 IB School — Next Chapter, Vapi.</p>
        </div>
      </div>

    </div>
  </div>

  <!-- FS BRAND STORY -->
  <div class="brand-story-section">
    <div class="bsn-inner">
      <div class="bsn-content">
        <span class="bsn-label">Our Identity</span>
        <h2 class="bsn-heading">A Mark<br>with Meaning</h2>
        <div class="bsn-rule"></div>
        <p class="bsn-body">Two figures — a mentor and a child — reaching upward together. The Fountainhead brandmark is a belief made visible: that <strong>growth guided by care</strong> is the only education worth giving.</p>
        <p class="bsn-sub">A <em>fountainhead</em> is the original source from which everything flows. We are, for our students, the source of a lifelong love of learning.</p>
        <div class="bsn-pills">
          <span class="bsn-pill bsn-pill-blue">Blue — Wisdom &amp; Trust</span>
          <span class="bsn-pill bsn-pill-red">Red — Passion &amp; Courage</span>
          <span class="bsn-pill bsn-pill-yellow">Yellow — Joy &amp; Curiosity</span>
        </div>
      </div>
      <div class="bsn-logo-panel">
        <img src="images/fs-main-logo.png" alt="Fountainhead Schools" class="bsn-mark">
        <div class="bsn-colorbar">
          <span class="bsn-b bsn-b-blue"></span>
          <span class="bsn-b bsn-b-red"></span>
          <span class="bsn-b bsn-b-yellow"></span>
        </div>
      </div>
    </div>
    <div class="bsn-stats">
      <div class="bsn-stat"><span class="bsn-num">6</span><span class="bsn-lbl">Campuses</span></div>
      <div class="bsn-sep"></div>
      <div class="bsn-stat"><span class="bsn-num">20+</span><span class="bsn-lbl">Years of Excellence</span></div>
      <div class="bsn-sep"></div>
      <div class="bsn-stat"><span class="bsn-num">IB</span><span class="bsn-lbl">World School</span></div>
    </div>
  </div>
</section>

<!-- VALUES, MISSION & PHILOSOPHY -->
<section class="values-section" id="about-values">
  <div class="container">

    <div class="values-header">
      <span class="section-label">Our Philosophy</span>
      <h2 class="values-title">Six Values. One Direction.</h2>
      <p class="values-subtitle">Everything at Fountainhead flows from a set of convictions about how people grow and who they can become.</p>
    </div>

    <div class="values-grid">
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-blue)">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="14" r="6" stroke="#fff" stroke-width="2"/><circle cx="8" cy="22" r="5" stroke="#fff" stroke-width="2"/><circle cx="32" cy="22" r="5" stroke="#fff" stroke-width="2"/><path d="M2 36c0-4 3-7 6-7h24c3 0 6 3 6 7" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <h3>Together We Thrive</h3>
        <p>Growth is a collective endeavour. When each person brings their best and supports others to do the same, the whole community rises.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-red)">
          <!-- Compass icon -->
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="13" stroke="#fff" stroke-width="2"/><circle cx="20" cy="20" r="2.5" fill="#fff"/><line x1="20" y1="7" x2="20" y2="10" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="20" y1="30" x2="20" y2="33" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="7" y1="20" x2="10" y2="20" stroke="#fff" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="20" x2="33" y2="20" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M16 16 l2 8 6-10z" fill="#fff"/></svg>
        </div>
        <h3>Students' Growth Our Compass</h3>
        <p>Every decision curricular, structural, cultural is tested against one question: does this serve the growth of the student?</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-yellow)">
          <!-- Handshake / uplift icon -->
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 26 l6-6 4 2 4-4 4 2 4-4 6 4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 26 l4 4 h20 l4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 20 l6-8 6 8" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3>Make Each Other Better</h3>
        <p>Feedback is a gift. We build a culture where honesty, generosity, and high standards are extended to every member of the community.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-blue)">
          <!-- Open book icon -->
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 10 C16 8 10 8 6 10 L6 32 C10 30 16 30 20 32 C24 30 30 30 34 32 L34 10 C30 8 24 8 20 10Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><line x1="20" y1="10" x2="20" y2="32" stroke="#fff" stroke-width="2"/><line x1="10" y1="16" x2="17" y2="16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><line x1="10" y1="21" x2="17" y2="21" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><line x1="23" y1="16" x2="30" y2="16" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><line x1="23" y1="21" x2="30" y2="21" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg>
        </div>
        <h3>Learn, Evolve, Excel</h3>
        <p>Curiosity is not a phase it is a practice. We model lifelong learning so students see it lived, not just taught.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-red)">
          <!-- Flag / target icon -->
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><line x1="10" y1="8" x2="10" y2="34" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/><path d="M10 8 L30 12 L10 20Z" fill="#fff"/><path d="M18 30 l5-5 5 5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="23" y1="25" x2="23" y2="34" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        </div>
        <h3>Take Charge &amp; Follow Through</h3>
        <p>Initiative without completion is ambition without impact. We nurture the discipline to see commitments through, not just begin them well.</p>
      </div>
      <div class="value-card">
        <div class="value-icon" style="background:var(--fs-yellow)">
          <!-- Shield icon -->
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6 L32 11 L32 22 C32 29 26 34 20 36 C14 34 8 29 8 22 L8 11 Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/><path d="M15 20 l3.5 3.5 6.5-7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <h3>Character &amp; Competence</h3>
        <p>Skills open doors; character determines what you do once you're inside. We hold both to be indispensable and equally non-negotiable.</p>
      </div>
    </div>

    <div class="mission-block">
      <div class="mission-ib">
        <div class="mission-tag">IB Mission Statement</div>
        <blockquote class="mission-quote">
          "The International Baccalaureate aims to develop inquiring, knowledgeable and caring young people who help to create a better and more peaceful world through intercultural understanding and respect. To this end the organisation works with schools, governments and international organisations to develop challenging programmes of international education and rigorous assessment. These programmes encourage students across the world to become active, compassionate and lifelong learners who understand that other people, with their differences, can also be right."
        </blockquote>
      </div>
      <div class="mission-fs">
        <div class="mission-tag">Fountainhead Vision</div>
        <p class="mission-vision-text">To nurture leaders with <strong>character &amp; competence</strong> young people who are rooted in values, equipped with skills, and ready to shape the world they inherit.</p>
        <div class="mission-ideology-label">Fountainhead Ideology</div>
        <p class="mission-ideology-text">"At Fountainhead, we believe that the purpose of education extends far beyond academic achievement. It lies in developing the whole person one who is not only knowledgeable but also virtuous, not only skilled but also wise."</p>
      </div>
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

      <!-- FSK actual facade photo -->
      <div class="campus-ois" onclick="window.open('fsk/index.html','_blank')">
        <img src="fsk/images/FSK Front Facade Image.jpg" alt="Fountainhead School Kunkni">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Surat, Gujarat</div>
          <h3>Fountainhead School Kunkni</h3>
          <p>India's 4th ranked IB school. Full EY→Diploma continuum on Rander-Dandi Road, Surat.</p>
          <a href="fsk/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <!-- FSM facade photo -->
      <div class="campus-ois" onclick="window.open('fsm/index.html','_blank')">
        <img src="fsm/images/FPV and FSM Front Facade.JPG" alt="Fountainhead School Malgama">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Surat, Gujarat</div>
          <h3>Fountainhead School Malgama</h3>
          <p>Full IB continuum campus on Malgama, Surat.</p>
          <a href="fsm/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <!-- FWGS building photo -->
      <div class="campus-ois" onclick="window.open('fwgs/index.html','_blank')">
        <img src="images/fwgs-building.jpg" alt="Fountainhead Wockhardt Global School">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Chhatrapati Sambhajinagar, Maharashtra</div>
          <h3>Fountainhead Wockhardt Global School</h3>
          <p>IB World School in Maharashtra EYP to DP.</p>
          <a href="fwgs/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <!-- FALH building photo -->
      <div class="campus-ois" onclick="window.open('falh/index.html','_blank')">
        <img src="images/falh-building.jpg" alt="Fountainhead Avadh Learning Hub">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Vapi, Gujarat</div>
          <h3>Fountainhead Avadh Learning Hub</h3>
          <p>Preschool and after-school programmes in Vapi.</p>
          <a href="falh/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <!-- FPA facade photo -->
      <div class="campus-ois" onclick="window.open('fpa/index.html','_blank')">
        <img src="fpa/images/FPA Front Facade.jpeg" alt="Fountainhead Preschool Adajan">
        <div class="campus-ois-overlay">
          <div class="campus-ois-city">📍 Adajan, Surat</div>
          <h3>Fountainhead Preschool Adajan</h3>
          <p>Early years programmes for ages 2–6.</p>
          <a href="fpa/index.html" target="_blank" class="campus-ois-link">Visit Campus →</a>
        </div>
      </div>

      <!-- FPV facade photo -->
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

<!-- ACADEMICS -->
<section class="academics-section" id="academics">
  <div class="container">
    <div class="academics-header">
      <span class="section-label">Academics</span>
      <h2 class="academics-title">A Full IB Continuum From Early Years to Diploma</h2>
      <p class="academics-sub">At Fountainhead, learning is goal-directed, experiential, and joyful. The IB continuum gives it structure; our learning model gives it soul.</p>
    </div>

    <!-- FS Learning Model -->
    <div class="lm-block">
      <div class="lm-text">
        <span class="section-label" style="color:var(--fs-red)">FS Learning Model</span>
        <h3>Learner at the Centre</h3>
        <p>The FS Learning Model places the <strong>Learner</strong> at its core, surrounded by three learning principles <em>Goal Directed Learning, Experiential Learning, and Joy of Learning</em>. Four development domains support these: Academic Competencies, Physical Fitness, Socio-Emotional Well-Being, and Creativity &amp; the Arts.</p>
        <p>Around these sits a values band Fairness, Sustainability, Respect, Responsibility, Excellence, Win-Win, and Integrity wrapped by Service. The outermost ring names our five ultimate outcomes: <strong>Character, Competence, 21st Century Skills, Global Citizenship, and Leadership.</strong></p>
        <p>The role of parents in this model is active, not passive. We believe that sustainable success happens when school and home work as one ecosystem.</p>
      </div>
      <div class="lm-image">
        <img src="images/fs-learning-model.png" alt="FS Learning Model" onerror="this.style.display='none'">
      </div>
    </div>

    <!-- IB Programmes -->
    <div class="ib-programmes">
      <div class="ib-prog-header">
        <span class="section-label" style="color:var(--fs-red)">IB Programmes</span>
        <h3>The IB Continuum at Fountainhead</h3>
      </div>
      <div class="ib-prog-grid">
        <div class="ib-prog-card" style="border-top-color:var(--fs-yellow)">
          <div class="ib-prog-age">Ages 3–5</div>
          <h4>Early Years Programme</h4>
          <p>Play-based inquiry that builds curiosity, independence, and the foundations of lifelong learning in the critical early years.</p>
        </div>
        <div class="ib-prog-card" style="border-top-color:var(--fs-blue)">
          <div class="ib-prog-age">Ages 3–12</div>
          <h4>Primary Years Programme</h4>
          <p>Transdisciplinary learning that develops the whole child socially, physically, emotionally, and academically.</p>
        </div>
        <div class="ib-prog-card" style="border-top-color:var(--fs-red)">
          <div class="ib-prog-age">Ages 11–16</div>
          <h4>Middle Years Programme</h4>
          <p>Conceptual understanding and inquiry that challenges students to make real-world connections across disciplines.</p>
        </div>
        <div class="ib-prog-card" style="border-top-color:#27AE60">
          <div class="ib-prog-age">Ages 16–19</div>
          <h4>Diploma Programme</h4>
          <p>A rigorous two-year pre-university programme that prepares students for global universities and a purposeful life.</p>
        </div>
      </div>
    </div>

    <!-- Demystifying IB -->
    <div class="ib-myths-block">
      <div class="ib-myths-text">
        <span class="section-label">Demystifying IB Myths</span>
        <h3>IB Understood</h3>
        <div class="myth-list">
          <div class="myth-item">
            <div class="myth-q">Is IB only for academically gifted students?</div>
            <div class="myth-a">No. IB is designed for all learners. It develops thinking skills, not just academic performance making it ideal for curious, motivated students across ability levels.</div>
          </div>
          <div class="myth-item">
            <div class="myth-q">Is IB more stressful than other boards?</div>
            <div class="myth-a">IB asks students to think deeply, not just memorise. With the right support and a school culture built around wellbeing, students thrive not just cope.</div>
          </div>
          <div class="myth-item">
            <div class="myth-q">Is IB accepted by Indian universities?</div>
            <div class="myth-a">Yes. Most leading Indian universities and all major global institutions recognise and value the IB Diploma. Our graduates attend top universities across India and the world.</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>

<!-- ADMISSIONS -->
<section class="admissions-section" id="admissions">
  <div class="container">
    <div class="admissions-header">
      <span class="section-label">Admissions</span>
      <h2 class="admissions-title">Begin Your Fountainhead Journey</h2>
      <p class="admissions-sub">Six campuses. Three cities. One shared conviction about how children grow. Find the right campus for your child and take the first step.</p>
    </div>
    <div class="admissions-grid">
      <div class="admissions-step">
        <div class="adm-step-num" style="background:var(--fs-blue)">1</div>
        <h4>Explore Our Campuses</h4>
        <p>Learn about each campus its location, age groups, IB programmes, and community and find the right fit for your family.</p>
      </div>
      <div class="admissions-step">
        <div class="adm-step-num" style="background:var(--fs-red)">2</div>
        <h4>Book a Campus Visit</h4>
        <p>There is no better way to experience Fountainhead than in person. Schedule a visit, meet the team, and see our learning in action.</p>
      </div>
      <div class="admissions-step">
        <div class="adm-step-num" style="background:var(--fs-yellow);color:#111">3</div>
        <h4>Submit an Enquiry</h4>
        <p>Fill in a short enquiry form for your preferred campus. Our admissions team will reach out to guide you through the process.</p>
      </div>
      <div class="admissions-step">
        <div class="adm-step-num" style="background:#27AE60">4</div>
        <h4>Complete Enrolment</h4>
        <p>Once shortlisted, complete the formalities and join a community that has been nurturing leaders since 2005.</p>
      </div>
    </div>
    <div class="admissions-cta">
      <a href="#connect" class="btn-about-primary">Enquire Now</a>
      <a href="tel:+918000130031" class="btn-about-secondary">Call 8000-130-031</a>
    </div>
  </div>
</section>

<section class="news-section" id="news">
  <div class="container">
    <div class="news-header">
      <div><span class="section-label" style="color:var(--fs-red)">News &amp; Happenings</span><h2 class="news-heading">Celebrations Across Our Campuses</h2></div>
      <a href="news.html" class="see-all">View All →</a>
    </div>
    <!-- FEATURED CARD (image left + text right) -->
    <a href="news/celebrations.html#independence-day" class="hn-featured">
      <div class="hn-feat-img">
        <img src="images/news/independence-day.jpg" alt="Independence Day 2026">
      </div>
      <div class="hn-feat-body">
        <div class="hn-feat-meta">
          <span class="hn-tag hn-tag-red">Group-Wide</span>
          <span class="hn-date">15 Aug 2026</span>
        </div>
        <h3 class="hn-feat-title">Independence Day Celebrations — A Day Full of Colours, Spirit &amp; Pride</h3>
        <p class="hn-feat-desc">Fountainhead campuses across Surat, Vapi and Chhatrapati Sambhajinagar came alive with flag hoisting, patriotic performances and heartfelt tributes to the nation.</p>
        <span class="hn-read-btn">Read Full Story →</span>
      </div>
    </a>
    <!-- 4 SMALLER CARDS -->
    <div class="hn-grid">
      <a href="news/celebrations.html#subroto-cup" class="hn-card">
        <div class="hn-card-img"><img src="images/news/subroto-cup.jpg" alt="Subroto Cup"></div>
        <div class="hn-card-body">
          <div class="hn-card-meta"><span class="hn-tag hn-tag-blue">Kunkni</span><span class="hn-date">12 Oct 2025</span></div>
          <h4 class="hn-card-title">FSK Champions at Subroto Cup Football Tournament</h4>
          <p class="hn-card-desc">Our students brought home the trophy at the prestigious Subroto Cup — a testament to teamwork, grit and the FS spirit.</p>
          <span class="hn-card-link">Read More →</span>
        </div>
      </a>
      <a href="news/celebrations.html#fs-got-talent" class="hn-card">
        <div class="hn-card-img"><img src="images/fsk-ground.jpg" alt="FS Got Talent"></div>
        <div class="hn-card-body">
          <div class="hn-card-meta"><span class="hn-tag hn-tag-red">Group-Wide</span><span class="hn-date">5 Mar 2026</span></div>
          <h4 class="hn-card-title">FS Got Talent — A Night of Stars and Standing Ovations</h4>
          <p class="hn-card-desc">Students from all six campuses showcased their extraordinary talents in our annual talent extravaganza.</p>
          <span class="hn-card-link">Read More →</span>
        </div>
      </a>
      <a href="news/celebrations.html#annual-day" class="hn-card">
        <div class="hn-card-img"><img src="images/fsk-hero.jpg" alt="Annual Day 2025"></div>
        <div class="hn-card-body">
          <div class="hn-card-meta"><span class="hn-tag hn-tag-blue">Kunkni</span><span class="hn-date">20 Dec 2025</span></div>
          <h4 class="hn-card-title">Annual Day 2025 — Curtain Call on a Year of Excellence</h4>
          <p class="hn-card-desc">An evening of performances, awards and memories as students, parents and educators gathered together.</p>
          <span class="hn-card-link">Read More →</span>
        </div>
      </a>
      <a href="news/celebrations.html#graduation" class="hn-card">
        <div class="hn-card-img"><img src="images/fsk-facade-main.jpg" alt="Graduation 2026"></div>
        <div class="hn-card-body">
          <div class="hn-card-meta"><span class="hn-tag hn-tag-red">Group-Wide</span><span class="hn-date">8 May 2026</span></div>
          <h4 class="hn-card-title">Graduation Ceremony 2026 — Farewell to Our Class of Changemakers</h4>
          <p class="hn-card-desc">With caps, gowns and teary smiles, the Class of 2026 stepped off the Fountainhead stage.</p>
          <span class="hn-card-link">Read More →</span>
        </div>
      </a>
    </div>
  </div>
</section>


<!-- ACCOLADES & CERTIFICATIONS -->
<section class="accolades-section" id="accolades">
  <div class="container">
    <div class="accolades-header">
      <span class="section-label">Accolades &amp; Certifications</span>
      <h2 class="accolades-title">Recognised Across India &amp; Beyond</h2>
      <p class="accolades-sub">Two decades of consistent pursuit acknowledged by the country's most respected education bodies.</p>
    </div>
    <div class="accolades-featured">
      <div class="accolade-hero-card">
        <div class="accolade-rank">4<sup>th</sup></div>
        <div class="accolade-rank-label">Nationally Ranked</div>
        <div class="accolade-rank-body">Cfore School Rankings 2026 · Co-Ed Day Schools (International Curriculum)</div>
        <p class="accolade-rank-quote">"In Pedagogy and Curriculum, no school scored above us. This is the second year running we've moved up."</p>
      </div>
      <div class="accolade-hero-card accolade-hero-secondary">
        <div class="accolade-rank">5<sup>th</sup></div>
        <div class="accolade-rank-label">In India Cfore 2025</div>
        <div class="accolade-rank-body">One of the country's most respected school evaluation frameworks. Ranked alongside institutions we have long regarded as benchmarks.</div>
      </div>
    </div>
    <!-- ACCOLADES -->
    <div class="acc-sub-heading">
      <span class="acc-sub-label">Awards &amp; Recognition</span>
      <h3 class="acc-sub-title">Accolades</h3>
    </div>
    <div class="accolades-img-grid">
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/cfore-2026-fsk.png" alt="Cfore 2026 — 4th Nationally"></div>
        <div class="acc-img-body"><span class="acc-img-year">2026</span><h4>4th Nationally — Cfore 2026</h4><p>Ranked 4th nationally among Co-Ed Day Schools (International Curriculum) — our highest ranking to date.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/ida-awards-2025-wellbeing-team.png" alt="IDA Awards 2025"></div>
        <div class="acc-img-body"><span class="acc-img-year">2025</span><h4>IDA Awards 2025</h4><p>Recognised for exemplary work in wellbeing, engagement, and capacity building in the foundational years.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/scoonews-2023-award.png" alt="ScooNews 2023"></div>
        <div class="acc-img-body"><span class="acc-img-year">2023</span><h4>Best Skill Development Initiative</h4><p>Maverick Learning Centre felicitated at ScooNews Global Educators Fest, Jaipur with 700+ school leaders.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/pallikkutam-2020.png" alt="Pallikkutam 2020"></div>
        <div class="acc-img-body"><span class="acc-img-year">2020</span><h4>Pallikkutam Recognition</h4><p>Featured among India's innovative schools for student-centred learning and inquiry-based education.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/ew-grand-jury-2019-20.png" alt="Education World Grand Jury"></div>
        <div class="acc-img-body"><span class="acc-img-year">2020</span><h4>Education World Grand Jury Award</h4><p>Recognised by Education World for outstanding contribution to progressive education in India.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/cfore-2025.png" alt="Cfore 2025"></div>
        <div class="acc-img-body"><span class="acc-img-year">2025</span><h4>5th Nationally — Cfore 2025</h4><p>Ranked 5th nationwide among Co-Ed Day Schools (International Curriculum) by Cfore School Rankings.</p></div>
      </div>
    </div>

    <!-- CERTIFICATIONS -->
    <div class="acc-sub-heading" style="margin-top:56px">
      <span class="acc-sub-label">Accreditations &amp; Memberships</span>
      <h3 class="acc-sub-title">Certifications</h3>
    </div>
    <div class="accolades-img-grid">
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/fit-india-2020.png" alt="FIT India 2020"></div>
        <div class="acc-img-body"><span class="acc-img-year">2020</span><h4>FIT India Recognition</h4><p>Acknowledged under the Government of India's FIT India Movement for promoting physical fitness among students.</p></div>
      </div>
      <div class="acc-img-card">
        <div class="acc-img-wrap"><img src="images/dais-membership-2020.png" alt="MSA CESS Accreditation"></div>
        <div class="acc-img-body"><span class="acc-img-year">2020</span><h4>MSA-CESS Accreditation</h4><p>Accredited by MSA-CESS for offering the American High School Diploma — globally recognised academic programme.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testimonials-section" id="testimonials">
  <div class="container">
    <div class="testimonials-header">
      <span class="section-label">Testimonials Voices at FS</span>
      <h2 class="testimonials-title">What Our Community Says</h2>
      <p class="testimonials-sub">Students, parents, and educators speaking from lived experience across six campuses.</p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="testimonial-quote">"Fountainhead gave my child the confidence to ask questions, not just answer them. The IB way of thinking has stayed with her long after she graduated."</div>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:var(--fs-blue)">P</div>
          <div><strong>FSK Parent</strong><br><small>Fountainhead School Kunkni</small></div>
        </div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-quote">"The teachers here don't just teach they listen. My son came home every day excited about what he had discovered, not what he had been told."</div>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:var(--fs-red)">P</div>
          <div><strong>FWGS Parent</strong><br><small>Fountainhead Wockhardt Global School</small></div>
        </div>
      </div>
      <div class="testimonial-card">
        <div class="testimonial-quote">"The DP prepared me for university in a way I didn't expect not just academically, but in managing time, thinking critically, and working with people different from me."</div>
        <div class="testimonial-author">
          <div class="testimonial-avatar" style="background:#27AE60">S</div>
          <div><strong>FSK DP Graduate</strong><br><small>Now studying abroad</small></div>
        </div>
      </div>
    </div>
    <div class="results-strip">
      <span class="section-label" style="color:var(--fs-blue);margin-bottom:16px;display:block">Results &amp; University Destinations</span>
      <div class="results-logos-placeholder">
        <p style="color:var(--mid);font-family:'Nunito',sans-serif;font-size:.95rem;">Our graduates attend leading universities in India and across the world including institutions in the UK, USA, Canada, Australia, and the Netherlands. University destinations updated annually.</p>
      </div>
    </div>
  </div>
</section>

<!-- CONNECT / ENQUIRY SECTION -->
<section class="connect-section" id="connect">
  <div class="container">
    <div class="connect-inner">
      <div class="connect-info">
        <span class="section-label" style="color:var(--fs-yellow)">Connect With Us</span>
        <h2 class="connect-heading">Book a Campus Visit</h2>
        <p class="connect-sub">The best way to understand Fountainhead is to walk through it on a school day. Fill the form and our admissions team will be in touch.</p>
        <div class="connect-details">
          <div class="connect-detail-item">
            <span class="connect-detail-label">Phone</span>
            <a href="tel:+91${phone1.replace(/[^0-9]/g,'')}">+91 ${escHtml(phone1)}</a>
          </div>
          <div class="connect-detail-item">
            <span class="connect-detail-label">Email</span>
            <a href="mailto:${escAttr(email)}">${escHtml(email)}</a>
          </div>
          <div class="connect-detail-item">
            <span class="connect-detail-label">WhatsApp</span>
            <a href="https://wa.me/${escAttr(wa)}" target="_blank">+91 ${escHtml(phone1)}</a>
          </div>
          <div class="connect-detail-item">
            <span class="connect-detail-label">Address</span>
            <span>${escHtml(addr)}</span>
          </div>
        </div>
      </div>
      <div class="connect-form-wrap">
        <form class="enquiry-form" onsubmit="return false;">
          <h4 class="form-heading">Send an Enquiry</h4>
          <div class="form-row">
            <div class="form-group">
              <label>Parent Name</label>
              <input type="text" placeholder="Your full name">
            </div>
            <div class="form-group">
              <label>Child's Grade</label>
              <select><option value="">Select Grade</option><option>Pre-Primary (EY)</option><option>Primary (PYP)</option><option>Middle School (MYP)</option><option>High School (DP)</option></select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 XXXXX XXXXX">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="your@email.com">
            </div>
          </div>
          <div class="form-group">
            <label>Preferred Campus</label>
            <select><option value="">Select Campus</option><option>FSK · Kunkni, Surat</option><option>FSM · Malgama, Surat</option><option>FWGS · Chh. Sambhajinagar</option><option>FALH · Vapi</option><option>FPA · Adajan, Surat</option><option>FPV · Vesu, Surat</option></select>
          </div>
          <div class="form-group">
            <label>Message (optional)</label>
            <textarea rows="3" placeholder="Any specific questions?"></textarea>
          </div>
          <button type="submit" class="form-submit-btn">Submit Enquiry</button>
        </form>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand col -->
      <div class="footer-brand">
        <a href="index.html" class="footer-logo-wrap">
          <img src="images/fs-main-logo.png" alt="Fountainhead Schools" class="footer-logo-img">
        </a>
        <p class="footer-tagline">${escHtml(footerTag)}</p>
        <div class="footer-social">
          <a href="https://instagram.com/fountainheadschools" target="_blank" class="footer-social-link">Instagram</a>
          <a href="https://www.youtube.com/@fountainheadschools" target="_blank" class="footer-social-link">YouTube</a>
          <a href="https://www.facebook.com/fountainheadschools" target="_blank" class="footer-social-link">Facebook</a>
        </div>
      </div>
      <!-- Our Schools -->
      <div>
        <h6 class="footer-col-head">Our Schools</h6>
        <ul class="footer-col-list">
          <li><a href="fsk/index.html">FSK · Kunkni, Surat</a></li>
          <li><a href="fsm/index.html">FSM · Malgama, Surat</a></li>
          <li><a href="fwgs/index.html">FWGS · Chh. Sambhajinagar</a></li>
          <li><a href="falh/index.html">FALH · Vapi</a></li>
          <li><a href="fpa/index.html">FPA · Adajan, Surat</a></li>
          <li><a href="fpv/index.html">FPV · Vesu, Surat</a></li>
        </ul>
      </div>
      <!-- Quick Links -->
      <div>
        <h6 class="footer-col-head">Quick Links</h6>
        <ul class="footer-col-list">
          <li><a href="#about">About Us</a></li>
          <li><a href="#academics">Academics</a></li>
          <li><a href="#admissions">Admissions</a></li>
          <li><a href="#news">News</a></li>
          <li><a href="#accolades">Accolades</a></li>
          <li><a href="#connect">Contact</a></li>
          <li><a href="careers.html">Careers</a></li>
        </ul>
      </div>
      <!-- Contact -->
      <div>
        <h6 class="footer-col-head">Contact Us</h6>
        <ul class="footer-col-list">
          <li><a href="tel:+91${phone1.replace(/[^0-9]/g,'')}">${escHtml(phone1)}</a></li>
          <li><a href="tel:+91${phone2.replace(/[^0-9]/g,'')}">${escHtml(phone2)}</a></li>
          <li><a href="mailto:${escAttr(email)}">${escHtml(email)}</a></li>
          <li><a href="https://wa.me/${escAttr(wa)}">WhatsApp</a></li>
          <li class="footer-addr">${escHtml(addr).replace(/,\s*/g,',<br>')}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-bottom-inner">
      <span>© ${escHtml(footerYear)} Fountainhead Schools. All rights reserved.</span>
      <div class="footer-policies">
        <a href="policies/FSK Child Protection Policy.pdf" target="_blank">Child Protection Policy</a>
        <a href="#connect">Contact Us</a>
        <a href="careers.html">Careers</a>
      </div>
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

