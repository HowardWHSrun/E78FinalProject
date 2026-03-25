# E78 Final Project — EMC spectrum lab

Browser-based radiated emission spectrum viewer: load Keysight-style CSV sweeps, detect peaks, and match frequencies to service allocations (bands B0–B7). Includes a live synthetic demo and Material Design 3 UI ([Material Web](https://github.com/material-components/material-web)).

## Run locally

```bash
cd "Final Project"
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) (a local server is required for ES module / import maps).

## GitHub Pages

After this repo is on GitHub, enable Pages: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` → Folder: `/ (root)`**.

The site will be available at:

**https://howardwhsrun.github.io/E78FinalProject/**
