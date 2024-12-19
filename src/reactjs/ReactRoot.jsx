import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Login } from "./loginPresenter.jsx";
import { Dashboard } from "./dashboardPresenter.jsx";
import { observer } from "mobx-react-lite";
import { UserIcon } from "../userIcon.jsx";
import ClockLoader from "react-spinners/ClockLoader";
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
    function handleLanguageChange(evt){
        (props.model.setPreferredLanguage(evt.target.value));
            
    }
    return (props.model.ready ?
            <div className="flexParent">
                <header className="header">
                    <UserIcon />
                    <h2 className="logo">Lyringual.</h2>
                <select
                defaultValue={props.model.lang}
                value={props.model.lang}
                onChange={handleLanguageChange}
                >
                    <option value="en">
                        🇺🇸
                    </option>
                    <option value="es">
                        🇪🇸
                    </option>
                    <option value="fr">
                        🇫🇷
                    </option>
                    <option value="de">
                        🇩🇪
                    </option>
                    <option value="it">
                        🇮🇹
                    </option>
                    <option value="pt">
                        🇵🇹
                    </option>
                    <option value="nl">
                        🇳🇱
                    </option>
                    <option value="ru">
                        🇷🇺
                    </option>
                    <option value="ja">
                        🇯🇵
                    </option>
                    <option value="ko">
                        🇰🇷
                    </option>
                    <option value="zh">
                        🇨🇳
                    </option>
                    <option value="ar">
                        🇸🇦
                    </option>
                    <option value="hi">
                        🇮🇳
                    </option>
                    <option value="tr">
                        🇹🇷
                    </option>
                    <option value="pl">
                        🇵🇱
                    </option>
                    <option value="sv">
                        🇸🇪
                    </option>
                    <option value="da">
                        🇩🇰
                    </option>
                    <option value="no">
                        🇳🇴
                    </option>
                    <option value="fi">
                        🇫🇮
                    </option>
                    <option value="el">
                        🇬🇷
                    </option>
                </select>
                </header>
                <div className="mainContent">
                    <RouterProvider router={makeRouter(props.model)} />
                </div>
            </div>
            :
            <div class="fullscreen">
                 <ClockLoader
                    color={'#03dac6'}
                    loading={true}
                    cssOverride={{
                        display: "block",
                        margin: "auto auto",
                        borderColor: "red",
                      }}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
           );
}
)

export { ReactRoot }
