# Build presentation.pdf and report.pdf from this directory.
# Uses ./.tectonic/tectonic if present; otherwise pdflatex (two passes).

TECTONIC := ./.tectonic/tectonic
SNIPS    := $(wildcard plot_guide_screenshots/*.png)

.PHONY: all presentation report script qa clean rebuild

all: presentation.pdf report.pdf speaker_script.pdf presentation_qa.pdf

# Force full rebuild (ignores PDF timestamps)
rebuild: clean
	rm -f presentation.pdf report.pdf speaker_script.pdf presentation_qa.pdf
	@$(MAKE) all

presentation.pdf: presentation.tex $(SNIPS)
	@if [ -x "$(TECTONIC)" ]; then "$(TECTONIC)" presentation.tex; \
	elif command -v pdflatex >/dev/null 2>&1; then \
	  pdflatex -interaction=nonstopmode presentation.tex; \
	  pdflatex -interaction=nonstopmode presentation.tex; \
	else echo "No compiler: place Tectonic at $(TECTONIC) or install pdflatex." >&2; exit 1; fi

report.pdf: report.tex $(SNIPS)
	@if [ -x "$(TECTONIC)" ]; then "$(TECTONIC)" report.tex; \
	elif command -v pdflatex >/dev/null 2>&1; then \
	  pdflatex -interaction=nonstopmode report.tex; \
	  pdflatex -interaction=nonstopmode report.tex; \
	else echo "No compiler: place Tectonic at $(TECTONIC) or install pdflatex." >&2; exit 1; fi

speaker_script.pdf: speaker_script.tex
	@if [ -x "$(TECTONIC)" ]; then "$(TECTONIC)" speaker_script.tex; \
	elif command -v pdflatex >/dev/null 2>&1; then \
	  pdflatex -interaction=nonstopmode speaker_script.tex; \
	  pdflatex -interaction=nonstopmode speaker_script.tex; \
	else echo "No compiler: place Tectonic at $(TECTONIC) or install pdflatex." >&2; exit 1; fi

presentation_qa.pdf: presentation_qa.tex
	@if [ -x "$(TECTONIC)" ]; then "$(TECTONIC)" presentation_qa.tex; \
	elif command -v pdflatex >/dev/null 2>&1; then \
	  pdflatex -interaction=nonstopmode presentation_qa.tex; \
	  pdflatex -interaction=nonstopmode presentation_qa.tex; \
	else echo "No compiler: place Tectonic at $(TECTONIC) or install pdflatex." >&2; exit 1; fi

presentation: presentation.pdf
report: report.pdf
script: speaker_script.pdf
qa: presentation_qa.pdf

clean:
	rm -f *.aux *.log *.nav *.out *.snm *.toc *.synctex.gz
