"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; 
import { useUserMenuAction } from "@/components/_actions/handleUserMenuAction";

export function ReturnHomeAndClearCookieButton() {
  const { handleUserMenuAction } = useUserMenuAction();

  return (
    <Button
      type="button"
      onClick={() => handleUserMenuAction("logout")}
      className="px-4 py-2 border rounded-lg transition-colors cursor-pointer"
    >
      Return Home
    </Button>
  );
}