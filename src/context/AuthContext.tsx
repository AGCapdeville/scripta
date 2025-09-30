import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthContextValue = {
    session: Session | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextValue>({ session: null, loading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        supabase.auth.getSession().then(({ data, error }) => {
            if (!isMounted) return;
            if (error) {
                console.error("Failed to fetch Supabase session", error);
            }
            setSession(data?.session ?? null);
            setLoading(false);
        });

        const { data } = supabase.auth.onAuthStateChange((_event, newSession) => {
            setSession(newSession);
            setLoading(false);
        });

        return () => {
            isMounted = false;
            data?.subscription.unsubscribe();
        };
    }, []);

    return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
