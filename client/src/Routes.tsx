
import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ErrorPage from "./pages/system/ErrorPage";
import NotFoundPage from "./pages/system/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      





      <Route path="/error" element={<ErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}