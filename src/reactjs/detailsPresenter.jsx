import { DetailsView } from '../views/detailsView.jsx';
import { observer } from "mobx-react-lite";

const Details = observer( 
function DetailsRender(props) {
  const currentDishPromiseState = props.model.currentDishPromiseState;

  function findDishCB(dish) {
    return props.model.currentDishId === dish.id;
  }


  function renderDetails(promiseState) {
    console.log(promiseState);
    // No promise
    if (!promiseState.promise) {
      return <div>No data</div>;
    }

    // Pending promise
    if (!promiseState.data && !promiseState.error) {
      return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />;
    }

    // Error
    if (promiseState.error) {
      return <div>Error: {promiseState.error.toString()}</div>;
    }

    // Data available
    if (promiseState.data) {
      return (
        <DetailsView
          guests={props.model.numberOfGuests}
          isDishInMenu={props.model.dishes.find(findDishCB)}
          dishData={promiseState.data}
          addToMenu={handleAddToMenuACB} 
        />
      );
    }

      // Callback function for adding dish to the menu
    function handleAddToMenuACB() {
      props.model.addToMenu(promiseState.data);
    }

  }


  
  return (
    <div>
      {renderDetails(currentDishPromiseState)} 
    </div>
  );
}
);

export { Details };
