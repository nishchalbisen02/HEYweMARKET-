"use client";

import { useEffect, useRef } from "react";

/**
 * "Soffit" — an animated WebGL2 gradient. Plain WebGL2: one fullscreen triangle,
 * one GLSL ES 3.00 fragment shader, no libraries. Every transform happens in the
 * shader; per frame the CPU only lerps the pointer, uploads two uniforms and
 * issues one drawArrays. DPR is capped at 1. Renders a single still frame under
 * prefers-reduced-motion.
 */

const CONFIG = {
  bgColor: "#2a2436",
  colorA: "#4e4468",
  colorB: "#8f7fc0",
  colorC: "#cfc4e8",
  colorD: "#f5eeff",
  scale: 0.2,
  speed: 0.33,
  tilt: -1.3,
  rock: 0.11,
  horizon: -0.52,
  breathe: 0.09,
  spread: 1.3,
  curve: 2.6,
  direct: 0.72,
  bounce: 0.06,
  bounceCurve: 1.7,
  spillCentre: 0.04,
  spillWidth: 0.2,
  spillFloor: 0.16,
  amount: 0.22,
  warp: 1.1,
  warpScale: 0.72,
  flow: 0.15,
  roughness: 0.52,
  lacunarity: 2.05,
  motes: 0.03,
  moteScale: 7,
  ambient: 0.04,
  contrast: 1.6,
  midpoint: 0.57,
  sink: 0.26,
  glow: 0.34,
  grain: 0.094,
  grainAnim: 0,
  dither: 1.2,
  vignette: 0.44,
  steer: 0.22,
  lift: 0.2,
  sweep: 0.3,
  cursor: 1,
  parallax: 0.002,
  maxDpr: 1,
};

const VERT = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2  iResolution;
uniform float iTime;
uniform vec2  iMouse;
uniform float uScale;

uniform vec3  uBg, uColorA, uColorB, uColorC, uColorD;
uniform float uSpeed, uTilt, uRock, uHorizon, uBreathe, uSpread, uCurve, uDirect;
uniform float uBounce, uBounceCurve;
uniform float uSpillCentre, uSpillWidth, uSpillFloor;
uniform float uAmount, uWarp, uWarpScale, uFlow, uRoughness, uLacunarity, uMotes, uMoteScale;
uniform float uAmbient, uContrast, uMidpoint, uSink, uGlow;
uniform float uGrain, uDither, uVignette;
uniform float uSteer, uLift, uSweep, uParallax;

#define OCTAVES 4

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float snoise(vec2 p) {
  const float K1 = 0.366025404, K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  float m = step(a.y, a.x);
  vec2 o = vec2(m, 1.0 - m);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash2(i)), dot(b, hash2(i + o)), dot(c, hash2(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0, amp = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += amp * snoise(p);
    p *= uLacunarity;
    amp *= uRoughness;
  }
  return v;
}

vec3 ramp4(float t) {
  vec3 c = mix(uColorA, uColorB, smoothstep(0.00, 0.36, t));
  c = mix(c, uColorC, smoothstep(0.32, 0.70, t));
  c = mix(c, uColorD, smoothstep(0.66, 1.00, t));
  return c;
}

float triDither(vec2 fc) {
  float a = fract(sin(dot(fc, vec2(12.9898, 78.233))) * 43758.5453);
  float b = fract(sin(dot(fc + 17.0, vec2(12.9898, 78.233))) * 43758.5453);
  return (a + b - 1.0) / 255.0;
}

uniform float uGrainAnim;
float houseGrain(vec2 fc) {
  uvec2 q = uvec2(fc) * uvec2(1597334677u, 3812015801u)
          + uint(floor(iTime * 24.0 * uGrainAnim)) * 2654435769u;
  uint n = q.x ^ q.y; n = n * 1664525u + 1013904223u; n ^= n >> 16u; n *= 2246822519u; n ^= n >> 13u;
  float a = float(n & 0xffffu) / 65535.0;
  n *= 3266489917u; n ^= n >> 16u;
  float b = float(n & 0xffffu) / 65535.0;
  return a + b - 1.0;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution) / iResolution.y;
  uv *= uScale;
  vec2 iM = iMouse * uScale;
  float t = iTime * uSpeed;

  vec2 p = uv - iM * uParallax;

  float tilt = uTilt + sin(t * 0.13) * uRock + iM.x * uSteer;
  vec2 dir = vec2(cos(tilt), sin(tilt));
  float axis = dot(p, dir);
  float across = dot(p, vec2(-dir.y, dir.x));

  vec2 q = vec2(fbm(p * uWarpScale + vec2(0.0, t * uFlow)),
                fbm(p * uWarpScale + vec2(5.2, 1.3) - t * uFlow * 0.7));
  float air = fbm(p + uWarp * q + vec2(t * 0.12, -t * 0.09)) * 0.5 + 0.5;

  float horizon = uHorizon + sin(t * 0.09 + 2.1) * uBreathe - iM.y * uLift;
  float alt = clamp(0.5 + (axis - horizon) * uSpread + (air - 0.5) * uAmount, 0.0, 1.0);

  float ac = (across - uSpillCentre - iM.x * uSweep) / max(0.05, uSpillWidth);
  float spill = mix(uSpillFloor, 1.0, exp(-ac * ac));

  float direct = pow(alt, max(0.05, uCurve)) * uDirect * spill;

  float bounce = uBounce * pow(1.0 - alt, max(0.05, uBounceCurve));

  float f = uAmbient + direct + bounce;
  f += uMotes * snoise(p * uMoteScale + vec2(-t * 0.5, t * 0.35)) * 0.5 * alt;

  f = clamp((f - uMidpoint) * uContrast + 0.5, 0.0, 1.0);

  vec3 col = ramp4(f);
  col += uColorD * uGlow * pow(f, 4.0);
  col = mix(uBg, col, smoothstep(0.0, max(0.01, uSink), f) * 0.90 + 0.10);

  col *= 1.0 - uVignette * dot(uv, uv);
  { float hgL = clamp(dot(col, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    col += houseGrain(gl_FragCoord.xy) * uGrain * mix(1.0, 4.0 * hgL * (1.0 - hgL), 0.6); }
  col += triDither(gl_FragCoord.xy) * uDither;

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function HeroField({ reduced = false }: { reduced?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "shader");
      return sh;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "link");
    gl.useProgram(program);
    gl.bindVertexArray(gl.createVertexArray());

    const LOC: Record<string, WebGLUniformLocation | null> = {};
    const loc = (n: string) => (n in LOC ? LOC[n] : (LOC[n] = gl.getUniformLocation(program, n)));
    const u1f = (n: string, v: number) => gl.uniform1f(loc(n), v);
    const u2f = (n: string, x: number, y: number) => gl.uniform2f(loc(n), x, y);
    const u3c = (n: string, hex: string) => {
      const c = hexToVec3(hex);
      gl.uniform3f(loc(n), c[0], c[1], c[2]);
    };

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
      const w = Math.max(1, Math.round(host.clientWidth * dpr));
      const h = Math.max(1, Math.round(host.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      u2f("iResolution", w, h);
    };

    const applyConfig = () => {
      u3c("uBg", CONFIG.bgColor);
      u3c("uColorA", CONFIG.colorA);
      u3c("uColorB", CONFIG.colorB);
      u3c("uColorC", CONFIG.colorC);
      u3c("uColorD", CONFIG.colorD);
      u1f("uScale", CONFIG.scale);
      u1f("uSpeed", CONFIG.speed);
      u1f("uTilt", CONFIG.tilt);
      u1f("uRock", CONFIG.rock);
      u1f("uHorizon", CONFIG.horizon);
      u1f("uBreathe", CONFIG.breathe);
      u1f("uSpread", CONFIG.spread);
      u1f("uCurve", CONFIG.curve);
      u1f("uDirect", CONFIG.direct);
      u1f("uBounce", CONFIG.bounce);
      u1f("uBounceCurve", CONFIG.bounceCurve);
      u1f("uSpillCentre", CONFIG.spillCentre);
      u1f("uSpillWidth", CONFIG.spillWidth);
      u1f("uSpillFloor", CONFIG.spillFloor);
      u1f("uAmount", CONFIG.amount);
      u1f("uWarp", CONFIG.warp);
      u1f("uWarpScale", CONFIG.warpScale);
      u1f("uFlow", CONFIG.flow);
      u1f("uRoughness", CONFIG.roughness);
      u1f("uLacunarity", CONFIG.lacunarity);
      u1f("uMotes", CONFIG.motes);
      u1f("uMoteScale", CONFIG.moteScale);
      u1f("uAmbient", CONFIG.ambient);
      u1f("uContrast", CONFIG.contrast);
      u1f("uMidpoint", CONFIG.midpoint);
      u1f("uSink", CONFIG.sink);
      u1f("uGlow", CONFIG.glow);
      u1f("uGrain", CONFIG.grain);
      u1f("uGrainAnim", CONFIG.grainAnim);
      u1f("uDither", CONFIG.dither);
      u1f("uVignette", CONFIG.vignette);
      u1f("uSteer", CONFIG.steer);
      u1f("uLift", CONFIG.lift);
      u1f("uSweep", CONFIG.sweep);
      u1f("uParallax", CONFIG.parallax);
      resize();
    };

    let resizeQueued = false;
    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        resize();
      });
    };
    window.addEventListener("resize", onResize, { passive: true });
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    const mouse = { x: 0, y: 0, ax: 0, ay: 0, tx: 0, ty: 0, rx: 0, ry: 0, seeded: false };
    const aim = (e: PointerEvent) => {
      const a = window.innerWidth / window.innerHeight;
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * a;
      mouse.ty = 0.5 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", aim, { passive: true });
    window.addEventListener("pointerdown", aim, { passive: true });

    let visible = true;
    const io = new IntersectionObserver((es) => (visible = es[0].isIntersecting), { threshold: 0 });
    io.observe(host);

    applyConfig();
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (reduced) {
      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", aim);
        window.removeEventListener("pointerdown", aim);
        ro.disconnect();
        io.disconnect();
      };
    }

    let raf = 0;
    let prevT = performance.now();
    let clock = 0;
    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const raw = now - prevT;
      prevT = now;
      if (!visible || document.hidden) return;
      const ms = raw > 50 ? 50 : raw < 4.167 ? 4.167 : raw;
      const s = ms > 36.7 ? 2.2 : ms * 0.06;
      clock += ms * 0.001;

      const kLead = 0.105 * s;
      const kBody = 0.043 * s;
      if (!mouse.seeded) {
        mouse.rx = mouse.tx;
        mouse.ry = mouse.ty;
        mouse.seeded = true;
      }
      if (!CONFIG.cursor) {
        mouse.tx = mouse.rx;
        mouse.ty = mouse.ry;
      }
      mouse.ax += (mouse.tx - mouse.ax) * kLead;
      mouse.ay += (mouse.ty - mouse.ay) * kLead;
      mouse.x += (mouse.ax - mouse.x) * kBody;
      mouse.y += (mouse.ay - mouse.y) * kBody;

      u1f("iTime", clock);
      u2f("iMouse", mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", aim);
      window.removeEventListener("pointerdown", aim);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 block size-full" />;
}
