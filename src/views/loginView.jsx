

export function LoginView(props, props2/*temp all*/,usernameV, passwordV, nameV, loginACB,signUpACB)
{//test user username: aa pw: aaa otherwise it does not matter since we are using google api thing, usernameV might after login be handed back as an currentUserId that is different for each user
    function username(a){/*set model.etc... */ usernameV=a.target.value}
    function pw(a){/*set model.etc... */passwordV=a.target.value}
    function name(a){/*set model.etc... */nameV=a.target.value}
    function goToThing()
    {props.loginACB(usernameV,passwordV);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}
    function goToThing2(){
        const userNameToSave = nameV || null;
        props.signUpACB(usernameV,passwordV, userNameToSave);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}

    return(
       
    
    <div className="onTopOfEachOther">
        
        <input 

            type="text"
            value={usernameV}
            placeholder="E-mail address"
            onChange={username}

           />
           <input 

            type="password"
            value={passwordV}
            placeholder="Password"
            onChange={pw}

            />

            <input

            type="text"
            value={nameV}
            placeholder="Optional: Set your name"  
            onChange={name}

            />

            <div><button style={{marginRight: 20}} onClick={goToThing}>Login</button><button onClick={goToThing2}>Register</button></div>
    </div>

    );

}
