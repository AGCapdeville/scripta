import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { AnimatePresence } from "framer-motion";

// Components
import { Navbar } from './components/Navbar';
import { Page } from './components/Framer';

// Pages
import { Home } from './pages/Home';
import { DailyGame } from './pages/DailyGame';
import { About } from './pages/About';
import { Record } from './pages/Record';
import { Settings } from './pages/Settings';


export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait"> {/* ensures exit finishes before enter */}
        <Routes location={location} key={location.pathname}>
          <Route path="/scripta/"       element={<Page><Home /> </Page>} />
          <Route path="/scripta/about"  element={<Page><About /> </Page>} />
          <Route path="/scripta/settings" element={<Page><Settings /> </Page>} />
          <Route path="/scripta/daily"  element={<Page><DailyGame /> </Page>} />
          <Route path="/scripta/record" element={<Page><Record /> </Page>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
