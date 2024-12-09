import { LoginView } from "../views/loginView.jsx";
import { observer } from "mobx-react-lite";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import {app} from "../firebaseModel.js"

const auth = getAuth(app);//might move to firebasemodel instead

const Login = observer(            

    

    function LoginRender(model){
        function loggaIn(){/*här är användare inloggad*/window.location.hash="#/search"};
        function nor(error){alert(error.message)};
        function loginACB(e,p){signInWithEmailAndPassword(auth, e,p).then(loggaIn).catch(nor);};//might move to firebasemodel and same for following function
        function signUpACB(e,p){createUserWithEmailAndPassword(auth,e,p).then(loggaIn).catch(nor);};
        

        return <LoginView /* mayhaps the functions? */ usernameV="" passwordV="" loginACB={loginACB} signUpACB={signUpACB}/>;
        //usernameV is created here but should be a part of the model or should map to a variable in the model, that would be the identifier for each user (i have looked up how the google login api works but am too lazy to implement it right now, will do tommorow probably)
    }
);

export { Login };
