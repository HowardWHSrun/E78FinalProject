# Documentation (ENGR 78)

LaTeX sources and pre-built PDFs for the final project live in this folder. Screenshots are under `plot_guide_screenshots/` (same directory as the `.tex` files; `\graphicspath` is set accordingly).

## Artifact index

| File | Description |
|------|-------------|
| `report.tex` / `report.pdf` | Written report (article) |
| `presentation.tex` / `presentation.pdf` | Beamer slide deck |
| `speaker_script.tex` / `speaker_script.pdf` | Full speaker script (~15 min talk) |
| `presentation_qa.tex` / `presentation_qa.pdf` | Anticipated Q&A with short model answers |
| `script.md` | Speaker script in Markdown (aligned with the deck) |
| `ADALM_Pluto_Dashboard_Plot_Guide.pdf` | Plot guide for the live Pluto dashboard |

## Build (run after editing LaTeX)

From **this directory** (`docs/`):

```bash
make
```

Targets:

| `make` … | Builds |
|----------|----------|
| *(default / `all`)* | `presentation.pdf`, `report.pdf`, `speaker_script.pdf`, `presentation_qa.pdf` |
| `qa` | `presentation_qa.pdf` only |
| `presentation` | Slides only |
| `report` | Report only |
| `script` | Speaker script only |

- If `./.tectonic/tectonic` exists, the Makefile uses [Tectonic](https://tectonic-typesetting.org/) (single pass).
- Otherwise it uses `pdflatex` twice per document.

From the **repository root**:

```bash
make -C docs
```

Force a clean rebuild of all PDFs:

```bash
make -C docs rebuild
```

`make clean` removes common LaTeX intermediates (`*.aux`, `*.log`, etc.) in `docs/`; it does not delete committed PDFs.

## Legacy one-liner (`pdflatex` only)

```bash
cd docs && pdflatex -interaction=nonstopmode report.tex && pdflatex -interaction=nonstopmode report.tex
```

Repeat for `presentation.tex`, `speaker_script.tex`, or `presentation_qa.tex` as needed.
