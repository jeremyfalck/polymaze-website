# Polymaze website

Website of the band Polymaze, built with [Create React App](https://github.com/facebook/create-react-app) (React, TypeScript, Tailwind, `HashRouter`).

## Local development

```bash
npm ci
npm start      # http://localhost:3000
npm test
npm run build  # production build in ./build
```

## Environments

| Environment | URL | Branch | Hosting |
|---|---|---|---|
| Production | https://polymaze.fr | `main` | OVH (free 100M web hosting, bundled with the domain) |
| Debug | https://jeremyfalck.github.io/polymaze-website | `debug` | GitHub Pages (`gh-pages` branch) |

## Branching and release flow

```
feat/* or fix/*  ->  develop  ->  debug  ->  main
```

- Day-to-day work happens on `develop`; feature and fix branches are merged into it.
- Merge `develop` into `debug` to publish the debug version and check it online.
- Merge `debug` into `main` **only when releasing to production**: every push to `main` deploys to https://polymaze.fr.

## Deployment

Both deployments are GitHub Actions workflows in `.github/workflows/`.

### Production: `ovh-deploy.yml` (push to `main`, or manual run)

1. `npm ci && npm run build` (with `CI=false` so existing lint warnings do not fail the build).
2. Uploads `build/` to the `www/` folder of the OVH hosting with `lftp` over **SFTP** (port 22). The free OVH plan does not support FTPS, and plain FTP is unencrypted.
   `mirror --delete` makes `www/` an exact copy of the build.

Required repository secrets (Settings -> Secrets and variables -> Actions):

| Secret | Value |
|---|---|
| `OVH_FTP_HOST` | `ftp.cluster129.hosting.ovh.net` |
| `OVH_FTP_USER` | FTP login of the hosting (OVH panel -> Web hosting -> FTP-SSH) |
| `OVH_FTP_PASSWORD` | password of that FTP user |

`public/.htaccess` is copied into the build and, on OVH's Apache, redirects HTTP to HTTPS and `www.polymaze.fr` to `polymaze.fr`.

### Debug: `gh-pages-debug.yml` (push to `debug`, or manual run)

Builds with `PUBLIC_URL=https://jeremyfalck.github.io/polymaze-website` (the site lives under a sub-path on GitHub Pages) and pushes `build/` to the `gh-pages` branch. GitHub Pages must be configured to serve that branch (Settings -> Pages).

The workflow can also be started manually from the Actions tab on any branch, which is handy to test a feature branch online.

### The `homepage` field

`package.json` sets `"homepage": "https://polymaze.fr"`, which is the base path of the production build. The debug workflow overrides it with `PUBLIC_URL`.

## OVH hosting and domain

- Domain `polymaze.fr` and the free hosting are managed in the OVH manager (Web Cloud -> Hebergements web).
- The domain must be attached to the hosting (Multisite tab, root folder `www`) with the free Let's Encrypt SSL certificate enabled (SSL tab).
- **The free hosting must stay renewed**: keep the renewal on automatic, otherwise OVH deletes it.
