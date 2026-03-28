import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabase } from "@/lib/supabase";

export type AuthResult = { error: string | null };

export function isAuthAvailable(): boolean {
  return hasSupabaseConfig && Boolean(supabase);
}

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  return { error: error?.message ?? null };
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthResult> {
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  return { error: error?.message ?? null };
}

export async function signOut(): Promise<AuthResult> {
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const { error } = await supabase.auth.signOut();
  return { error: error?.message ?? null };
}

export async function getSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(
  callback: (event: AuthChangeEvent, session: Session | null) => void,
): { unsubscribe: () => void } {
  if (!supabase) {
    return { unsubscribe: () => {} };
  }

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange(callback);

  return {
    unsubscribe: () => {
      subscription.unsubscribe();
    },
  };
}

export type { User, Session };
