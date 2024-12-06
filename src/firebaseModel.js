import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";

// Add relevant imports here 
// TODO
import {firebaseConfig} from "/src/firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialise firebase app, database, ref
// TODO
/*  PATH is the “root” Firebase path. NN is your TW2_TW3 group number */
const db= getDatabase(app);
const PATH="dinnerModel125";
// set(ref(db, PATH+"/test"), "dummy");

const REF= PATH+"/test";
const rf= ref(db, REF);


// set(
//     ref(db, PATH+"/test2"), 
//     modelToPersistence({
//     numberOfGuests:5, 
//     currentDishId:13, 
//     dishes:[{id:13, title:"dummy1"}, 
//             {id:42, title:"dummy2"}],
//    }));


 function modelToPersistence(model){
  return {
    currentSongId: model.currentSongId,
    lastSongId: model.lastSongId,
    preferredLanguage: model.lang || "en",
  };
}


 function persistenceToModel(dataFromPersistence, model){

  console.log('dataFromPersistence', dataFromPersistence);
  console.log('model', model);

  if (!dataFromPersistence) {
    dataFromPersistence = {songId: undefined, preferredLanguage: "en" };
  } else {
    model.setCurrentSongId(dataFromPersistence.currentSongId)
    model.lastSongId = dataFromPersistence.lastSongId;
    model.setPreferredLanguage(dataFromPersistence.preferredLanguage || "en");
  }
}


 function saveToFirebase(model){
    if (model.ready) {
      set(
        ref(db, PATH+"/test"), 
        modelToPersistence(model)
      );
    }
}

function readFromFirebase(model){
  model.ready=false;
  return get(rf)
            .then(function convertACB(snapshot){
                   return persistenceToModel(snapshot.val(), model);
             })
            .then(function setModelReadyACB(){
                        model.ready=true;
            })           
}

 function connectToFirebase(model, watchFunction){

  
  function isChangeImportantACB(){
    return [model.currentSongId, model.lang];
  }

  function saveChangesACB(){
    saveToFirebase(model);

  }
  readFromFirebase(model).then(() => watchFunction(isChangeImportantACB,saveChangesACB));

}
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}
