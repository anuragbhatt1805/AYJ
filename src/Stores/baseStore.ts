import { signal } from "@preact/signals-react";

export const homeTab = signal<"dashboard" | "swap" | "ai-bot" | "stake">("dashboard");