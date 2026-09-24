import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BlogIndex from "./pages/BlogIndex.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import PostRedirect from "./pages/PostRedirect.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Disclaimers from "./pages/Disclaimers.jsx";
import Cookies from "./pages/Cookies.jsx";
import NotFound from "./pages/NotFound.jsx";
import { initAnalytics } from "./lib/analytics.js";

// Base path for GitHub Pages subpath deploy:
// https://dawoodshah2232-svg.github.io/flexspot-2.0/
const BASENAME = "/flexspot-2.0";

// GA4 (Consent Mode v2, deny-by-default). No-op without VITE_GA_MEASUREMENT_ID.
initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="compare/:pair" element={<ComparePage />} />
          <Route path="category/:id" element={<CategoryPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="blog" element={<BlogIndex />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="post/:slug" element={<PostRedirect />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="disclaimers" element={<Disclaimers />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
