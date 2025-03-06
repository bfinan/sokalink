"use client";

import { useEffect } from "react";
import { useAuth } from "./auth-context"; // Import useAuth

export default function SendUserIdToExtension() {
  const { user } = useAuth();

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      console.log("Sending user ID to content script:", user.id);
      window.postMessage(
        { type: "SET_USER_ID", userId: user.id },
        "*"
      );
    }
  }, [user]);

  return null;
}
