import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import { AnimatePresence, motion } from "framer-motion";

// Components
import { Navbar } from './components/Navbar';
import { Page } from './components/Framer';

// Pages
import { Home, HomePage} from './pages/Home';
import { DailyGame } from './pages/game-modes/DailyGame';
import { PracticeGame } from './pages/game-modes/PracticeGame';
import { About } from './pages/About';
import { Record } from './pages/Record';
import { Settings } from './pages/Settings';
import { HowToPlay } from './pages/HowToPlay';
import { GameModes } from './pages/GameModes';
import { TimedGame } from './pages/game-modes/TimedGame';

import { TimerProvider } from './components/Timer';


export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-fade-in text-white"> {/* 1) black baseline */}
      <TimerProvider>
        <Navbar />
        <AnimatePresence mode="wait" initial={false}> {/* ensures exit finishes before enter */}
          <motion.div key={location.pathname}>
            <Routes location={location} key={location.pathname}>
              <Route path="/scripta/" element={<Page><HomePage /> </Page>} />
              <Route path="/scripta/about"  element={<Page><About /> </Page>} />
              <Route path="/scripta/settings" element={<Page><Settings /> </Page>} />
              <Route path="/scripta/daily"  element={<Page><DailyGame /> </Page>} />
              <Route path="/scripta/practice"   element={<Page><PracticeGame /> </Page>} />
              <Route path="/scripta/statisics" element={<Page><Record /> </Page>} />
              <Route path="/scripta/how-to-play" element={<Page><HowToPlay /></Page>} />
              <Route path="/scripta/modes" element={<Page><GameModes /></Page>} />
              <Route path="/scripta/time-attack" element={<Page><TimedGame /></Page>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </TimerProvider>

      {/* 3) GLOBAL OVERLAY keyed by route */}
      <AnimatePresence initial={false}>
        {/* Changing the key per route makes the old overlay EXIT to black,
            while the new overlay starts black then fades OUT. */}
        <motion.div
          key={`overlay-${location.pathname}`}
          className="relative min-h-screen inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}                 // new page mounts under black
          animate={{ opacity: 0 }}                 // reveal new page
          exit={{ opacity: 1 }}                    // cover old page to black
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
}
