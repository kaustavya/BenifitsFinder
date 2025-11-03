import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing in index.html");

// Reuse existing root if present (helps with HMR)
// @ts-ignore
const existingRoot = (container as any).__reactRoot;

try {
  // Prefer using createRoot once. Store reference to prevent duplicates in HMR.
  // @ts-ignore
  if (existingRoot && existingRoot.render) {
    // If a root already exists, use it to render the app
    // @ts-ignore
    existingRoot.render(<App />);
  } else {
    const root = createRoot(container);
    // store root on DOM node to avoid double createRoot in HMR
    // @ts-ignore
    container.__reactRoot = root;
    root.render(<App />);
  }
} catch (e) {
  // Fallback: direct render
  createRoot(container).render(<App />);
}
