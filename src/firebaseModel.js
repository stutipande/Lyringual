import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "firebase/auth"; //this is here only to keeps track of functions

//chanses are that simply having a button with the signout function above and changing the page back to login would work as logout

// Add relevant imports here 
// TODO
import {firebaseConfig} from "/src/firebaseConfig.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);





// Initialise firebase app, database, ref
// TODO
/*  PATH is the “root” Firebase path. NN is your TW2_TW3 group number */
const db= getDatabase(app);
const PATH="dinnerModel125/";
// set(ref(db, PATH+"/test"), "dummy");

//const REF= PATH+"/test";
//const rf= ref(db, REF);


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
    xp: model.XP || 0
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
    model.setXP(dataFromPersistence.xp || "0");
  }
}


 function saveToFirebase(model){
    if (model.ready && model.user) {
      set(
        ref(db, PATH+model.user.uid), 
        modelToPersistence(model)
      );
    }
}

function readFromFirebase(model){
  console.log("user:", model.user)
  console.log("userUID:", model.user.uid);
  if (model.user.uid){
  model.ready=false;
  return get(ref(db, PATH+model.user.uid))
            .then(function convertACB(snapshot){
                   return persistenceToModel(snapshot.val(), model);
             })
            .then(function setModelReadyACB(){
                        model.ready=true;
            })       
  } else {
    model.ready=true;
    return;
  }
}

 function connectToFirebase(model, watchFunction){

  onAuthStateChanged(auth, loginOrOutACB);
  if(model.user == null){
    model.setUser(getAuth(app));
  }

  function loginOrOutACB(user){
    console.log('user logged in/out:', user);
    if(user) {
      model.setUser(user);
      readFromFirebase(model);
    }
  }

  function isChangeImportantACB(){
    return [model.currentSongId, model.lang, model.XP];
  }

  function saveChangesACB(){
    saveToFirebase(model);
  }

  readFromFirebase(model).then(() => watchFunction(isChangeImportantACB,saveChangesACB));
}
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase}
