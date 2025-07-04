import { open } from "@tauri-apps/plugin-shell";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
    type ReactNode,
} from "react";
import { toast } from "sonner";
import { fetch } from "@tauri-apps/plugin-http";
import type { UserData } from "@/types";

const API_URL = import.meta.env.VITE_API_URL as string;

interface AuthContextProps {
    user: UserData | null;
    isLoading: boolean;
    signInWithDiscord: () => void;
    signOut: () => void;
    refetchUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const isMountedRef = useRef(true);

    const fetchUser = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
            if (!res.ok) throw new Error("Not OK");

            const data = await res.json();

            if (isMountedRef.current) {
                setUser({
                    id: data.id,
                    display_name: data.display_name,
                    avatar_url: data.avatar_url,
                    items: data.items,
                    maps: data.maps,
                    reports: data.reports,
                    role: data.role,
                    votes: data.votes,
                });
            }
        } catch (error) {
            if (isMountedRef.current) {
                setUser(null);
                console.error("Error fetching user:", error);
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
            }
        }
    };

    const refetchUser = async () => {
        await fetchUser();
    }

    useEffect(() => {
        isMountedRef.current = true;
        fetchUser();

        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const signInWithDiscord = async () => {
        await open(`${API_URL}/auth/discord/login`);
    };

    const signOut = async () => {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (isMountedRef.current) {
                setUser(null);
            }
            window.location.href = "/";
        } catch (error) {
            console.error("Error signing out:", error);
            toast.error(`Error signing out: ${error}`);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isLoading, signInWithDiscord, signOut, refetchUser }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
