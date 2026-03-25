/**
 * Google Material Web (Material Design 3) — buildless CDN setup.
 * @see https://github.com/material-components/material-web
 */
import "@material/web/all.js";
import { styles as typescaleStyles } from "@material/web/typography/md-typescale-styles.js";

document.adoptedStyleSheets = [...document.adoptedStyleSheets, typescaleStyles.styleSheet];
