import { DetailsView } from '../views/detailsView.jsx';
import { observer } from "mobx-react-lite";
import {saveToFirebase} from "../firebaseModel.js";
import { ClockLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import {nextLevelXP, currentLevelXP, currentLevel, getFlagFromLanguageCode, customToast} from '../utilities.js'
import Joyride from 'react-joyride';
import { defaultOptions } from '../tooltipStyle.js';

const Details = observer( 
function DetailsRender(props) {
  const currentSongPromiseState = props.model.currentSongPromiseState;

  let steps;

  if ( props.model.testActivated && props.model.showTestTutorial )
  steps = [
    {
      target: '.testInput',
      content: 'Type the translated lyrics in here!'
    },
    {
      target: '.originalLyric',
      content: 'Click and hold for a hint!'
    },
];

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

  function sendToast() {

    const item = props.model.XP[props.model.lang];


    const next_level_xp = nextLevelXP(item);
    const current_level_xp = currentLevelXP(item);
    const current_level = currentLevel(item);

    customToast(<span>
      <p>Level {current_level}</p> 
      <progress value={(item - current_level_xp) / (next_level_xp - current_level_xp)} />
      <p>{(item - current_level_xp)} / {(next_level_xp - current_level_xp)}</p>
      </span>, getFlagFromLanguageCode(props.model.lang))
  }


  function checkTest(lyric, index, value) {
    console.log(normalizeString(lyric.substring(0, value.length)), normalizeString(value));
    const correctTranslation = (normalizeString(lyric.substring(0, value.length)) === normalizeString(value));
    if ((normalizeString(lyric)) === normalizeString(value)) {
      props.model.incrementXP();
      saveToFirebase(props.model);
      props.model.setTestResult(index, "completed");
      sendToast();
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

  const handleJoyrideCallback = (data) => {
    const { action, index, origin, status, type } = data;
    if (type == "tour:end") {
        console.log('Doing the thing!')
        props.model.disableTestTutorial();
    }
  };


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
      <Joyride
        callback={handleJoyrideCallback}
        steps={steps}
        styles={defaultOptions}
        /> 
    </div>
  );
}
);

export { Details };
