// ============================================================================
// src/App.jsx
// Enrutador principal.
// ============================================================================
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

const HomePage = lazy(() => import("./pages/HomePage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const DevicePage = lazy(() => import("./pages/DevicePage"));
const ComparisonPage = lazy(() => import("./pages/ComparisonPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const SuggestPage = lazy(() => import("./pages/SuggestPage"));
function PageFallback() {
  return <div style={{ minHeight: "100vh", backgroundColor: "#EDEFF3" }} aria-hidden="true" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:slugType" element={<CategoryPage />} />
          <Route path="/:slugType/:slug" element={<DevicePage />} />
          <Route path="/comparar/:pair" element={<ComparisonPage />} />
     <Route path="/sugerir" element={<SuggestPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
