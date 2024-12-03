import { Summary } from "./summaryPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { observer } from "mobx-react-lite";
import {  createHashRouter,  RouterProvider, useParams} from "react-router-dom";

function makeRouter(model){
    // model will be needed in a MVP application
    // as there we'll have different presenters instead of Dummy
    // not used here
    return createHashRouter([
    {
        path: "/",
        element: <Search model={model} />,
    },
    {
        path: "/search",
        element: <Search model={model} />,
    },
    {
        path: "/summary",
        element: <Summary model={model} />,
    },
    {
        path: "/details",
        element: <Details model={model} />,
    },


])
}

const ReactRoot = observer(   //  will be added in week 3
function ReactRoot(props){
    return (props.model.ready ?
            <div class="flexParent">
                <div class="sidebar"><Sidebar model={props.model}/></div>
                <div class="mainContent">
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
