import "/src/teacherFetch.js"; // protection against fetch() in infinite re-render
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import "/src/firebaseModel.js";
import { connectToFirebase } from "../firebaseModel";

window.React={createElement:createElement} 

import { model } from '/src/DinnerModel.js';
import { observable, configure, reaction } from "mobx";
configure({ enforceActions: "never", });  // we don't use Mobx actions
const reactiveModel= observable(model)

// (1) ------------ retrieve the application state (model) ----------


import {ReactRoot} from "/src/reactjs/ReactRoot.jsx"

const rootJSX= <ReactRoot model={reactiveModel} />
  
reactiveModel.doSearch({});

createRoot(document.getElementById("root")).render(rootJSX);



// (2) ----------  display (mount) the root component in the browser page. Pass the reactive model as prop ---------
// http://localhost:8080/react.html

// mount the app in the page DIV with the id "root":
/* This <div id="root"></div> is configured in vite.config.js. Vite produces a react.html file, find it in Developer tools, Sources */



// ------ for debug purposes, do not do this in production! ----------
// making the model available at the console
window.myModel= reactiveModel;
// making some example dishes available at the console:
// import dishesConst from "/test/dishesConst.js";
// window.dishesConst= dishesConst;
connectToFirebase(reactiveModel, reaction);


