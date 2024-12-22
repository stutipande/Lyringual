// src/components/Dashboard.jsx
import React from "react";
import { observer } from "mobx-react-lite";
import { getAuth } from "firebase/auth";
import { DashboardView } from "../views/dashboardView";
import { customToast } from "../utilities";

const Dashboard = observer(function DashboardRender(props) {
  const auth = getAuth();
  const user = auth.currentUser;
  const xp = props.model.XP;
  const newName = props.model.name;
  

  

  function handleLanguageClickACB(lang) {
      props.model.setPreferredLanguage(lang); 
  }



 function handleNameChangeACB(name){

  return props.model.setName(name);
 
}
 

  

  function logout() {
    auth.signOut()
      .then(() => {
        
        window.location.hash = "#/login";
        customToast("Logged out successfully.", "🔑");
      })
      .catch((error) => console.error("Logout Error:", error.message));
  }

  

  if (!user) {
    window.location.hash = "#/login";
  }

  return <DashboardView user={user} xp={xp} newName ={newName} onClick={handleNameChangeACB} onLangClick={handleLanguageClickACB} onLogout={logout} />;
});

export { Dashboard };
