import { LoginView } from "../views/loginView.jsx";
import { observer } from "mobx-react-lite";


const Login = observer(            


    function LoginRender(model){

        

        return <LoginView /* mayhaps the functions? */ usernameV="" passwordV=""/>;
        //usernameV is created here but should be a part of the model or should map to a variable in the model, that would be the identifier for each user (i have looked up how the google login api works but am too lazy to implement it right now, will do tommorow probably)
    }
);

export { Login };
