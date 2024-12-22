import { Search } from "./searchPresenter.jsx";
import { Details } from "./detailsPresenter.jsx";
import { Login } from "./loginPresenter.jsx";
import { Dashboard } from "./dashboardPresenter.jsx";
import { observer } from "mobx-react-lite";
import { UserIcon } from "../userIcon.jsx";
import ClockLoader from "react-spinners/ClockLoader";
import "/src/style.css"
import {  createHashRouter,  RouterProvider, useParams, Navigate} from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

function makeRouter(model) {
    return createHashRouter([
        {
            path: "/",
            element: model.user?.uid ? <Navigate to="/dashboard" replace /> : <Login model={model} />,
        },
        {
            path: "/search",
            element: model.user?.uid ? <Search model={model} /> : <Navigate to="/" replace />,
        },
        {
            path: "/details",
            element: model.user?.uid ? <Details model={model} /> : <Navigate to="/" replace />,
        },
        {
            path: "/login",
            element: model.user?.uid ? <Navigate to="/dashboard" replace /> : <Login model={model} />,
        },
        {
            path: "/dashboard",
            element: model.user?.uid ? <Dashboard model={model} /> : <Navigate to="/" replace />,
        },
    ]);
}



const ReactRoot = observer(
function ReactRoot(props){
    function handleLanguageChange(evt){
        (props.model.setPreferredLanguage(evt.target.value));
        if(window.location.hash == "#/details"){
            props.model.setCurrentSongId(props.model.currentSongId)
        }
            
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
                    <Toaster/>
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
