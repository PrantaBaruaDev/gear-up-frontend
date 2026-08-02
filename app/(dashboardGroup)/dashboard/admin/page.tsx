import React from "react";
import GetAllUsersPage from "./users/page";

export default async function AdminUsersPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <GetAllUsersPage />
    </div>
  );
}