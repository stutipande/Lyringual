import React from "react";
import { getFlagFromLanguageCode, nextLevelXP, currentLevel, currentLevelXP, xpForLevel } from "../utilities"

export function DashboardView(props) {

  console.log(props);

      function handleLangClickACB(lang) {
        window.location.hash = '#/search';
        return props.onLangClick(lang); 
    };

    function goToSearch(){
        window.location.hash = "#/search";
    }

    const xp_array = Object.entries(props.xp).map(([lang, xpValue]) => ({
      xp: xpValue,
      lang
    }));

    function printProgressionCB(item) {

      const next_level_xp = nextLevelXP(item.xp);
      const current_level_xp = currentLevelXP(item.xp);
      const current_level = currentLevel(item.xp);

      return <div 
      className="card progression"
      key={item.lang} 
      onClick={() => handleLangClickACB(item.lang)} 
  >
    <span className="flag">{getFlagFromLanguageCode(item.lang)}</span>
      <p>Level {current_level}</p> 
      <progress value={(item.xp - current_level_xp) / (next_level_xp - current_level_xp)} />
      <p>{(item.xp - current_level_xp)} / {(next_level_xp - current_level_xp)}</p>
      </div>;
    }

  return (
    <div className="dashboard">


      <div class="card">
        <h1>Welcome, {props.user.email}</h1>

        <p> Learn new languages by translating your favourite songs!</p>
      

      
        <button onClick={goToSearch}> Find a song! </button> &nbsp;
        <button onClick={props.onLogout}>Logout</button>
      </div>


    <div className="progressionBox">
      {xp_array.length ? xp_array.map(printProgressionCB) : <div>Start your journey by finding a song to translate!</div>}
      </div>
    </div>
  );
}
