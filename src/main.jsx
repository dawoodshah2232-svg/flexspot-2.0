import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";

// Base path for GitHub Pages subpath deploy:
// https://dawoodshah2232-svg.github.io/flexspot-2.0/
const BASENAME = "/flexspot-2.0";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {/* Future routes added by later workers, e.g.:
              <Route path="products" element={<Products />} />
              <Route path="compare" element={<Compare />} />
          */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
