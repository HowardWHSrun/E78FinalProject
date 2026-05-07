#!/usr/bin/env python3
"""
Real-Time Visualization of Digital Modulation and Channel Impairments
Using a Single PlutoSDR

ENGR 78 Final Project
"""

import sys
from pathlib import Path

_ROOT = Path(__file__).resolve().parent
_SRC = _ROOT / "src"
if str(_SRC) not in sys.path:
    sys.path.insert(0, str(_SRC))

from PyQt6.QtWidgets import QApplication
from gui import MainWindow


def main():
    app = QApplication(sys.argv)
    app.setStyle("Fusion")

    window = MainWindow()
    window.show()
    sys.exit(app.exec())


if __name__ == "__main__":
    main()
