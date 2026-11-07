import "@fontsource/anton/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/500.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/caveat/600.css";
import { continueRender, delayRender } from "remotion";

const handle = delayRender("Chargement des polices");
Promise.all([
  document.fonts.load("400 100px Anton"),
  document.fonts.load("600 40px Inter"),
  document.fonts.load("800 40px Inter"),
  document.fonts.load("500 40px Inter"),
  document.fonts.load("500 40px 'Playfair Display'"),
  document.fonts.load("italic 500 40px 'Playfair Display'"),
  document.fonts.load("700 40px 'Playfair Display'"),
  document.fonts.load("600 40px Caveat"),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
