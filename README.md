# E78 Final Project — EMC spectrum lab

Browser-based radiated emission spectrum viewer: load spectrum files, detect peaks, and match frequencies to service allocations (bands B0–B7). The app supports:

- Keysight / Agilent CSV exports with a `DATA` section
- Generic CSV or text files with frequency + amplitude columns
- JSON sweep files for uploads or polled live feeds
- Built-in synthetic live demo mode

The UI is built with Material Design 3 components from [Material Web](https://github.com/material-components/material-web).

## Run locally

```bash
cd /path/to/E78FinalProject
python3 -m http.server 8080
```

Open [http://127.0.0.1:8080/](http://127.0.0.1:8080/) (a local server is required for ES module / import maps).

## File analysis

You can load data by:

- clicking **Load sample trace**
- dragging a `.csv`, `.json`, or `.txt` file onto the drop zone
- clicking the drop zone to choose a file manually

Supported file formats include:

### 1. Keysight CSV

The original app format is still supported:

```csv
X Axis Units,Hz
Y Axis Units,dBuV/m
Start Frequency,10000
Stop Frequency,160000
DATA
10000,72.1
10250,72.4
```

### 2. Generic CSV / text

Headers are optional as long as the first numeric column is frequency and later columns are traces or amplitudes:

```csv
frequency_hz,amplitude_dbuvm
10000,72.1
10250,72.4
```

Multiple traces are also supported:

```csv
freq_hz,trace1,trace2
10000,72.1,70.4
10250,72.4,70.2
```

### 3. JSON sweep files

Example point-object format:

```json
{
  "meta": {
    "displayXUnit": "MHz",
    "yUnit": "dBuV/m"
  },
  "points": [
    { "frequency": 87.9, "amplitude": 48.2, "frequencyUnit": "MHz" },
    { "frequency": 88.1, "amplitude": 52.6, "frequencyUnit": "MHz" }
  ]
}
```

Example array-based format:

```json
{
  "frequencyUnit": "MHz",
  "frequencies": [87.9, 88.1, 88.3],
  "amplitudes": [48.2, 52.6, 49.8]
}
```

## Live data mode

Switch to **Live** mode and:

- leave **Live data URL** empty to run the built-in synthetic stream, or
- provide a URL to a JSON or CSV sweep file that the app can poll repeatedly

The bundled example live feed is:

```text
./sample-data/live-spectrum.json
```

Use that value in the **Live data URL** field while running the local server to test remote polling without extra setup.

### Example live JSON format

```json
{
  "meta": {
    "displayXUnit": "MHz",
    "yUnit": "dBuV/m",
    "Swept SA": "Demo polled live feed"
  },
  "frequencies": [87.5, 87.8, 88.1],
  "amplitudes": [42.1, 47.3, 55.8]
}
```

The app fetches the URL on a timer, parses the returned sweep, updates the chart, and re-runs peak detection and service identification for each refresh.

## GitHub Pages

The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) deploys the site on every push to `main`. You can also run it manually: **Actions → Deploy GitHub Pages → Run workflow**.

### One-time setup (if the site is not live yet)

1. Open **[Settings → Pages](https://github.com/HowardWHSrun/E78FinalProject/settings/pages)** and set **Source** to **GitHub Actions**.
2. **If deployments fail:** open **[Settings → Actions → General](https://github.com/HowardWHSrun/E78FinalProject/settings/actions)** → **Workflow permissions** → select **Read and write permissions**, then **Save**. This allows `GITHUB_TOKEN` to publish Pages (required even though the workflow lists `pages: write`).
3. If **Environments → github-pages** has **required reviewers**, approve the pending deployment or remove that rule.
4. Open **[Actions](https://github.com/HowardWHSrun/E78FinalProject/actions)** and confirm **Deploy GitHub Pages** is green (re-run failed workflows after step 2).

### Live site

**[https://howardwhsrun.github.io/E78FinalProject/](https://howardwhsrun.github.io/E78FinalProject/)**
