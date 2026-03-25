# E78 Final Project — EMC spectrum lab

Browser-based radiated emission spectrum viewer: load Keysight-style CSV sweeps, detect peaks, and match frequencies to service allocations (bands B0–B7). Includes a live synthetic demo and Material Design 3 UI ([Material Web](https://github.com/material-components/material-web)).

## Run locally

```bash
cd "Final Project"
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) (a local server is required for ES module / import maps).

## GitHub Pages (deploy)

This repo includes **GitHub Actions** (`.github/workflows/deploy-pages.yml`) to publish the static site on every push to `main`.

1. On GitHub open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. After the workflow finishes, the site is at:

**https://howardwhsrun.github.io/E78FinalProject/**

(First run may take a minute; check the **Actions** tab for status.)
