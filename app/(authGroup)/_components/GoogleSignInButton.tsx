"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { loginWithGoogle } from "../_action/login-action";
import { Loader2 } from "lucide-react";

declare global {
    interface Window {
        google: any;
    }
}
const initialActionState = { status: "idle" as const };

export function GoogleSignInButton() {
    const buttonRef = useRef<HTMLDivElement>(null);
    const [scriptReady, setScriptReady] = useState(false);
    const [state, loginAction, isPending] = useActionState(
        loginWithGoogle,
        initialActionState,
    );

    // TODO: Get your Google Client ID from environment variables
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    useEffect(() => {
        if (!clientId) {
            console.error("Google Client ID is not configured.");
            toast.error("Google Sign-In is not configured on the server.");
            return;
        }

        if (!scriptReady || !buttonRef.current || !window.google) return;

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: { credential: string}) => {
                if (!response.credential) {
                    toast.error("Google did not return an ID token.");
                    return;
                }

                startTransition(() => loginAction(response.credential));
            },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            type: "standard",
            shape: "rectangular",
            theme: "outline",
            size: "large",
            width: "350",
        });

    }, [scriptReady, clientId, loginAction]);

    useEffect(() => {
        if (state.status === "success") {
        toast.success("Logged in! Session cookies have been set.");
        } else if (state.status === "error") {
            toast.error(state.message);
        }
    }, [state]);

    return (
        <>
            <Script 
                src="https://accounts.google.com/gsi/client" 
                strategy="afterInteractive" 
                onReady={() => setScriptReady(true)} 
            />
            <div ref={buttonRef} className="flex justify-center" />
        </>
    );
}
