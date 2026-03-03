/**
 * SATIFIED LANDING — SCROLL ENGINE v4
 *
 * Fixes in this version:
 * 1. R=160 to match SVG element (was 155, caused circle displacement)
 * 2. Very slow gentle zoom throughout all phases (barely noticeable)
 * 3. Sin wave grows BOTH directions simultaneously from origin
 * 4. Last panel: no broken horizontal slide — instead nav drops down elegantly
 *    and Study button grows/glows, "Official site forthcoming" fades in below
 * 5. Full state reset on scroll-back
 * 6. More budget on satisfied section
 */

(function () {

  const ANIM_PX   = 2000;
  const MOBILE_BP = 768;

  const driver      = document.getElementById('scroll-driver');
  const track       = document.getElementById('horizontal-track');
  const body        = document.body;
  const svg         = document.getElementById('anim-svg');
  const navWrap     = document.getElementById('nav-wrap');
  const navStudyBtn = document.getElementById('nav-study-btn');
  const forthcoming = document.getElementById('forthcoming');
  const scrollHint  = document.getElementById('scroll-hint');
  const xArm1       = document.getElementById('x-arm1');
  const xArm2       = document.getElementById('x-arm2');
  const grid        = document.getElementById('g-grid');
  const circleEl    = document.getElementById('unit-circle');
  const circleTrace = document.getElementById('circle-trace');
  const terminal    = document.getElementById('terminal');
  const labels      = document.getElementById('g-labels');
  const axisLabels  = document.getElementById('g-axis-labels');
  const wipe        = document.getElementById('black-wipe');
  const revealSat   = document.getElementById('reveal-satisfied');
  const revealYet   = document.getElementById('reveal-yet');
  const spanSat     = document.getElementById('span-sat');
  const satLine     = document.getElementById('sat-line');

  const mathIds = ['me1','me2','me3','me4','me5','me6','me7','me8','me9','me10',
                   'me11','me12','me13','me14','me15','me16','me17','me18','me19','me20'];
  const mathEls = mathIds.map(id => document.getElementById(id));

  const clamp    = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp     = (a, b, t)   => a + (b - a) * t;
  const sub      = (t, a, b)   => clamp((t - a) / (b - a), 0, 1);
  const easeOut  = t => 1 - (1 - t) * (1 - t);
  const easeIn   = t => t * t;
  const easeIO   = t => t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2;
  const easeOut3 = t => 1 - Math.pow(1 - t, 3);

  const CX = 500, CY = 300;
  const AXIS = 490;
  const R    = 160;  // ← matches SVG unit-circle r="160" and terminal x2=660
  const svgNS = 'http://www.w3.org/2000/svg';

  const REF_ANGLES = [
    [30,'30°','π/6'],[45,'45°','π/4'],[60,'60°','π/3'],[90,'90°','π/2'],
    [120,'120°','2π/3'],[135,'135°','3π/4'],[150,'150°','5π/6'],[180,'180°','π'],
    [210,'210°','7π/6'],[225,'225°','5π/4'],[240,'240°','4π/3'],[270,'270°','3π/2'],
    [300,'300°','5π/3'],[315,'315°','7π/4'],[330,'330°','11π/6'],[360,'360°','2π'],
  ];

  const wipeEl = document.getElementById('black-wipe');

  // Build ref angle SVG group
  const gRefAngles = document.createElementNS(svgNS, 'g');
  gRefAngles.setAttribute('opacity', '0');
  svg.insertBefore(gRefAngles, wipeEl);

  const refEls = REF_ANGLES.map(([deg, degLbl, radLbl]) => {
    const radA = (Number(deg) * Math.PI) / 180;
    const dist = R + 30;
    const lx = CX + dist * Math.cos(radA);
    const ly = CY - dist * Math.sin(radA);

    const g = document.createElementNS(svgNS, 'g');
    g.setAttribute('opacity', '0');

    const tDeg = document.createElementNS(svgNS, 'text');
    tDeg.setAttribute('x', lx.toFixed(1));
    tDeg.setAttribute('y', ly.toFixed(1));
    tDeg.setAttribute('text-anchor', 'middle');
    tDeg.setAttribute('dominant-baseline', 'middle');
    tDeg.setAttribute('font-size', '11');
    tDeg.setAttribute('font-family', 'system-ui,sans-serif');
    tDeg.setAttribute('font-weight', '700');
    tDeg.setAttribute('fill', '#333');
    tDeg.textContent = String(degLbl);

    const tRad = document.createElementNS(svgNS, 'text');
    tRad.setAttribute('x', lx.toFixed(1));
    tRad.setAttribute('y', (ly + 14).toFixed(1));
    tRad.setAttribute('text-anchor', 'middle');
    tRad.setAttribute('dominant-baseline', 'middle');
    tRad.setAttribute('font-size', '9.5');
    tRad.setAttribute('font-family', 'system-ui,sans-serif');
    tRad.setAttribute('font-weight', '400');
    tRad.setAttribute('fill', '#555');
    tRad.setAttribute('opacity', '0');
    tRad.textContent = String(radLbl);

    g.appendChild(tDeg);
    g.appendChild(tRad);
    gRefAngles.appendChild(g);

    return { g, tDeg, tRad, deg: Number(deg), appeared: false, hit: false, settled: false };
  });

  // Sin wave — grows both directions from origin simultaneously
  const sinWavePath = document.createElementNS(svgNS, 'path');
  sinWavePath.setAttribute('fill', 'none');
  sinWavePath.setAttribute('stroke', '#f5c518');
  sinWavePath.setAttribute('stroke-width', '1.5');
  sinWavePath.setAttribute('opacity', '0');
  svg.insertBefore(sinWavePath, wipeEl);

  // Trig readout
  const gTrigRead = document.createElementNS(svgNS, 'g');
  gTrigRead.setAttribute('opacity', '0');
  gTrigRead.setAttribute('font-family', 'system-ui,sans-serif');
  gTrigRead.setAttribute('font-size', '10');
  svg.insertBefore(gTrigRead, wipeEl);

  const sinReadEl = document.createElementNS(svgNS, 'text');
  sinReadEl.setAttribute('fill', '#f5c518');
  sinReadEl.setAttribute('font-weight', '700');
  gTrigRead.appendChild(sinReadEl);

  const cosReadEl = document.createElementNS(svgNS, 'text');
  cosReadEl.setAttribute('fill', '#9ee5fa');
  cosReadEl.setAttribute('font-weight', '700');
  gTrigRead.appendChild(cosReadEl);

  // Supplemental arc (phase 3)
  const suppArc = document.createElementNS(svgNS, 'path');
  suppArc.setAttribute('fill', 'none');
  suppArc.setAttribute('stroke', '#444');
  suppArc.setAttribute('stroke-width', '1.2');
  suppArc.setAttribute('opacity', '0');
  svg.insertBefore(suppArc, wipeEl);

  function setLine(el, x1, y1, x2, y2) {
    el.setAttribute('x1', x1); el.setAttribute('y1', y1);
    el.setAttribute('x2', x2); el.setAttribute('y2', y2);
  }

  function arcCCW(a0, a1, r) {
    const span = a1 - a0;
    if (Math.abs(span) < 0.001) return '';
    const x1 = CX + r * Math.cos(a0), y1 = CY - r * Math.sin(a0);
    const x2 = CX + r * Math.cos(a1), y2 = CY - r * Math.sin(a1);
    const large = Math.abs(span) > Math.PI ? 1 : 0;
    return `M${x1.toFixed(2)} ${y1.toFixed(2)} A${r.toFixed(2)} ${r.toFixed(2)} 0 ${large} 0 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }

  function fullCircle(r) {
    // Two semicircles to avoid SVG "zero arc" degenerate case
    const top = CX + r;
    const bot = CX + r - 0.01;
    return `M${top} ${CY} A${r} ${r} 0 1 0 ${bot.toFixed(2)} ${CY}`;
  }

  // Sin wave that grows both left AND right from origin simultaneously
  // Ends exactly at CX±R (where the terminal side meets the x-axis at 0° / 360°)
  function buildSinWaveBidir(angle) {
    if (angle < 0.01) return '';
    // Spread grows from 0 to exactly R as angle goes 0→2π
    const spread = angle * R / (2 * Math.PI);
    const steps = Math.max(8, Math.ceil(spread / 1.5));
    let rightD = '', leftD = '';

    for (let i = 0; i <= steps; i++) {
      const frac = i / steps;
      // Right side: maps frac→x in [CX, CX+spread], sin completes exactly one half-cycle
      const rwx = CX + frac * spread;
      const rwy = CY - Math.sin(angle * frac) * (R * 0.28);
      rightD += i === 0
        ? `M${rwx.toFixed(2)} ${rwy.toFixed(2)}`
        : ` L${rwx.toFixed(2)} ${rwy.toFixed(2)}`;

      // Left side: negative x mirror
      const lwx = CX - frac * spread;
      const lwy = CY - Math.sin(-(angle * frac)) * (R * 0.28);
      leftD += i === 0
        ? `M${lwx.toFixed(2)} ${lwy.toFixed(2)}`
        : ` L${lwx.toFixed(2)} ${lwy.toFixed(2)}`;
    }

    return rightD + ' ' + leftD;
  }

  let isMobile = window.innerWidth <= MOBILE_BP;
  let ticking  = false;
  let revState = { sat: false, yet: false, yellow: false, navDrop: false };

  function resetRefAngles() {
    refEls.forEach(r => {
      r.appeared = false; r.hit = false; r.settled = false;
      r.g.setAttribute('opacity', '0');
      r.tDeg.setAttribute('fill', '#333');
      r.tRad.setAttribute('opacity', '0');
      r.tRad.setAttribute('fill', '#555');
    });
  }

  let labOp = 0;
  let introComplete = false; // set true once X draw + nav drop finishes

  // ── X ARM GEOMETRY ──────────────────────────────────────────────────────────
  // Arm1: top-left (486,286) → bottom-right (514,314)
  // Arm2: top-right (514,286) → bottom-left (486,314)
  // Length = sqrt(28²+28²) ≈ 39.6
  const ARM_LEN = Math.sqrt(28 * 28 + 28 * 28);

  function runIntroAnimation() {
    // ── 1. Nav starts hidden above screen, drops in after short delay ─────────
    navWrap.style.transition = 'none';
    navWrap.style.opacity    = '0';
    navWrap.style.transform  = 'translateX(-50%) translateY(-48px)';

    // Scroll hint also starts hidden
    if (scrollHint) {
      scrollHint.classList.remove('visible', 'hidden');
    }

    setTimeout(() => {
      navWrap.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.34,1.56,0.64,1)';
      navWrap.style.opacity    = '1';
      navWrap.style.transform  = 'translateX(-50%) translateY(0)';
    }, 200);

    // ── 2. X arms: arm1 draws first (top-left → bottom-right) ────────────────
    //    at halfway point, arm2 starts (bottom-left → top-right direction,
    //    but visually from bottom-left to top-right of its own line)
    const ARM_DUR  = 600;  // ms each arm takes to draw
    const ARM2_LAG = 300;  // ms after arm1 starts that arm2 begins

    // Set up dasharray so arms are invisible initially
    [xArm1, xArm2].forEach(el => {
      el.setAttribute('stroke-dasharray', ARM_LEN.toFixed(2));
      el.setAttribute('stroke-dashoffset', ARM_LEN.toFixed(2));
      el.style.transition = 'none';
    });

    // Force reflow so dashoffset takes effect before transition starts
    void xArm1.getBoundingClientRect();

    // Arm1 draws: dashoffset goes from ARM_LEN → 0
    setTimeout(() => {
      xArm1.style.transition = `stroke-dashoffset ${ARM_DUR}ms cubic-bezier(0.4,0,0.2,1)`;
      xArm1.setAttribute('stroke-dashoffset', '0');
    }, 400); // slight delay before first arm starts

    // Arm2 draws: starts halfway through arm1
    setTimeout(() => {
      xArm2.style.transition = `stroke-dashoffset ${ARM_DUR}ms cubic-bezier(0.4,0,0.2,1)`;
      xArm2.setAttribute('stroke-dashoffset', '0');
    }, 400 + ARM2_LAG);

    // After both arms finish, mark intro complete and clear dasharray
    // so scroll-driven rendering can take over cleanly
    const introDone = 400 + ARM2_LAG + ARM_DUR + 50;
    setTimeout(() => {
      // Remove dasharray so the lines render normally for scroll phase
      xArm1.style.transition = '';
      xArm2.style.transition = '';
      xArm1.removeAttribute('stroke-dasharray');
      xArm1.removeAttribute('stroke-dashoffset');
      xArm2.removeAttribute('stroke-dasharray');
      xArm2.removeAttribute('stroke-dashoffset');
      introComplete = true;

      // Show scroll hint after X finishes
      if (scrollHint) scrollHint.classList.add('visible');
    }, introDone);
  }

  function setup(isResize = false) {
    isMobile = window.innerWidth <= MOBILE_BP;
    driver.style.height = (ANIM_PX + window.innerHeight) + 'px';

    setLine(xArm1, CX-14, CY-14, CX+14, CY+14);
    setLine(xArm2, CX+14, CY-14, CX-14, CY+14);
    xArm1.setAttribute('opacity', '1');
    xArm2.setAttribute('opacity', '1');
    xArm1.setAttribute('stroke-width', '5');
    xArm2.setAttribute('stroke-width', '5');

    circleEl.setAttribute('opacity', '0');
    circleEl.setAttribute('stroke-dashoffset', '1005');
    circleTrace.setAttribute('d', '');
    circleTrace.setAttribute('opacity', '0');
    suppArc.setAttribute('d', '');
    suppArc.setAttribute('opacity', '0');
    terminal.setAttribute('opacity', '0');
    grid.setAttribute('opacity', '0');
    labels.setAttribute('opacity', '0');
    axisLabels.setAttribute('opacity', '0');
    mathEls.forEach(el => el && el.setAttribute('opacity', '0'));
    gRefAngles.setAttribute('opacity', '0');
    sinWavePath.setAttribute('d', '');
    sinWavePath.setAttribute('opacity', '0');
    gTrigRead.setAttribute('opacity', '0');
    wipe.setAttribute('r', '0');
    svg.style.opacity = '1';
    svg.style.transform = 'scale(1)';
    svg.style.transformOrigin = `${(CX/1000*100).toFixed(2)}% ${(CY/600*100).toFixed(2)}%`;
    revealSat.classList.remove('visible');
    revealYet.classList.remove('visible');
    spanSat.classList.remove('yellow');
    satLine.style.width = '0';

    // Reset nav to base state
    if (navWrap) {
      navWrap.classList.remove('nav-drop', 'nav-hidden');
      navWrap.style.transition = '';
      navWrap.style.opacity    = '';
      navWrap.style.transform  = '';
    }
    if (navStudyBtn) navStudyBtn.classList.remove('nav-study-grow');
    if (forthcoming)  forthcoming.classList.remove('visible');
    revState = { sat: false, yet: false, yellow: false, navDrop: false };
    resetRefAngles();
    body.classList.remove('is-dark');

    if (!isResize) {
      introComplete = false;
      scrollHintHidden = false;
      runIntroAnimation();
    }

    render();
  }

  function render() {
    const maxScroll = parseFloat(driver.style.height) - window.innerHeight;
    const p = clamp(window.scrollY / maxScroll, 0, 1);

    // ── ZOOM ─────────────────────────────────────────────────────────────────
    // Phases 1+2 (p 0–0.58): barely perceptible 1.0→1.12x whisper zoom
    // Phase 3 (p 0.58–0.74): smooth zoom-in 1.12→9x into center of circle as wipe expands
    let zoom;
    if (p <= 0.58) {
      zoom = lerp(1.0, 1.12, easeOut(sub(p, 0, 0.58)));
    } else if (p <= 0.74) {
      zoom = lerp(1.12, 9, easeIn(sub(p, 0.58, 0.74)));
    } else {
      zoom = 9;
    }
    svg.style.transform = `scale(${zoom})`;

    // Hide SVG once wipe completes
    const wipeProgress = sub(p, 0.78, 0.88);
    svg.style.opacity = wipeProgress > 0.9
      ? String(Math.max(0, 1 - (wipeProgress - 0.9) * 10))
      : '1';

    // ── PHASE 1 (p 0.01–0.22): X → + axes ───────────────────────────────────
    const p1  = sub(p, 0.01, 0.22);
    const xfm = easeIO(p1);
    setLine(xArm1, lerp(CX-14,CX-AXIS,xfm), lerp(CY-14,CY,xfm), lerp(CX+14,CX+AXIS,xfm), lerp(CY+14,CY,xfm));
    setLine(xArm2, lerp(CX+14,CX,xfm), lerp(CY-14,CY-AXIS,xfm), lerp(CX-14,CX,xfm), lerp(CY+14,CY+AXIS,xfm));
    xArm1.setAttribute('stroke-width', lerp(5, 2, xfm));
    xArm2.setAttribute('stroke-width', lerp(5, 2, xfm));

    grid.setAttribute('opacity', easeOut(sub(p, 0.10, 0.30)) * 0.6);
    labOp = easeOut(sub(p, 0.18, 0.30));
    labels.setAttribute('opacity', labOp);
    axisLabels.setAttribute('opacity', labOp);

    // ── PHASE 2 (p 0.18–0.58): terminal rotates one full revolution ──────────
    const p2 = sub(p, 0.18, 0.58);
    if (p2 > 0 && p2 <= 1.0) {
      // Only Phase 2 logic while revolution is strictly in progress
      terminal.setAttribute('opacity', Math.min(1, p2 * 8));
      const angle = p2 * (2 * Math.PI); // 0 → 2π
      const tx = CX + R * Math.cos(angle);
      const ty = CY - R * Math.sin(angle);
      setLine(terminal, CX, CY, tx, ty);

      // Switch to real SVG circle element at completion — no path displacement possible
      if (p2 >= 0.999) {
        circleTrace.setAttribute('opacity', '0');
        circleTrace.setAttribute('d', '');
        circleEl.setAttribute('opacity', '1');
        circleEl.setAttribute('stroke-dashoffset', '0');
      } else {
        circleEl.setAttribute('opacity', '0');
        circleTrace.setAttribute('opacity', Math.min(1, p2 * 5));
        if (angle < 0.015) {
          circleTrace.setAttribute('d', '');
        } else {
          circleTrace.setAttribute('d', arcCCW(0, angle, R));
        }
      }

      // Reference angles
      gRefAngles.setAttribute('opacity', '1');
      const angleDeg = (angle / Math.PI) * 180;

      refEls.forEach(ref => {
        if (angleDeg < ref.deg - 25) {
          if (ref.appeared) {
            ref.appeared = false; ref.hit = false; ref.settled = false;
            ref.g.setAttribute('opacity', '0');
            ref.tDeg.setAttribute('fill', '#333');
            ref.tRad.setAttribute('opacity', '0');
            ref.tRad.setAttribute('fill', '#555');
          }
          return;
        }
        if (!ref.appeared && ref.deg - angleDeg > 0 && ref.deg - angleDeg <= 20) {
          ref.appeared = true;
          ref.g.setAttribute('opacity', '1');
        }
        if (ref.appeared) {
          if (!ref.hit && Math.abs(angleDeg - ref.deg) <= 5) {
            ref.hit = true;
            ref.tDeg.setAttribute('fill', '#f5c518');
            ref.tRad.setAttribute('opacity', '1');
            ref.tRad.setAttribute('fill', '#f5c518');
          }
          if (ref.hit && !ref.settled && angleDeg > ref.deg + 8) {
            ref.settled = true;
            ref.tDeg.setAttribute('fill', '#222');
            ref.tRad.setAttribute('fill', '#444');
          }
        }
      });

      // Sin wave — bidirectional from origin, locks at x-axis when angle = 2π
      sinWavePath.setAttribute('opacity', Math.min(1, Math.max(0, (p2 - 0.06) * 5)));
      sinWavePath.setAttribute('d', buildSinWaveBidir(angle));

      // Trig readout near terminal tip
      if (p2 > 0.10) {
        gTrigRead.setAttribute('opacity', Math.min(1, (p2 - 0.10) * 6));
        sinReadEl.setAttribute('x', (tx + 14).toFixed(1));
        sinReadEl.setAttribute('y', ((CY + ty) / 2).toFixed(1));
        sinReadEl.textContent = `sin=${Math.sin(angle).toFixed(3)}`;
        cosReadEl.setAttribute('x', ((CX + tx) / 2).toFixed(1));
        cosReadEl.setAttribute('y', (CY + 16).toFixed(1));
        cosReadEl.textContent = `cos=${Math.cos(angle).toFixed(3)}`;
      } else {
        gTrigRead.setAttribute('opacity', '0');
      }

    } else {
      terminal.setAttribute('opacity', '0');
      circleTrace.setAttribute('d', '');
      circleTrace.setAttribute('opacity', '0');
      circleEl.setAttribute('opacity', '0');
      sinWavePath.setAttribute('opacity', '0');
      sinWavePath.setAttribute('d', '');
      gTrigRead.setAttribute('opacity', '0');
      gRefAngles.setAttribute('opacity', '0');
      resetRefAngles();
    }

    // ── PHASE 3 (p 0.58–0.74): hold completed state + zoom into darkness ──────
    // Terminal stays on x-axis, circleEl is the guaranteed-centered circle.
    // Wipe starts immediately at p=0.58 — same moment zoom accelerates —
    // so it feels like rushing into the dark interior of the circle.
    const p3 = sub(p, 0.58, 0.74);
    if (p3 > 0) {
      // Terminal locked at positive x-axis
      setLine(terminal, CX, CY, CX + R, CY);
      terminal.setAttribute('opacity', String(Math.max(0, 1 - easeIn(sub(p3, 0.6, 1.0)))));

      // Use real SVG circle element — stays perfectly centered no matter what
      circleTrace.setAttribute('opacity', '0');
      circleTrace.setAttribute('d', '');
      circleEl.setAttribute('opacity', '1');
      circleEl.setAttribute('stroke-dashoffset', '0');

      // Sin wave fades out as zoom rushes in
      sinWavePath.setAttribute('d', buildSinWaveBidir(2 * Math.PI));
      sinWavePath.setAttribute('opacity', String(Math.max(0, 1 - easeIn(sub(p3, 0.2, 0.7)))));
      gTrigRead.setAttribute('opacity', '0');

      // Ref angles and labels fade out quickly
      const gentleFade = Math.max(0, 1 - easeIn(p3 * 1.4));
      gRefAngles.setAttribute('opacity', String(gentleFade));
      labels.setAttribute('opacity', String(gentleFade * labOp));
      axisLabels.setAttribute('opacity', String(gentleFade * labOp));

      mathEls.forEach(el => el && el.setAttribute('opacity', '0'));
      suppArc.setAttribute('opacity', '0');
      suppArc.setAttribute('d', '');
    } else if (p < 0.58) {
      suppArc.setAttribute('opacity', '0');
      suppArc.setAttribute('d', '');
      mathEls.forEach(el => el && el.setAttribute('opacity', '0'));
    }

    // ── PHASE 4 (p 0.58–0.86): black wipe grows with zoom — slowed down ────────
    // Starts at the same moment as zoom but grows gently so it doesn't rush
    wipe.setAttribute('r', String(easeIn(sub(p, 0.58, 0.86)) * 950));
    if (p > 0.60) body.classList.add('is-dark');
    else          body.classList.remove('is-dark');

    // ── PHASE 5 (p 0.80–0.96): "satified yet?" reveal ───────────────────────
    if (p >= 0.80) { if (!revState.sat) { revState.sat=true; revealSat.classList.add('visible'); } }
    else           { if (revState.sat)  { revState.sat=false; revealSat.classList.remove('visible'); } }
    if (p >= 0.84) { if (!revState.yet) { revState.yet=true; revealYet.classList.add('visible'); } }
    else           { if (revState.yet)  { revState.yet=false; revealYet.classList.remove('visible'); } }
    if (p >= 0.88) {
      if (!revState.yellow) {
        revState.yellow = true;
        spanSat.classList.add('yellow');
        const ww = revealSat.getBoundingClientRect().width;
        const sw = spanSat.getBoundingClientRect().width;
        satLine.style.width = ww > 0 ? ((sw/ww)*100).toFixed(1)+'%' : '38%';
      }
    } else {
      if (revState.yellow) {
        revState.yellow = false;
        spanSat.classList.remove('yellow');
        satLine.style.width = '0';
      }
    }

    // ── PHASE 6 (p 0.94–1.00): Study grows + forthcoming appears ─────────────
    // Nav is always visible (it dropped in on load); just grow the Study button
    if (p >= 0.95) {
      if (!revState.navDrop) {
        revState.navDrop = true;
        if (navStudyBtn) navStudyBtn.classList.add('nav-study-grow');
        if (forthcoming)  forthcoming.classList.add('visible');
      }
    } else {
      if (revState.navDrop) {
        revState.navDrop = false;
        if (navStudyBtn) navStudyBtn.classList.remove('nav-study-grow');
        if (forthcoming)  forthcoming.classList.remove('visible');
      }
    }

    ticking = false;
  }

  let scrollHintHidden = false;
  window.addEventListener('scroll', () => {
    if (!scrollHintHidden && window.scrollY > 10) {
      scrollHintHidden = true;
      if (scrollHint) {
        scrollHint.classList.remove('visible');
        scrollHint.classList.add('hidden');
      }
    }
    if (!ticking) { requestAnimationFrame(render); ticking = true; }
  }, { passive: true });

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => setup(true), 100);
  }, { passive: true });

  // ── INFO TOOLTIP CLICK TOGGLE ─────────────────────────────────────────────
  const infoBtn     = document.getElementById('nav-info-btn');
  const infoTooltip = document.getElementById('nav-tooltip');
  const infoWrap    = document.getElementById('nav-info-wrap');

  if (infoBtn && infoTooltip) {
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = infoWrap.classList.toggle('tooltip-open');
      infoBtn.setAttribute('aria-expanded', String(isOpen));
      infoTooltip.setAttribute('aria-hidden', String(!isOpen));
    });
    // Close when clicking anywhere outside
    document.addEventListener('click', (e) => {
      if (!infoWrap.contains(e.target)) {
        infoWrap.classList.remove('tooltip-open');
        infoBtn.setAttribute('aria-expanded', 'false');
        infoTooltip.setAttribute('aria-hidden', 'true');
      }
    });
  }

  setup();

})();