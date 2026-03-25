# E78 Final Project — EMC spectrum lab

Browser-based radiated emission spectrum viewer: load Keysight-style CSV sweeps, detect peaks, and match frequencies to service allocations (bands B0–B7). Includes a live synthetic demo and Material Design 3 UI ([Material Web](https://github.com/material-components/material-web)).

## Run locally

```bash
cd "Final Project"
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) (a local server is required for ES module / import maps).

## GitHub Pages

The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) deploys the site on every push to `main`. You can also run it manually: **Actions → Deploy GitHub Pages → Run workflow**.

### One-time setup (if the site is not live yet)

1. Open **[Settings → Pages](https://github.com/HowardWHSrun/E78FinalProject/settings/pages)** and set **Source** to **GitHub Actions**.
2. **If deployments fail:** open **[Settings → Actions → General](https://github.com/HowardWHSrun/E78FinalProject/settings/actions)** → **Workflow permissions** → select **Read and write permissions**, then **Save**. This allows `GITHUB_TOKEN` to publish Pages (required even though the workflow lists `pages: write`).
3. If **Environments → github-pages** has **required reviewers**, approve the pending deployment or remove that rule.
4. Open **[Actions](https://github.com/HowardWHSrun/E78FinalProject/actions)** and confirm **Deploy GitHub Pages** is green (re-run failed workflows after step 2).

### Live site

**[https://howardwhsrun.github.io/E78FinalProject/](https://howardwhsrun.github.io/E78FinalProject/)**
