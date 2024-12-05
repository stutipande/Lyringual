import { DetailsView } from '../views/detailsView.jsx';
import { observer } from "mobx-react-lite";

const Details = observer( 
function DetailsRender(props) {
  console.log("detailsProps: ", props)
  const currentSongPromiseState = props.model.currentSongPromiseState;



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
          lyricData = {promiseState.data}
        />
      );
    }
  }


  
  return (
    <div>
      {renderDetails(currentSongPromiseState)} 
    </div>
  );
}
);

export { Details };
