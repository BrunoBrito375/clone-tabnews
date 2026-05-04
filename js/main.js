// ============================================================
// ENGFORCE — main.js
// ============================================================

// ----- NAV scroll effect -----
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

// ----- Active nav link on scroll -----
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((a) => a.classList.remove("active"));
        const active = document.querySelector(
          `.nav-link[href="#${entry.target.id}"]`,
        );
        if (active) active.classList.add("active");
      }
    });
  },
  { threshold: 0.35 },
);

sections.forEach((s) => observer.observe(s));

// ----- Mobile menu toggle -----
const menuToggle = document.getElementById("menuToggle");
const navLinksEl = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinksEl.classList.toggle("open");
});

// Close menu on link click (mobile)
navLinksEl.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinksEl.classList.remove("open");
  });
});

// ----- Scroll reveal -----
const revealEls = document.querySelectorAll(
  ".svc-card, .proj-card, .about-card-highlight, .about-badge-row, .contact-form-wrap, .contact-left",
);

revealEls.forEach((el, i) => {
  el.classList.add("reveal");
  if (i % 3 === 1) el.classList.add("reveal-delay-1");
  if (i % 3 === 2) el.classList.add("reveal-delay-2");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealEls.forEach((el) => revealObserver.observe(el));

// ----- Contact form -----
function submitContact(e) {
  e.preventDefault();
  const successEl = document.getElementById("formSuccess");
  successEl.style.display = "block";
  e.target.reset();
  setTimeout(() => {
    successEl.style.display = "none";
  }, 6000);
}

/* EngForce — Hero Animation
   Substitui o gear-container por uma animação em canvas:
   Ato 1: Soldado espartano entra com espada
   Ato 2: Espada bate nas engrenagens → faíscas
   Ato 3: Engrenagem se transforma na logo EngForce
*/

(function () {
  const BLUE = "#005eb8";
  const BLUE_LIGHT = "#0075e0";
  const WHITE = "#ffffff";
  const DARK = "#0a0f1a";

  // ── Substitui o gear-container por um canvas ──
  const container = document.querySelector(".gear-container");
  if (!container) return;

  const canvas = document.createElement("canvas");
  canvas.width = 340;
  canvas.height = 340;
  canvas.style.cssText = "width:100%;height:100%;display:block;";
  container.innerHTML = "";
  container.style.cssText = "position:relative;width:340px;height:340px;";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  const CX = W / 2;
  const CY = H / 2 - 10;

  // ── Estado global ──
  let t = 0; // frame counter
  let phase = 0; // 0=intro 1=warrior 2=sparks 3=transform 4=logo
  let gearAngle = 0;
  let gearAngle2 = 0;
  let sparks = [];
  let logoAlpha = 0;
  let gearScale = 1;
  let textAlpha = 0;
  let warriorX = -80;
  let warriorAlpha = 0;
  let swordAngle = -0.8;
  let impactFlash = 0;
  let transformProgress = 0;
  let logoScale = 0;
  let plumeWave = 0;
  let raf;

  // ── Desenha engrenagem ──
  function drawGear(x, y, r, teeth, toothH, angle, alpha, strokeColor, lineW) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineW;
    ctx.fillStyle = "none";

    ctx.beginPath();
    const toothW = (2 * Math.PI * r) / teeth / 2.5;
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const a1 = a - toothW / r;
      const a2 = a + toothW / r;
      ctx.moveTo(Math.cos(a1) * r, Math.sin(a1) * r);
      ctx.lineTo(Math.cos(a1) * (r + toothH), Math.sin(a1) * (r + toothH));
      ctx.lineTo(Math.cos(a2) * (r + toothH), Math.sin(a2) * (r + toothH));
      ctx.lineTo(Math.cos(a2) * r, Math.sin(a2) * r);
    }
    ctx.stroke();

    // inner ring
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // spokes
    ctx.lineWidth = lineW * 0.7;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r * 0.2, Math.sin(a) * r * 0.2);
      ctx.lineTo(Math.cos(a) * r * 0.65, Math.sin(a) * r * 0.65);
      ctx.stroke();
    }

    // center
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = strokeColor;
    ctx.fill();

    ctx.restore();
  }

  // ── Desenha soldado espartano SVG-style via canvas ──
  function drawWarrior(x, y, alpha, swordAng) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    const s = 1.1;

    // --- Helmet crest (plume) ---
    ctx.save();
    ctx.fillStyle = BLUE;
    // plume feathers with wave
    for (let i = 0; i < 8; i++) {
      const px = -8 + i * 4;
      const py = -90 - 30 * Math.sin(plumeWave + i * 0.4);
      ctx.beginPath();
      ctx.ellipse(
        px * s,
        py * s,
        3 * s,
        12 * s,
        Math.sin(plumeWave + i * 0.3) * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    // plume base
    ctx.beginPath();
    ctx.ellipse(-4 * s, -62 * s, 14 * s, 6 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // --- Helmet body ---
    ctx.save();
    ctx.fillStyle = "#1a1a1a";
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2;
    // main helmet shape
    ctx.beginPath();
    ctx.ellipse(-4 * s, -52 * s, 22 * s, 28 * s, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // cheek guard
    ctx.beginPath();
    ctx.moveTo(-22 * s, -38 * s);
    ctx.quadraticCurveTo(-28 * s, -22 * s, -18 * s, -12 * s);
    ctx.quadraticCurveTo(-8 * s, -8 * s, 2 * s, -16 * s);
    ctx.lineTo(2 * s, -40 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // visor slit
    ctx.fillStyle = BLUE + "88";
    ctx.beginPath();
    ctx.rect(-20 * s, -46 * s, 16 * s, 5 * s);
    ctx.fill();
    // helmet detail line
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-2 * s, -78 * s);
    ctx.lineTo(-2 * s, -58 * s);
    ctx.stroke();
    ctx.restore();

    // --- Body / armor ---
    ctx.save();
    ctx.fillStyle = "#222";
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2;
    // torso
    ctx.beginPath();
    ctx.moveTo(-18 * s, -12 * s);
    ctx.lineTo(14 * s, -12 * s);
    ctx.lineTo(18 * s, 30 * s);
    ctx.lineTo(-22 * s, 30 * s);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // chest plate lines
    ctx.strokeStyle = BLUE + "aa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-14 * s, -8 * s);
    ctx.lineTo(10 * s, -8 * s);
    ctx.moveTo(-15 * s, 0);
    ctx.lineTo(11 * s, 0);
    ctx.moveTo(-16 * s, 10 * s);
    ctx.lineTo(12 * s, 10 * s);
    ctx.stroke();
    // shoulder
    ctx.fillStyle = "#1a1a1a";
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(16 * s, -16 * s, 8 * s, 12 * s, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // --- Cape (blue wave behind body) ---
    ctx.save();
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.moveTo(-18 * s, -12 * s);
    ctx.quadraticCurveTo(
      -38 * s,
      10 * s + Math.sin(plumeWave) * 4,
      -30 * s,
      50 * s,
    );
    ctx.lineTo(-22 * s, 50 * s);
    ctx.quadraticCurveTo(-28 * s, 10 * s, -10 * s, -8 * s);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // --- Arm holding sword ---
    ctx.save();
    ctx.translate(14 * s, -8 * s);
    ctx.rotate(swordAng);
    // arm
    ctx.fillStyle = "#222";
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(-6 * s, 0, 12 * s, 35 * s);
    ctx.fill();
    ctx.stroke();
    // hand
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.ellipse(0, 38 * s, 7 * s, 8 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // SWORD
    // hilt
    ctx.fillStyle = "#888";
    ctx.strokeStyle = "#aaa";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.rect(-10 * s, 42 * s, 20 * s, 6 * s);
    ctx.fill();
    ctx.stroke();
    // grip
    ctx.fillStyle = "#555";
    ctx.beginPath();
    ctx.rect(-3 * s, 48 * s, 6 * s, 14 * s);
    ctx.fill();
    // pommel
    ctx.fillStyle = "#888";
    ctx.beginPath();
    ctx.ellipse(0, 64 * s, 5 * s, 5 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // BLADE (pointing toward gears)
    ctx.save();
    ctx.rotate(-Math.PI / 2 - swordAng * 0.5);
    // blade body
    const bladeGrad = ctx.createLinearGradient(0, 0, 80 * s, 0);
    bladeGrad.addColorStop(0, "#cccccc");
    bladeGrad.addColorStop(0.5, "#ffffff");
    bladeGrad.addColorStop(1, "#888888");
    ctx.fillStyle = bladeGrad;
    ctx.beginPath();
    ctx.moveTo(0, -3 * s);
    ctx.lineTo(90 * s, -1 * s);
    ctx.lineTo(95 * s, 0);
    ctx.lineTo(90 * s, 1 * s);
    ctx.lineTo(0, 3 * s);
    ctx.closePath();
    ctx.fill();
    // blade edge shine
    ctx.strokeStyle = "rgba(255,255,255,0.6)";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(5 * s, -1.5 * s);
    ctx.lineTo(88 * s, -0.5 * s);
    ctx.stroke();
    ctx.restore();
    ctx.restore();

    // --- Legs ---
    ctx.save();
    ctx.fillStyle = "#1a1a1a";
    ctx.strokeStyle = BLUE;
    ctx.lineWidth = 2;
    // left leg
    ctx.beginPath();
    ctx.rect(-16 * s, 30 * s, 13 * s, 40 * s);
    ctx.fill();
    ctx.stroke();
    // right leg
    ctx.beginPath();
    ctx.rect(3 * s, 30 * s, 13 * s, 40 * s);
    ctx.fill();
    ctx.stroke();
    // greaves (shin guards)
    ctx.fillStyle = "#333";
    ctx.strokeStyle = BLUE + "aa";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.rect(-14 * s, 40 * s, 9 * s, 28 * s);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.rect(5 * s, 40 * s, 9 * s, 28 * s);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  // ── Cria faísca ──
  function spawnSparks(count) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5;
      sparks.push({
        x: CX - 30 + (Math.random() - 0.5) * 30,
        y: CY - 20 + (Math.random() - 0.5) * 20,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd - 2,
        life: 0.8 + Math.random() * 0.8,
        maxLife: 0.8 + Math.random() * 0.8,
        size: 1.5 + Math.random() * 3,
        color: Math.random() > 0.5 ? "#ffcc00" : "#ff8800",
      });
    }
  }

  // ── Atualiza faíscas ──
  function updateSparks() {
    const dt = 0.04;
    sparks = sparks.filter((s) => s.life > 0);
    sparks.forEach((s) => {
      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.18; // gravity
      s.vx *= 0.97;
      s.life -= dt;
    });
  }

  // ── Desenha faíscas ──
  function drawSparks() {
    sparks.forEach((s) => {
      const a = Math.max(0, s.life / s.maxLife);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.fillStyle = s.color;
      // spark streak
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(Math.atan2(s.vy, s.vx));
      ctx.beginPath();
      ctx.ellipse(0, 0, s.size * 2, s.size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      // glow
      const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
      g.addColorStop(0, s.color + "ff");
      g.addColorStop(1, s.color + "00");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  // ── Desenha logo final ──
  function drawLogo(alpha, scale) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(CX, CY - 20);
    ctx.scale(scale, scale);

    const R = 85;
    // Outer gear ring
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 18;
    ctx.beginPath();
    ctx.arc(0, 0, R, 0, Math.PI * 2);
    ctx.stroke();
    // teeth
    ctx.fillStyle = "#1a1a1a";
    const teeth = 12;
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.rect(-7, -(R + 18), 14, 18);
      ctx.fill();
      ctx.restore();
    }

    // Inner white circle
    ctx.fillStyle = WHITE;
    ctx.beginPath();
    ctx.arc(0, 0, R - 6, 0, Math.PI * 2);
    ctx.fill();

    // Blue circle behind helmet
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(0, 0, R - 8, 0, Math.PI * 2);
    ctx.fill();

    // Helmet silhouette (simplified)
    // Body
    ctx.fillStyle = "#1a1a1a";
    ctx.beginPath();
    ctx.ellipse(2, 8, 32, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cheek guard
    ctx.beginPath();
    ctx.moveTo(-28, 20);
    ctx.quadraticCurveTo(-38, 38, -24, 50);
    ctx.quadraticCurveTo(-6, 56, 8, 42);
    ctx.lineTo(8, 20);
    ctx.closePath();
    ctx.fill();
    // Crest/plume
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.ellipse(0, -46, 18, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.ellipse(
        -12 + i * 5,
        -54 - i * 3,
        4,
        12,
        Math.sin(i * 0.8) * 0.3,
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    // Wave (blue at bottom)
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.moveTo(-(R - 8), 50);
    ctx.quadraticCurveTo(-(R - 8) * 0.4, 38, 0, 48);
    ctx.quadraticCurveTo((R - 8) * 0.4, 58, R - 8, 46);
    ctx.lineTo(R - 8, R - 8);
    ctx.arc(0, 0, R - 8, 0, Math.PI, true);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // EngForce text
    ctx.save();
    ctx.globalAlpha = alpha * textAlpha;
    ctx.translate(CX, CY + 90);
    ctx.textAlign = "center";
    ctx.font = `bold 38px 'Bebas Neue', sans-serif`;
    ctx.fillStyle = "#1a1a1a";
    ctx.fillText("Eng", CX - CX - 24, 0);
    ctx.fillStyle = BLUE;
    ctx.fillText("Force", CX - CX + 38, 0);
    ctx.restore();
  }

  // ── Loop principal ──
  function tick() {
    ctx.clearRect(0, 0, W, H);
    t++;
    plumeWave += 0.06;

    // Background subtle grid
    ctx.save();
    ctx.strokeStyle = "rgba(0,94,184,0.04)";
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }
    for (let y = 0; y < H; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }
    ctx.restore();

    // ── PHASE 0: Gears spinning, warrior off screen ──
    if (phase === 0) {
      gearAngle += 0.012;
      gearAngle2 -= 0.018;
      drawGear(CX, CY, 70, 12, 14, gearAngle, 0.5, BLUE, 2);
      drawGear(CX, CY, 40, 8, 10, gearAngle * 1.2, 0.35, BLUE_LIGHT, 1.5);

      // Circuit lines
      ctx.save();
      ctx.strokeStyle = "rgba(0,94,184,0.2)";
      ctx.lineWidth = 1;
      const paths = [
        [
          [0, 150],
          [60, 150],
          [60, 80],
          [120, 80],
        ],
        [
          [300, 150],
          [240, 150],
          [240, 220],
          [180, 220],
        ],
        [
          [150, 0],
          [150, 60],
          [220, 60],
        ],
        [
          [150, 300],
          [150, 240],
          [80, 240],
        ],
      ];
      paths.forEach((pts) => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
        ctx.stroke();
      });
      ctx.restore();

      if (t > 60) {
        phase = 1;
      }
    }

    // ── PHASE 1: Warrior enters ──
    else if (phase === 1) {
      gearAngle += 0.012;
      gearAngle2 -= 0.018;
      drawGear(CX, CY, 70, 12, 14, gearAngle, 0.5, BLUE, 2);
      drawGear(CX, CY, 40, 8, 10, gearAngle * 1.2, 0.35, BLUE_LIGHT, 1.5);

      warriorX = Math.min(warriorX + 3.5, 95);
      warriorAlpha = Math.min(warriorAlpha + 0.04, 1);
      drawWarrior(warriorX, CY + 60, warriorAlpha, swordAngle);

      if (warriorX >= 95) {
        phase = 2;
      }
    }

    // ── PHASE 2: Sword strike + sparks ──
    else if (phase === 2) {
      gearAngle += 0.018;
      gearAngle2 -= 0.025;

      // Flash on impact
      if (impactFlash > 0) {
        ctx.save();
        ctx.fillStyle = `rgba(255,200,0,${impactFlash * 0.3})`;
        ctx.fillRect(0, 0, W, H);
        ctx.restore();
        impactFlash -= 0.06;
      }

      drawGear(CX, CY, 70, 12, 14, gearAngle, 0.6, BLUE, 2.5);
      drawGear(CX, CY, 40, 8, 10, gearAngle * 1.2, 0.45, BLUE_LIGHT, 2);

      // Sword sweeps down
      swordAngle = Math.min(swordAngle + 0.04, 0.4);

      drawWarrior(warriorX, CY + 60, warriorAlpha, swordAngle);

      // Sparks when sword at peak
      if (swordAngle > 0.1 && t % 2 === 0) {
        spawnSparks(5 + Math.floor(Math.random() * 6));
        if (impactFlash <= 0) impactFlash = 0.8;
      }
      updateSparks();
      drawSparks();

      if (t > 160 + 60) {
        phase = 3;
      }
    }

    // ── PHASE 3: Transform ──
    else if (phase === 3) {
      transformProgress = Math.min(transformProgress + 0.015, 1);
      const ease =
        transformProgress < 0.5
          ? 2 * transformProgress * transformProgress
          : -1 + (4 - 2 * transformProgress) * transformProgress;

      // Warrior fades out
      warriorAlpha = Math.max(warriorAlpha - 0.025, 0);
      if (warriorAlpha > 0)
        drawWarrior(warriorX, CY + 60, warriorAlpha, swordAngle);

      // Remaining sparks
      updateSparks();
      drawSparks();

      // Gears spin and shrink
      gearAngle += 0.02 * (1 - ease * 0.5);
      drawGear(
        CX,
        CY,
        70 * (1 - ease * 0.5),
        12,
        14,
        gearAngle,
        0.6 - ease * 0.5,
        BLUE,
        2,
      );

      // Logo fades in
      logoAlpha = ease;
      logoScale = 0.3 + ease * 0.7;
      if (logoAlpha > 0.1) {
        drawLogo(logoAlpha, logoScale);
      }
      textAlpha = Math.max(0, (ease - 0.6) / 0.4);

      if (transformProgress >= 1) {
        phase = 4;
      }
    }

    // ── PHASE 4: Logo settled ──
    else if (phase === 4) {
      // Subtle pulse
      const pulse = 1 + Math.sin(t * 0.03) * 0.01;
      textAlpha = Math.min(textAlpha + 0.02, 1);
      drawLogo(1, pulse);
    }

    raf = requestAnimationFrame(tick);
  }

  // Inicia
  raf = requestAnimationFrame(tick);

  // Restart ao clicar
  canvas.style.cursor = "pointer";
  canvas.title = "Clique para repetir a animação";
  canvas.addEventListener("click", () => {
    cancelAnimationFrame(raf);
    t = 0;
    phase = 0;
    gearAngle = 0;
    gearAngle2 = 0;
    sparks = [];
    logoAlpha = 0;
    gearScale = 1;
    textAlpha = 0;
    warriorX = -80;
    warriorAlpha = 0;
    swordAngle = -0.8;
    impactFlash = 0;
    transformProgress = 0;
    logoScale = 0;
    plumeWave = 0;
    raf = requestAnimationFrame(tick);
  });
})();
