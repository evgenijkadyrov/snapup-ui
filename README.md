# @yauheni_front/snapup-ui

Vue 3 + TypeScript component library (`Button`, `Input`, `Card`) bundled with Rollup.

## Local development

```bash
npm install
npm run dev          # rollup -c -w (watch mode)
npm test             # vitest
npm run storybook     # storybook dev -p 6006
npm run build          # vue-tsc (types) + rollup -c -> dist/
```

## Build output

`npm run build` produces:

- `dist/snapup-ui.esm.js`, `dist/snapup-ui.cjs.js` — ESM/CJS bundles, `vue` externalized as a peer dependency (not bundled)
- `dist/index.d.ts` — single bundled declaration file (via `rollup-plugin-dts`)
- `dist/style.css` — extracted component styles (import separately: `@yauheni_front/snapup-ui/dist/style.css`)

Check bundle composition: `npm run build:analyze` (writes `dist/stats.html`).

Check exactly what will be published: `npm pack --dry-run`.

## Publishing to npm

`0.1.0` is published: [npmjs.com/package/@yauheni_front/snapup-ui](https://www.npmjs.com/package/@yauheni_front/snapup-ui). To cut a new version:

1. Bump `version` in `package.json` (the `publish` CI job only publishes when the version changed)
2. `npm run build && npm pack --dry-run` — sanity check the tarball contents
3. `npm publish` (`publishConfig.access: public` in `package.json` already covers the scoped-package case, so no `--access public` flag is needed)
4. Verify: `npm view @yauheni_front/snapup-ui`

Publishing requires a Granular Access Token with "bypass two-factor authentication" enabled, or a one-time code: `npm publish --otp=123456`.

### Test the published package

```bash
mkdir /tmp/snapup-ui-smoke-test && cd /tmp/snapup-ui-smoke-test
npm init -y
npm install @yauheni_front/snapup-ui vue
# import { Button } from "@yauheni_front/snapup-ui" in a .vue/.ts file and confirm
# types resolve in your editor and dist/style.css applies the expected styles.
```

## CI/CD (GitHub Actions)

Two workflows are already committed:

- **`.github/workflows/ci.yml`** — `lint` → `test` → `publish` (publish only runs on push to `main`, and only if `package.json`'s version differs from the currently published version).
- **`.github/workflows/storybook-pages.yml`** — builds Storybook and deploys it to GitHub Pages on push to `main`.

### One-time manual setup required

1. Create the GitHub repository and push this project to it.
2. **NPM token**: generate a Granular Access Token with "bypass two-factor authentication" enabled (read/write on the `@yauheni_front` scope) and add it as a repository secret: Settings → Secrets and variables → Actions → New repository secret → name `NPM_TOKEN`.
3. **GitHub Pages**: Settings → Pages → Build and deployment → Source → "GitHub Actions". No further config needed; `storybook-pages.yml` handles the rest.
4. Push to `main` (or merge a PR into it) to trigger both workflows.

## Design tokens

Colors, fonts and spacing live in `src/styles/_tokens.scss`, adapted from the palette used in `snapup-ecommerce` so components look consistent with that project without depending on it directly.
