

export function LoginView(props, props2/*temp all*/,usernameV, passwordV)
{//test user username: aa pw: aaa otherwise it does not matter since we are using google api thing, usernameV might after login be handed back as an currentUserId that is different for each user
    function username(a){/*set model.etc... */ usernameV=a.target.value}
    function pw(a){/*set model.etc... */passwordV=a.target.value}
    function goToThing(){/* go to correct place if password and such is correct etc... */if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}}
    
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
