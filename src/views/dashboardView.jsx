import React, {useState} from "react";
import { getFlagFromLanguageCode, nextLevelXP, currentLevel, currentLevelXP, xpForLevel } from "../utilities"

export function DashboardView(props) {


  console.log(props);
  const [newName,setNewName] = useState(props.newName);


      function handleLangClickACB(lang) {
        window.location.hash = '#/search';
        return props.onLangClick(lang); 
    };

    function handleNameChangeACB(){
      window.location.hash = '#/dashboard';
      return props.onClick(newName);
      setNewName('');
     
   }
   
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

      
        </div>

        <div class="selections">
      
        <button className="find-song" onClick={goToSearch}> <h3>Select a song & new language to learn!</h3> </button> &nbsp;
       
      </div>

    <div className="progressionBox">
      {xp_array.length ? xp_array.map(printProgressionCB) : <div> <h3>Start your journey by finding a song to translate!</h3></div>}
      </div>

    
  <div>

  <button onClick={props.onLogout}>Logout</button>
  
  </div>
  </div>

  );
}
