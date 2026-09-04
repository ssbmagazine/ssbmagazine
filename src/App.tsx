import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./components/SiteLayout";
import { I18nProvider } from "./i18n/context";
import { AboutPage } from "./pages/AboutPage";
import { ArchivePage } from "./pages/ArchivePage";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { SubscribePage } from "./pages/SubscribePage";
import { ThemeProvider } from "./theme/context";

const ReaderPage = lazy(() =>
  import("./pages/ReaderPage").then((module) => ({ default: module.ReaderPage })),
);

export function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "") || "/"}>
          <Suspense fallback={<p className="reader-status">…</p>}>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/subscribe" element={<SubscribePage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
              <Route path="/archive/:year/:slug" element={<ReaderPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </I18nProvider>
    </ThemeProvider>
  );
}
