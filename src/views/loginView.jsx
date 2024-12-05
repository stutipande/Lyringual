

export function LoginView(props, props2/*temp */,usernameV, passwordV)
{
    function username(){/*set model.etc... */}
    function pw(){/*set model.etc... */}
    function goToThing(){/* go to correct place if password and such is correct etc... */window.location.hash="#/search"}
    
    return(
    
    <div className="onTopOfEachOther">
        {/* Textbox for search input */}
        <label>username:</label>
        <input 

            type="text"
            value={usernameV}
            placeholder="username"
            onChange={username}

           />
           <label>password:</label>
           <input 

            type="password"
            value={passwordV}
            placeholder="password"
            onChange={pw}

            />
            <button onClick={goToThing}>submit</button>
    </div>

    );

}
