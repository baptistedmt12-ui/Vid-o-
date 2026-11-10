import "@fontsource/anton/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/600.css";
import { continueRender, delayRender } from "remotion";

const handle = delayRender("Chargement des polices");
Promise.all([
  document.fonts.load("400 100px Anton"),
  document.fonts.load("600 40px Inter"),
  document.fonts.load("800 40px Inter"),
  document.fonts.load("italic 400 40px 'Playfair Display'"),
  document.fonts.load("600 40px 'Playfair Display'"),
])
  .then(() => continueRender(handle))
  .catch(() => continueRender(handle));
