import { LoginView } from "../views/loginView.jsx";
import { observer } from "mobx-react-lite";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../firebaseModel.js"
import {customToast, getFirebaseErrorMessage} from "../utilities.js"


const Login = observer(            

    

    function LoginRender(model){
        function logIn(){ window.location.hash="#/dashboard"};
        function nor(error){customToast(getFirebaseErrorMessage(error), "🔑")};
        function loginACB(e,p){signInWithEmailAndPassword(auth, e,p).then(logIn).catch(nor);};//might move to firebasemodel and same for following function
        function signUpACB(e,p){createUserWithEmailAndPassword(auth,e,p).then(logIn).catch(nor)};
        function missingDetailsACB() {customToast("Please provide a valid email and password.", "🔑")}
        
        

        return <LoginView /* mayhaps the functions? */ usernameV="" passwordV="" missingDetails={missingDetailsACB}  loginACB={loginACB} signUpACB={signUpACB}/>;
        //usernameV is created here but should be a part of the model or should map to a variable in the model, that would be the identifier for each user (i have looked up how the google login api works but am too lazy to implement it right now, will do tommorow probably)
    }
);

export { Login };
    