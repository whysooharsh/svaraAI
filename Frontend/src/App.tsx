import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./pages";
import Playground from "./pages/playground";
import Insights from "./pages/insights";

function AppContent() {
  const location = useLocation();
  const hideNavbar = ["/playground", "/insights"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="min-h-screen bg-gradient-to-b from-[#efb1ae] via-[#FED5C7] to-[#FFE4C6] overflow-hidden">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/insights" element={<Insights />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
