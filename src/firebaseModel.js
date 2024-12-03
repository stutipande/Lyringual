import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set} from "/src/teacherFirebase.js";

// Add relevant imports here 
// TODO
import {firebaseConfig} from "/src/firebaseConfig.js";
import { getDishDetails, getMenuDetails } from "./dishSource";


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
    const dishIds = model.dishes.map(dish => dish.id);
    const sortedDishId = dishIds.sort()
  return {
    guests: model.numberOfGuests,
    dishId:  sortedDishId,
    currentDishId: model.currentDishId,
  };
}


 function persistenceToModel(dataFromPersistence, model){

  console.log('dataFromPersistence', dataFromPersistence);
  console.log('model', model);

  if (!dataFromPersistence) {
    model.dishes = [];
    dataFromPersistence = {dishId: undefined};
  } else {
    model.setCurrentDishId(dataFromPersistence.currentDishId)
  }

  model.setNumberOfGuests(dataFromPersistence.guests || 2);
    
    return getMenuDetails(dataFromPersistence.dishId || []).then(
        function convertBackACB(dishes){
          model.dishes = [...dishes];
        })
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
                   // return promise
                   return persistenceToModel(snapshot.val(), model);
             })
            .then(function setModelReadyACB(){
                        model.ready=true;
            })           
}

 function connectToFirebase(model, watchFunction){

  
  function isChangeImportantACB(){
    return [model.numberOfGuests, model.dishes, model.currentDishId];
  }

  function saveChangesACB(){
    saveToFirebase(model);

  }
  readFromFirebase(model).then(() => watchFunction(isChangeImportantACB,saveChangesACB));

}
// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }
