// src/components/Dashboard.jsx
import React from "react";
import { observer } from "mobx-react-lite";
import { getAuth } from "firebase/auth";
import { DashboardView } from "../views/dashboardView";

const Dashboard = observer(function DashboardRender() {
  const auth = getAuth();
  const user = auth.currentUser;

  function logout() {
    auth.signOut()
      .then(() => {
        window.location.hash = "#/login";
      })
      .catch((error) => console.error("Logout Error:", error.message));
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return <DashboardView user={user} onLogout={logout} />;
});

export { Dashboard };
