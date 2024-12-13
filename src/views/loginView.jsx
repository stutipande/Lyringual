

export function LoginView(props, props2/*temp all*/,usernameV, passwordV, loginACB,signUpACB)
{//test user username: aa pw: aaa otherwise it does not matter since we are using google api thing, usernameV might after login be handed back as an currentUserId that is different for each user
    function username(a){/*set model.etc... */ usernameV=a.target.value}
    function pw(a){/*set model.etc... */passwordV=a.target.value}
    function goToThing(){props.loginACB(usernameV,passwordV);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}
    function goToThing2(){props.signUpACB(usernameV,passwordV);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}

    return(
       
    
    <div className="onTopOfEachOther">

        <h1 className="logo">Lyringual.</h1>
        
        <label>mail:</label>
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
            <div><button onClick={goToThing}>submit</button><button onClick={goToThing2}>register</button></div>
    </div>

    );

}
