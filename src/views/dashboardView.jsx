import React from "react";

export function DashboardView({ user, onLogout }) {

    function goToSearch(){
        window.location.hash = "#/search";
    }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.email}</h1>
      <p>Email: {user.email}</p>
    

    
    <button onClick={goToSearch}> Find a song! </button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
