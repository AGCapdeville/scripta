import { FormEvent, useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { LogIn, UserPlus } from "lucide-react";

import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

type AuthMode = "signin" | "signup";
type Feedback = { kind: "success" | "error" | "info"; message: string } | null;

const AUTH: Record<AuthMode, { title: string; description: string; cta: string; icon: typeof LogIn }> = {
    signin: { title: "Sign in", description: "Enter your credentials to access your profile.", cta: "Sign in", icon: LogIn },
    signup: { title: "Sign up", description: "Sign up with email and password. Confirmation email may be required.", cta: "Create account", icon: UserPlus },
};

export const Portal = () => {
    const [mode, setMode] = useState<AuthMode>("signin"),
        [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState(""),
        [busy, setBusy] = useState(false),
        [feedback, setFeedback] = useState<Feedback>(null);

    const { session, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const { title, description, cta, icon: ActiveIcon } = AUTH[mode];


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const requested = params.get("mode");
        if (requested === "signin" || requested === "signup") {
            setMode(requested);
        }
    }, [location.search]);

    useEffect(() => {
        if (session) {
            navigate("/scripta/");
        }
    }, [session, navigate]);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (newSession) {
                setFeedback({ kind: "success", message: "You are now signed in." });
                navigate("/scripta/");
            }
        });

        return () => data?.subscription.unsubscribe();
    }, [navigate]);

    useEffect(() => {
        setFeedback(null);
    }, [mode]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmedPassword = confirmPassword.trim();
        const trimmedUsername = username.trim();

        if (!trimmedUsername && mode === 'signup') return setFeedback({ kind: "error", message: "Please provide a username." });
        if (!trimmedEmail) return setFeedback({ kind: "error", message: "Please provide an email address." });
        if (trimmedPassword != trimmedConfirmedPassword && mode === 'signup') return setFeedback({ kind: "error", message: "Passwords do not match." });
        if (trimmedPassword.length < 6) return setFeedback({ kind: "error", message: "Passwords must be at least 6 characters long." });

        setBusy(true);
        setFeedback({ kind: "info", message: "Loading..." });

        try {
            if (mode === "signin") {
                const { error } = await supabase.auth.signInWithPassword(
                    { email: trimmedEmail, password: trimmedPassword }
                );
                if (error) throw error;
            } else {
                const { data, error } = await supabase.auth.signUp({ 
                    email: trimmedEmail, 
                    password: trimmedPassword,
                    options: {
                        data: {
                            display_name: username
                        } 
                    }
                });
                if (data.user && data.user.identities?.length === 0) {
                    setFeedback({
                        kind: "info",
                        message: "That email already has an account. Check your inbox or try logging in instead."
                    });
                    return;
                }

                if (error) {
                    if (error.status === 400 && /already registered/i.test(error.message)) {
                        setFeedback({ kind: "error", message: "That email already has an account. Try logging in instead."});
                        return;
                    }
                    setFeedback({ kind: "error", message: error.message});
                    return;
                }

                setFeedback(
                    data.session ? 
                    { 
                        kind: "success", 
                        message: "Account created. You're signed in." 
                    } : { 
                        kind: "info", 
                        message: "Check your inbox to confirm your account before signing in." 
                    }
                );
            }
        } catch (error) {
            setFeedback({ kind: "error", message: error instanceof Error ? error.message : "Unexpected Supabase error." });
        } finally {
            setBusy(false);
        }
    };

    const disabled = busy || loading;
    const inputClass = "mt-2 w-full rounded-xl border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
    const displayName =
        session?.user?.user_metadata?.display_name ??
        session?.user?.email; // fallback
    return (
        <div className="min-h-screen w-full bg-background text-foreground">
            <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-4 py-10">
                <div className="w-full rounded-3xl border border-border/50 bg-background/70 backdrop-blur-sm p-8 text-left">
                    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <hgroup>
                            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2"><ActiveIcon className="h-5 w-5" />{title}</h2>
                            <p className="mt-1 text-sm text-foreground/70">{description}</p>
                        </hgroup>
                        {session && (
                            <div className="rounded-xl border border-border/60 bg-background/50 px-3 py-2 text-xs text-foreground/80">Signed in as <span className="font-medium">{displayName}</span></div>
                        )}
                    </header>

                    <div className="mt-6 flex flex-row flex-wrap gap-2 rounded-2xl bg-background/60 p-1">
                        {(Object.entries(AUTH) as [AuthMode, (typeof AUTH)[AuthMode]][]).map(([value, state]) => (
                            <button
                                key={value}
                                type="button"
                                className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${mode === value ? "bg-primary text-background shadow-sm" : "text-foreground/70 hover:text-foreground"}`}
                                onClick={() => setMode(value)}
                                disabled={busy}
                            >
                                {state.title}
                            </button>
                        ))}
                    </div>

                    {feedback && (
                        <div
                            className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                                feedback.kind === "success"
                                    ? "border-emerald-500/40 bg-emerald-500/10 text-foreground"
                                    : feedback.kind === "error"
                                        ? "border-rose-500/40 bg-rose-500/10 text-foreground"
                                        : "border-border/60 bg-background/60 text-foreground/80"
                            }`}
                        >
                            {feedback.message}
                        </div>
                    )}

                    <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-foreground/80" htmlFor="portal-username">
                                    Username
                                </label>
                                <input id="portal-username" className={inputClass} placeholder="Skelator1990" value={username} name="username" autoComplete="username" onChange={(event) => setUsername(event.target.value)} disabled={disabled} />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-foreground/80" htmlFor="portal-email">
                                Email
                            </label>
                            <input id="portal-email" className={inputClass} placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" disabled={disabled} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground/80" htmlFor="portal-password">
                                Password
                            </label>
                            <input id="portal-password" className={inputClass} placeholder="at least 6 characters" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} disabled={disabled} />
                        </div>

                        {mode === "signup" && (
                            <div>
                                <label className="block text-sm font-medium text-foreground/80" htmlFor="portal-confirmPassword">
                                    Confirm Password
                                </label>
                                <input id="portal-confirmPassword" className={inputClass} placeholder="confirm password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" disabled={disabled} />
                            </div>
                        )}
                    </form>
                </div>

                <div className="mt-auto w-full">
                    <Footer />
                </div>
            </div>
        </div>
    );
};
