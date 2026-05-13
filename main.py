#!/usr/bin/env python3
"""Launch the ENGR 078 class-content dashboard."""

from web_app import app


def main():
    app.run(debug=False, host="127.0.0.1", port=8050)


if __name__ == "__main__":
    main()
