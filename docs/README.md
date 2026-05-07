# Documentation (ENGR 78)

| File | Description |
|------|-------------|
| `report.tex` / `report.pdf` | Final project report (article) |
| `presentation.tex` / `presentation.pdf` | Beamer slides |
| `script.md` | Speaker notes for the presentation |

Figures are loaded from `../figures/` (project root). Build from this directory:

```bash
pdflatex -interaction=nonstopmode report.tex
pdflatex -interaction=nonstopmode report.tex
```

Repeat for `presentation.tex` if you edit the slides.
