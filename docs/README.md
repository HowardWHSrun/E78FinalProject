# Documentation (ENGR 78)

| File | Description |
|------|-------------|
| `report.tex` / `report.pdf` | Final project report (article) |
| `presentation.tex` / `presentation.pdf` | Beamer slides |
| `speaker_script.tex` / `speaker_script.pdf` | Full speaker script (~15 min), LaTeX + PDF |
| `script.md` | Same script content in Markdown |

Figures load from `plot_guide_screenshots/` (same folder as these `.tex` files).

## Build (always run after editing LaTeX)

From this directory:

```bash
make
```

Or:

```bash
./compile_pdfs.sh
```

- If `docs/.tectonic/tectonic` exists (local [Tectonic](https://tectonic-typesetting.org/) binary), that is used (single pass).
- Otherwise the Makefile falls back to `pdflatex` (two passes).

From the **repository root**:

```bash
make -C docs
```

To always rebuild both PDFs from scratch (ignore timestamps):

```bash
make -C docs rebuild
```

## Legacy one-liner (pdflatex only)

```bash
cd docs && pdflatex -interaction=nonstopmode report.tex && pdflatex -interaction=nonstopmode report.tex
```

Repeat for `presentation.tex` if needed.
