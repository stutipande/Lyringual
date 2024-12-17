import { DetailsView } from '../views/detailsView.jsx';
import { observer } from "mobx-react-lite";
import {saveToFirebase} from "../firebaseModel.js";
import { ClockLoader } from 'react-spinners';

const Details = observer( 
function DetailsRender(props) {
  const currentSongPromiseState = props.model.currentSongPromiseState;

  function startTest() {

    props.model.startTest();  

  }

  function stopTest() {

    props.model.stopTest();  

  }

  function normalizeString(str) {
    if (!str) return "";
    const lowerCaseStr = str.toLowerCase();
    const normalizedStr = lowerCaseStr.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    return normalizedStr;
}


  function checkTest(lyric, index, value) {
    console.log(normalizeString(lyric.substring(0, value.length)), normalizeString(value));
    const correctTranslation = (normalizeString(lyric.substring(0, value.length)) === normalizeString(value));
    if ((normalizeString(lyric)) === normalizeString(value)) {
      props.model.incrementXP();
      saveToFirebase(props.model);
      props.model.setTestResult(index, "completed");
    } else {
      props.model.setTestResult(index, correctTranslation);
    }
    
  }

  function getTranslationTip(i) {
    props.model.setTranslationTip(i);
  }

  function removeTranslationTip(i) {
    props.model.removeTranslationTip(i);
  }

  const testActivated = props.model.testActivated; 
  const testResults = props.model.testResults;  

  function renderDetails(promiseState) {
    // No promise
    if (!promiseState.promise) {
      return <div>No data</div>;
    }

    // Pending promise
    if (!promiseState.data && !promiseState.error) {
      return <div class="fullscreen">
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
          testActivated = {testActivated}
          testResults = {testResults}
          onStartTest={startTest}  
          onStopTest={stopTest}  
          onCheckTest={checkTest}
          onTranslationTip={getTranslationTip}
          onRemoveTranslationTip={removeTranslationTip}
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
