// timer-context.tsx
import React, { createContext, useContext, useRef, useState, useCallback, useEffect } from "react";

type TimerCtx = {
  remaining: number;          // seconds left
  running: boolean;           // actively ticking?
  paused: boolean;            // explicitly paused?
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  onExpire?: () => void;
};

const Ctx = createContext<TimerCtx | null>(null);
export const useTimer = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTimer must be used inside <TimerProvider>");
  return ctx;
};

export const TimerProvider: React.FC<React.PropsWithChildren<{ onExpire?: () => void }>> = ({
  children,
  onExpire,
}) => {
  const [remaining, setRemaining] = useState(0);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const clear = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const tick = useCallback(() => {
    setRemaining(prev => {
      if (prev <= 1) {
        clear();
        setRunning(false);
        setPaused(false);
        onExpire?.();
        return 0;
      }
      return prev - 1;
    });
  }, [onExpire]);

  const start = useCallback(
    (seconds: number) => {
      clear();
      setRemaining(seconds);
      setRunning(true);
      setPaused(false);
      intervalRef.current = window.setInterval(tick, 1000);
    },
    [tick]
  );

  const pause = useCallback(() => {
    if (!running) return;
    clear();
    setRunning(false);
    setPaused(true);
  }, [running]);

  const resume = useCallback(() => {
    if (remaining > 0 && !running) {
      setRunning(true);
      setPaused(false);
      intervalRef.current = window.setInterval(tick, 1000);
    }
  }, [remaining, running, tick]);

  const reset = useCallback(() => {
    clear();
    setRemaining(0);
    setRunning(false);
    setPaused(false);
  }, []);

  useEffect(() => {
    return () => clear(); // cleanup on unmount
  }, []);

  return (
    <Ctx.Provider
      value={{
        remaining,
        running,
        paused,
        start,
        pause,
        resume,
        reset,
        onExpire,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};
