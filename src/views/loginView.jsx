

export function LoginView(props)
{//test user username: aa pw: aaa otherwise it does not matter since we are using google api thing, usernameV might after login be handed back as an currentUserId that is different for each user
    //function username(a){/*set model.etc... */ props.usernameV=a.target.value; console.log(props)}
    //function pw(a){/*set model.etc... */props.passwordV=a.target.value}
    let passwordV;
    let usernameV;
    function doPW(a){console.log(props); passwordV=a.target.value}
    function doUsername(a){usernameV=a.target.value}
    function goToThing()
    {props.loginACB(usernameV,passwordV);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}
    function goToThing2(){
       // const userNameToSave = nameV || null;
        if (!usernameV || !passwordV) {
            props.missingDetails();
            return;
        }
        props.signUpACB(usernameV,passwordV);}//if(usernameV=="aa" && passwordV=="aaa"){window.location.hash="#/search"}
        

    return(
       
    
    <div className="onTopOfEachOther">
        
        <input 

            type="text"
            value={usernameV}
            placeholder="E-mail address"
            onChange={doUsername}

           />
           <input 

            type="password"
            value={passwordV}
            placeholder="Password"
            onChange={doPW}

            />


           
            <div><button style={{marginRight: 20}} onClick={goToThing}>Login</button><button onClick={goToThing2}>Register</button></div>
    </div>

    
    );

 

}
