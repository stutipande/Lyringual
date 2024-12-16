import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "/src/firebaseModel.js";
import { connectToFirebase } from "../firebaseModel";
import { getAuth } from "firebase/auth";

window.React={createElement:createElement} 

import { model } from "../AppModel";
import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model)

// (1) ------------ retrieve the application state (model) ----------


import {ReactRoot} from "/src/reactjs/ReactRoot.jsx"

const rootJSX= <ReactRoot model={reactiveModel} />
  
// console.log('reactiveModel.clientId', reactiveModel.clientId)
// if(!reactiveModel.clientId) {
//     reactiveModel.setClientId();
// }
reactiveModel.setSearchType('title');  
reactiveModel.setSearchQuery('Like a Prayer');  
reactiveModel.doSearch();

createRoot(document.getElementById("root")).render(rootJSX);



// (2) ----------  display (mount) the root component in the browser page. Pass the reactive model as prop ---------
// http://localhost:8080/react.html

// mount the app in the page DIV with the id "root":
/* This <div id="root"></div> is configured in vite.config.js. Vite produces a react.html file, find it in Developer tools, Sources */



// ------ for debug purposes, do not do this in production! ----------
// making the model available at the console
window.myModel= reactiveModel;

connectToFirebase(reactiveModel, reaction);


