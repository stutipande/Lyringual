// src/components/Dashboard.jsx
import React from "react";
import { observer } from "mobx-react-lite";
import { getAuth } from "firebase/auth";
import { DashboardView } from "../views/dashboardView";

const Dashboard = observer(function DashboardRender(props) {
  const auth = getAuth();
  const user = auth.currentUser;

  const xp = props.model.XP;

  console.log('xp', xp);

  function logout() {
    auth.signOut()
      .then(() => {
        window.location.hash = "#/login";
      })
      .catch((error) => console.error("Logout Error:", error.message));
  }

  if (!user) {
    window.location.hash = "#/login";
  }

  return <DashboardView user={user} xp={xp} onLogout={logout} />;
});

export { Dashboard };
