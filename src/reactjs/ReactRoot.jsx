import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Login } from "./loginPresenter.jsx";
import { Dashboard } from "./dashboardPresenter.jsx";
import { observer } from "mobx-react-lite";
import { UserIcon } from "../userIcon.jsx";
import "/src/style.css"
import {  createHashRouter,  RouterProvider, useParams} from "react-router-dom";

function makeRouter(model){
    // model will be needed in a MVP application
    // as there we'll have different presenters instead of Dummy
    // not used here
    return createHashRouter([
    {
        path: "/",
        element: <Login model={model} />,
    },
    {
        path: "/search",
        element: <Search model={model} />,
    },
    {
        path: "/details",
        element: <Details model={model} />,
    },
    {
        path: "/login",
        element: <Login model={model} />,
    },

    {
        path: "/dashboard",
        element: <Dashboard model={model} />,
    },
])
}

const ReactRoot = observer(
function ReactRoot(props){
    return (props.model.ready ?
            <div className="flexParent">
                <header className="header"> <UserIcon /> </header>
                <div className="mainContent">
                    <RouterProvider router={makeRouter(props.model)} />
                </div>
            </div>
            :
            <div>
                <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />
            </div>
           );
}
)

export { ReactRoot }
