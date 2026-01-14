## Purpose
Provide concise, repo-specific guidance for AI coding agents working in this workspace.

## Big picture
- **Repository type:** A collection of static web exercises/demos (HTML, CSS, JS) grouped by folders. Entry index is [index.html](index.html).
- **Major components:** standalone demos under folders like [Three .js/three.js](Three%20.js/three.js), [Canvas/canvas.js](Canvas/canvas.js), [SpaceInvaders/spaceinvaders.js](SpaceInvaders/spaceinvaders.js), [Ruleta/ruleta.js](Ruleta/ruleta.js), and many others. Each demo usually includes an HTML, a CSS and a JS file with matching base names.
- **Why structure looks this way:** These are learning/exercise files, intentionally isolated. Expect minimal or no shared build system, tests, or package manifests.

## Runtime & workflow notes
- Many pages can be opened directly with the browser (file://) for basic demos, but ES module imports (see `Three .js/three.js`) require serving via a local static server or bundler.
- Recommended quick dev servers:

```bash
# from repo root
python3 -m http.server 8000
# or
npx serve .
```

- If you need to work with `three` as an npm package (used in `Three .js/three.js`), initialize npm and install `three`:

```bash
npm init -y
npm install three
```

## Project-specific patterns & gotchas
- Filenames and directories often contain spaces and special characters (e.g. `AEA02_1 Portafolio HTML`, `Three .js`, `Repaso/Snatch (cerdos y diamantes)`). Use URL-encoding or quotes when running shell commands.
- Demos are self-contained: prefer editing the HTML/JS pair within the same folder. Example: open [Three .js/three.js](Three%20.js/three.js) alongside the HTML that references it.
- `Three .js/three.js` uses ES module imports:

```js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
```

This implies either an npm setup + bundler or switching to CDN module imports for browser testing.

## What to change and how to run edits safely
- When updating a demo, keep changes localized to that demo's files. Avoid introducing cross-demo shared modules unless adding a deliberate shared utility.
- For quick verification, run a static server (see above) and open the demo's HTML. If ES module errors appear, either install `three` via npm or convert imports to CDN module paths.

## Examples from the repo
- [index.html](index.html) — top-level navigation linking demos.
- [Three .js/three.js](Three%20.js/three.js) — ES module-based Three.js demo; useful example for migration to bundler or CDN.
- [Canvas/canvas.js](Canvas/canvas.js) and [Ejercicios .js/js1.js](Ejercicios%20.js/js1.js) — simple, non-module scripts that run directly in the browser.

## Non-goals / What you won't find here
- No CI, test suites, or package.json by default. Don't assume an existing build pipeline.

## If you need to modernize this repo
- Add a `package.json` and a small dev server (e.g., `vite`, `webpack`, or `esbuild`) when converting multiple demos to a consolidated app.
- For a minimal approach: prefer `npm install three` and serve files via `python -m http.server` or `npx serve`.

## Where to look first when asked to modify behavior
- Start in the folder for the target demo (HTML + CSS + JS). Example: for 3D changes open [Three .js/three.js](Three%20.js/three.js) and the HTML that loads it.
- Search for code patterns like `document.body.appendChild(renderer.domElement)` or `requestAnimationFrame(animate)` to identify render loops and DOM attachment points.

---
If any section is unclear or you want this file to include more examples (e.g., exact HTML files that load `three.js`), tell me which demos to prioritize and I'll iterate.
