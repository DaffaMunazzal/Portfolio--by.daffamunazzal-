/* src/components/ui/InteractiveNametag.jsx
   ==========================================================================
   Large Hero Interactive Matter.js Lanyard Nametag Component
   - Enlarged to match the prominent blue-box hero showcase dimensions (480px x 610px)
   - Completely removes the previous white tab/square above the card
   - Metal clasp hooks DIRECTLY onto the top of the card/placeholder
   - Placeholder image sized 1:1 to src/assets/images/nametag_fill.png
   - Automatic client-side WebP compression for 60fps multiplatform smoothness
   - Matter.js gravity, spring harmonic bouncing, pendulum dangle & drag/throw
   ========================================================================== */

import { useEffect, useRef, useState, useCallback } from "react";
import lanyardImg from "../../assets/images/White Lanyard Badge Holder.png";
import nametagFillImg from "../../assets/images/nametag_fill.png";

/**
 * Loads Matter.js safely with dynamic CDN fallback
 */
async function loadMatterEngine() {
  if (typeof window !== "undefined" && window.Matter) {
    return window.Matter;
  }
  try {
    const pkg = "matter-js";
    const mod = await import(/* @vite-ignore */ pkg);
    return mod.default || mod;
  } catch {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && window.Matter) {
        return resolve(window.Matter);
      }
      const existing = document.getElementById("matter-js-cdn");
      if (existing) {
        existing.addEventListener("load", () => resolve(window.Matter));
        return;
      }
      const script = document.createElement("script");
      script.id = "matter-js-cdn";
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js";
      script.async = true;
      script.onload = () => resolve(window.Matter);
      script.onerror = (err) => reject(new Error("Failed to load Matter.js: " + err));
      document.head.appendChild(script);
    });
  }
}

export default function InteractiveNametag({
  className = "",
  initialDrop = true,
  showControls = true,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardElementRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [tiltAngle, setTiltAngle] = useState(0);

  // Optimized / compressed image source (WebP blob for maximum 60fps performance)
  const [optimizedFillSrc, setOptimizedFillSrc] = useState(nametagFillImg);

  // Physics state references
  const physicsRef = useRef({
    engine: null,
    cardBody: null,
    constraint: null,
    anchor: { x: 280, y: 0 },
    strapLength: 135,
  });

  // Full-screen interactive drag tracker
  const activeDragRef = useRef({
    isDown: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    constraint: null,
  });

  const dragTracker = useRef({
    startX: 0,
    startY: 0,
    isPointerDown: false,
    hasMoved: false,
  });

  // Client-side image compression & optimization (WebP, retina 2x width 960px)
  useEffect(() => {
    const img = new Image();
    img.src = nametagFillImg;
    img.onload = () => {
      try {
        const aspect = img.naturalWidth / img.naturalHeight;
        const targetWidth = 960;
        const targetHeight = Math.round(targetWidth / aspect);

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          const webpData = canvas.toDataURL("image/webp", 0.86);
          if (webpData && webpData.startsWith("data:image/webp")) {
            setOptimizedFillSrc(webpData);
          } else {
            const jpegData = canvas.toDataURL("image/jpeg", 0.86);
            setOptimizedFillSrc(jpegData);
          }
        }
      } catch {
        setOptimizedFillSrc(nametagFillImg);
      }
    };
  }, []);

  // Apply an elastic impulse force (tap to bounce)
  const triggerImpulse = useCallback((forceX = 0.16, forceY = 0.24) => {
    const { cardBody } = physicsRef.current;
    if (!cardBody) return;
    const Matter = window.Matter;
    if (!Matter) return;

    Matter.Sleeping?.set(cardBody, false);
    Matter.Body.applyForce(
      cardBody,
      { x: cardBody.position.x, y: cardBody.position.y },
      {
        x: (Math.random() - 0.5) * forceX,
        y: forceY,
      }
    );
    setHasInteracted(true);
  }, []);

  // Reset to resting position
  const resetPosition = useCallback(() => {
    const { cardBody, anchor, strapLength } = physicsRef.current;
    if (!cardBody) return;
    const Matter = window.Matter;
    if (!Matter) return;

    Matter.Body.setPosition(cardBody, {
      x: anchor.x,
      y: anchor.y + strapLength + 200,
    });
    Matter.Body.setVelocity(cardBody, { x: 0, y: 0 });
    Matter.Body.setAngle(cardBody, 0);
    Matter.Body.setAngularVelocity(cardBody, 0);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    let animationFrameId = null;

    loadMatterEngine().then((Matter) => {
      if (isCancelled || !containerRef.current || !canvasRef.current) return;

      const {
        Engine,
        Bodies,
        Composite,
        Constraint,
        Mouse,
        MouseConstraint,
        Events,
      } = Matter;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const width = container.clientWidth || 560;
      const height = container.clientHeight || 820;

      const padX = 1400;
      const padY = 700;
      const totalWidth = width + padX * 2;
      const totalHeight = height + padY * 2;

      // High-DPI Canvas
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = totalWidth * dpr;
      canvas.height = totalHeight * dpr;
      ctx.scale(dpr, dpr);

      // Matter.js Physics Engine with authentic gravity
      const engine = Engine.create({
        gravity: {
          x: 0,
          y: 1.55,
          scale: 0.001,
        },
      });

      // Dimensions: Scaled up to match the large blue-box hero showcase
      const cardWidth = 480;
      const cardHeight = 610;
      const cardHalfHeight = cardHeight / 2; // 305
      const clipOffset = 48; // Distance from card top edge to D-ring bar
      const attachLocalY = -cardHalfHeight - clipOffset; // -353px from center

      const anchorX = width / 2;
      const anchorY = 0;
      const strapLength = 135; // Resting lanyard length

      physicsRef.current.anchor = { x: anchorX, y: anchorY };
      physicsRef.current.strapLength = strapLength;

      // Card Physics Body (super bouncy & low air friction)
      const startY = initialDrop ? anchorY + 120 : anchorY + strapLength + 200;
      const cardBody = Bodies.rectangle(anchorX, startY, cardWidth, cardHeight, {
        chamfer: { radius: 24 },
        density: 0.0035,
        frictionAir: 0.012, // Low air friction for extended pendulum swinging & bouncing
        restitution: 0.88,  // Extra bounciness!
        collisionFilter: { group: -1 },
      });

      // Elastic Lanyard Spring Constraint (super lively harmonic bounce)
      const lanyardConstraint = Constraint.create({
        pointA: { x: anchorX, y: anchorY },
        bodyB: cardBody,
        pointB: { x: 0, y: attachLocalY },
        length: strapLength,
        stiffness: 0.065, // Spring elasticity for dynamic bouncy stretch
        damping: 0.018,    // Low damping for bouncy harmonic oscillation waves
      });

      // Add bodies to world (card, elastic lanyard constraint)
      Composite.add(engine.world, [cardBody, lanyardConstraint]);

      physicsRef.current.engine = engine;
      physicsRef.current.cardBody = cardBody;
      physicsRef.current.constraint = lanyardConstraint;

      setIsLoaded(true);

      // Initial natural lateral sway on spawn
      if (initialDrop) {
        Matter.Body.setVelocity(cardBody, { x: 3.8, y: 1.6 });
        Matter.Body.setAngularVelocity(cardBody, 0.016);
      }

      // ── Physics & Render Animation Loop ──
      let lastTime = performance.now();
      let lastVx = 0;
      let lastCollisionTime = 0;

      const render = (time) => {
        const delta = Math.min(time - lastTime, 32);
        lastTime = time;

        Engine.update(engine, delta);
        ctx.clearRect(0, 0, totalWidth, totalHeight);

        // Precise world coordinates of D-ring attachment point
        const angle = cardBody.angle;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);

        // Exact attachment point of the strap on the D-ring bar
        const attachX = cardBody.position.x - attachLocalY * sin;
        const attachY = cardBody.position.y + attachLocalY * cos;

        // Draw photorealistic lanyard ribbon with zero gap into D-ring (offset into padded canvas)
        drawSeamlessLanyard(ctx, anchorX + padX, anchorY + padY, attachX + padX, attachY + padY, strapLength, angle);

        // Synchronize DOM card position & rotation
        if (cardElementRef.current) {
          const el = cardElementRef.current;
          el.style.transform = `translate3d(${cardBody.position.x}px, ${cardBody.position.y}px, 0px) translate(-50%, -50%) rotate(${angle}rad)`;
        }

        setTiltAngle(angle);

        // ── Expose Velocity & Border Collision to Global System (60fps reactive sync) ──
        const vx = cardBody.velocity.x;
        const vy = cardBody.velocity.y;
        const speed = Math.hypot(vx, vy);

        window.dispatchEvent(
          new CustomEvent("nametag:velocity", {
            detail: {
              vx,
              vy,
              speed,
              angle,
              x: cardBody.position.x,
              y: cardBody.position.y,
            },
          })
        );

        // Check for boundary rebound or sudden velocity jerk (elastic snap)
        const hitLeft = cardBody.position.x - cardWidth * 0.4 <= 15 && vx < -1.5;
        const hitRight = cardBody.position.x + cardWidth * 0.4 >= width - 15 && vx > 1.5;
        const suddenJerk = Math.abs(vx - lastVx) > 6.0 && speed > 3.0;

        if (hitLeft || hitRight || suddenJerk) {
          const now = performance.now();
          if (now - lastCollisionTime > 160) {
            lastCollisionTime = now;
            window.dispatchEvent(
              new CustomEvent("nametag:collision", {
                detail: {
                  intensity: Math.min(1, Math.max(0.3, speed / 7)),
                  time: now,
                },
              })
            );
          }
        }
        lastVx = vx;

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    });

    return () => {
      isCancelled = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (physicsRef.current.engine && window.Matter) {
        window.Matter.Composite.clear(physicsRef.current.engine.world, false);
        window.Matter.Engine.clear(physicsRef.current.engine);
      }
    };
  }, [initialDrop]);

  /**
   * Draws a photorealistic white woven lanyard ribbon connecting ceiling anchor
   * seamlessly into the D-ring.
   */
  const drawSeamlessLanyard = (ctx, x1, y1, x2, y2, naturalLength, cardAngle) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.hypot(dx, dy);

    // Catenary sag when loose
    const sag = Math.max(0, (naturalLength - dist) * 0.38);
    const midX = (x1 + x2) / 2 + (dx > 0 ? -sag * 0.25 : sag * 0.25);
    const midY = (y1 + y2) / 2 + sag;

    const ribbonWidth = 30;
    const nx = -dy / (dist || 1);
    const ny = dx / (dist || 1);

    // Extend ribbon tip 14px past attachment point into D-ring
    const extX = x2 - Math.sin(cardAngle) * 14;
    const extY = y2 + Math.cos(cardAngle) * 14;

    // 1. Soft Drop Shadow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1 + 4, y1);
    ctx.quadraticCurveTo(midX + 4, midY + 4, extX + 4, extY + 4);
    ctx.lineWidth = ribbonWidth + 4;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.22)";
    ctx.lineCap = "round";
    ctx.filter = "blur(5px)";
    ctx.stroke();
    ctx.restore();

    // 2. Main White Fabric Ribbon Body
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(midX, midY, extX, extY);
    ctx.lineWidth = ribbonWidth;
    ctx.lineCap = "round";

    const grad = ctx.createLinearGradient(
      x1 + (nx * ribbonWidth) / 2,
      y1 + (ny * ribbonWidth) / 2,
      x1 - (nx * ribbonWidth) / 2,
      y1 - (ny * ribbonWidth) / 2
    );
    grad.addColorStop(0, "#D0D0D0");
    grad.addColorStop(0.2, "#EAEAEA");
    grad.addColorStop(0.5, "#FFFFFF");
    grad.addColorStop(0.8, "#EDEDED");
    grad.addColorStop(1, "#C8C8C8");
    ctx.strokeStyle = grad;
    ctx.stroke();

    // 3. Subtle Red Accent Center Stripe
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(midX, midY, extX, extY);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "rgba(217, 30, 30, 0.75)";
    ctx.stroke();

    // 4. Fine Edge Stitching
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(150, 150, 150, 0.65)";
    ctx.setLineDash([3, 3]);

    // Left stitch
    ctx.beginPath();
    ctx.moveTo(x1 + (nx * (ribbonWidth - 6)) / 2, y1 + (ny * (ribbonWidth - 6)) / 2);
    ctx.quadraticCurveTo(
      midX + (nx * (ribbonWidth - 6)) / 2,
      midY + (ny * (ribbonWidth - 6)) / 2,
      extX + (nx * (ribbonWidth - 6)) / 2,
      extY + (ny * (ribbonWidth - 6)) / 2
    );
    ctx.stroke();

    // Right stitch
    ctx.beginPath();
    ctx.moveTo(x1 - (nx * (ribbonWidth - 6)) / 2, y1 - (ny * (ribbonWidth - 6)) / 2);
    ctx.quadraticCurveTo(
      midX - (nx * (ribbonWidth - 6)) / 2,
      midY - (ny * (ribbonWidth - 6)) / 2,
      extX - (nx * (ribbonWidth - 6)) / 2,
      extY - (nx * (ribbonWidth - 6)) / 2
    );
    ctx.stroke();
    ctx.restore();

    // 5. Ceiling Mount Metal Ring
    ctx.fillStyle = "#161616";
    ctx.beginPath();
    ctx.arc(x1, y1, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#A0A0A0";
    ctx.beginPath();
    ctx.arc(x1, y1, 5, 0, Math.PI * 2);
    ctx.fill();

    // 6. Chrome D-Ring Front Bar (Renders over the strap tip)
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(cardAngle);

    ctx.beginPath();
    ctx.roundRect(-ribbonWidth / 2 - 4, -4, ribbonWidth + 8, 8, 4);
    const ringGrad = ctx.createLinearGradient(0, -4, 0, 4);
    ringGrad.addColorStop(0, "#F5F5F5");
    ringGrad.addColorStop(0.3, "#D0D0D5");
    ringGrad.addColorStop(0.7, "#888890");
    ringGrad.addColorStop(1, "#404045");
    ctx.fillStyle = ringGrad;
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 4;
    ctx.shadowOffsetY = 2;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.stroke();
    ctx.restore();
  };

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const container = containerRef.current;
    const { cardBody, engine } = physicsRef.current;
    if (!container || !cardBody || !engine || !window.Matter) return;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}

    const rect = container.getBoundingClientRect();
    const scaleX = rect.width / (container.offsetWidth || 1);
    const scaleY = rect.height / (container.offsetHeight || 1);
    const localX = (e.clientX - rect.left) / scaleX;
    const localY = (e.clientY - rect.top) / scaleY;

    window.Matter.Sleeping?.set(cardBody, false);

    const angle = cardBody.angle;
    const dx = localX - cardBody.position.x;
    const dy = localY - cardBody.position.y;
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);
    const grabLocalX = dx * cos - dy * sin;
    const grabLocalY = dx * sin + dy * cos;

    // Create dynamic elastic drag constraint
    const dragConstraint = window.Matter.Constraint.create({
      pointA: { x: localX, y: localY },
      bodyB: cardBody,
      pointB: { x: grabLocalX, y: grabLocalY },
      stiffness: 0.35,
      damping: 0.05,
      length: 0,
      render: { visible: false },
    });

    window.Matter.Composite.add(engine.world, dragConstraint);

    activeDragRef.current = {
      isDown: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      lastX: localX,
      lastY: localY,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
      constraint: dragConstraint,
    };

    setIsDragging(true);
    setHasInteracted(true);
  };

  const handlePointerMove = (e) => {
    const drag = activeDragRef.current;
    if (!drag.isDown || !drag.constraint) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scaleX = rect.width / (container.offsetWidth || 1);
    const scaleY = rect.height / (container.offsetHeight || 1);
    const localX = (e.clientX - rect.left) / scaleX;
    const localY = (e.clientY - rect.top) / scaleY;

    drag.constraint.pointA = { x: localX, y: localY };

    const now = performance.now();
    const dt = Math.max(10, now - drag.lastTime);
    drag.vx = ((localX - drag.lastX) / dt) * 16;
    drag.vy = ((localY - drag.lastY) / dt) * 16;
    drag.lastX = localX;
    drag.lastY = localY;
    drag.lastTime = now;
  };

  const handlePointerUp = (e) => {
    const drag = activeDragRef.current;
    if (!drag.isDown) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}

    const { cardBody, engine } = physicsRef.current;
    if (drag.constraint && engine && window.Matter) {
      window.Matter.Composite.remove(engine.world, drag.constraint);
    }

    if (cardBody && window.Matter) {
      const dist = Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY);
      if (dist < 8) {
        // Quick tap impulse to bounce
        triggerImpulse(0.14, 0.24);
      } else {
        // Fling with throw velocity
        const clampedVx = Math.max(-28, Math.min(28, drag.vx));
        const clampedVy = Math.max(-28, Math.min(28, drag.vy));
        window.Matter.Body.setVelocity(cardBody, {
          x: cardBody.velocity.x * 0.4 + clampedVx * 0.65,
          y: cardBody.velocity.y * 0.4 + clampedVy * 0.65,
        });
      }
    }

    activeDragRef.current = {
      isDown: false,
      pointerId: null,
      startX: 0,
      startY: 0,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      vx: 0,
      vy: 0,
      constraint: null,
    };

    setIsDragging(false);
  };

  // Full-screen window fallback listeners so drag never drops outside container
  useEffect(() => {
    const onWindowPointerMove = (e) => {
      if (activeDragRef.current.isDown) {
        handlePointerMove(e);
      }
    };
    const onWindowPointerUp = (e) => {
      if (activeDragRef.current.isDown) {
        handlePointerUp(e);
      }
    };
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    window.addEventListener("pointerup", onWindowPointerUp);
    window.addEventListener("pointercancel", onWindowPointerUp);
    return () => {
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("pointerup", onWindowPointerUp);
      window.removeEventListener("pointercancel", onWindowPointerUp);
    };
  }, []);

  const sheenShift = Math.sin(tiltAngle) * 110;

  return (
    <div
      ref={containerRef}
      className={`relative h-[88vh] min-h-[700px] max-h-[900px] w-[460px] sm:w-[500px] md:w-[540px] select-none touch-none overflow-visible ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* ── Background Canvas for Dynamic Seamless Lanyard Ribbon (Full Screen Coverage) ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute z-10"
        style={{
          left: -1400,
          top: -700,
          width: 3340,
          height: 2220,
        }}
      />

      {/* ── Large Blue-Box Sized ID Badge (Matter.js Driven) ── */}
      <div
        ref={cardElementRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute left-0 top-0 z-20 w-[480px] h-[610px] cursor-grab active:cursor-grabbing will-change-transform ${isDragging
          ? "cursor-grabbing drop-shadow-[0_45px_70px_rgba(0,0,0,0.8)]"
          : "drop-shadow-[0_28px_45px_rgba(0,0,0,0.6)]"
          }`}
        style={{
          transformOrigin: "center center",
          touchAction: "none",
        }}
      >
        <div className="relative h-full w-full">
          {/* ───────── Metal Clasp Hook (NO WHITE TAB) ───────── */}
          {/* Sliced precisely to ONLY show the silver metal D-ring & lobster clasp hook.
              Any white tab/card paper underneath is completely excluded. */}
          <div
            className="absolute -top-[48px] left-1/2 -translate-x-1/2 w-[120px] h-[58px] pointer-events-none overflow-hidden z-30"
          >
            <img
              src={lanyardImg}
              alt="Metal Clasp"
              className="w-full h-auto max-w-none select-none"
              style={{
                // Starts exactly at the D-ring (y: 50.2%) and cuts off before the white tab
                transform: "translateY(-50.2%)",
              }}
              draggable={false}
            />
          </div>

          {/* ───────── Card Body (DIRECTLY CONNECTED TO CLASP) ───────── */}
          {/* The placeholder image fills the card 1:1, connected directly to the metal clasp */}
          <div
            className="relative w-full h-full rounded-[22px] overflow-hidden bg-black shadow-2xl border border-white/20 flex items-center justify-center"
            style={{
              boxShadow:
                "0 25px 50px rgba(0,0,0,0.65), inset 0 2px 4px rgba(255,255,255,0.25), inset 0 -3px 6px rgba(0,0,0,0.8)",
            }}
          >
            {/* Metallic Eyelet / Grommet Hole where the clasp hooks into */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 h-3.5 w-6 rounded-full border border-gray-400 bg-gradient-to-b from-[#333] to-[#111] shadow-inner flex items-center justify-center">
              <div className="h-1.5 w-3 rounded-full bg-black/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]" />
            </div>

            {/* Graphic artwork: Sized 1:1 to nametag_fill.png */}
            <img
              src={optimizedFillSrc}
              alt="Nametag Design"
              className="h-full w-full object-cover select-none"
              draggable={false}
              loading="eager"
              decoding="async"
            />

            {/* Dynamic Holographic Specular Sheen (shifts as nametag swings) */}
            <div
              className="pointer-events-none absolute inset-0 opacity-35 mix-blend-overlay transition-transform duration-75"
              style={{
                background: `linear-gradient(${112 + tiltAngle * 25}deg, transparent 15%, rgba(255,255,255,0.85) 46%, rgba(217,30,30,0.45) 54%, transparent 85%)`,
                transform: `translateX(${sheenShift}px)`,
              }}
            />

            {/* Clear Glossy Acrylic Reflection Layer */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[22px] overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 45%, rgba(255,255,255,0.05) 65%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}