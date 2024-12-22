import React, { useRef, useEffect } from "react";
import ConfettiExplosion from 'react-confetti-explosion';


export function DetailsView(props) {

    let setAutoFocus = true;

    const inputRefs = useRef([]);

    function renderLyricsCB(lyric, index) {
        return <li className="originalLyric" onMouseUp={(e) => { removeTranslationTipACB(index, e); }}
            onMouseDown={(e) => { getTranslationTipACB(index, e); }}
            style={{ display: "block" }} key={index}>{decodeHtmlEntities(lyric)}</li>;
    }

    function renderTranslationCB(lyric, index) {
        return <li onClick={startTestACB} style={{ display: "block" }} key={index}>{decodeHtmlEntities(lyric)}</li>;
    }

    function checkTestResultACB(lyric, index, e) {
        console.log('Checking test', lyric, e.target.value, index);
        props.onCheckTest(lyric, index, e.target.value);

        if (props.testResults[index] === 'completed' && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    }

    function renderTestCB(lyric, index) {
        if (!lyric) return;
        const thisSetFocus = setAutoFocus;
        setAutoFocus = false;

        return (
            <>
            <input
                ref={(el) => (inputRefs.current[index] = el)} 
                autoFocus={thisSetFocus ? true : false}
                disabled={props.testResults[index] === 'completed'}
                className={`testInput ${props.testResults[index] ? 'correct' : 'incorrect'}`}
                onChange={(e) => checkTestResultACB(lyric, index, e)}
                style={{ display: "block" }}
                key={index}
            ></input>
            {props.testResults[index] == 'completed' && <ConfettiExplosion />
            }
            </>
        );
    }

    function startTestACB() {
        console.log('Starting test');
        props.onStartTest();
    }

    function getTranslationTipACB(i, e) {
        console.log('Getting tip for', i);
        props.onTranslationTip(i);
    }

    function removeTranslationTipACB(i, e) {
        props.onRemoveTranslationTip(i);
    }

    function stopTestACB() {
        props.onStopTest();
    }

    function decodeHtmlEntities(text) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        return doc.documentElement.textContent;
    }

    useEffect(() => {
        return () => {
            props.onStopTest();
        };
      }, []);

    return (
        <div>
       { props.lyricData[0] != undefined && props.lyricData[1] != undefined  ?
            
        <>
            <div className="detailsButtons">
            <button onClick={() => (window.location.hash = "#/search")}>Cancel</button>
                {!props.testActivated &&
                    <button onClick={startTestACB}>Start test</button>
                }
                {props.testActivated &&
                    <button onClick={stopTestACB}>Stop test</button>
                }
            </div>
            <div className="lyricAndTranslationDiv">
                <ul className="lyrics" id="originalLyrics" style={{ listStyle: "none" }}>
                    {props.lyricData[0].map(renderLyricsCB)}
                </ul>
                {!props.testActivated &&
                    <ul className="lyrics" id="translatedLyrics" style={{ listStyle: "none" }}>
                        {props.lyricData[1].map(renderTranslationCB)}
                    </ul>
                }
                {props.testActivated &&
                    <div className="testDiv">
                        {props.lyricData[1].map(renderTestCB)}
                    </div>
                }
            </div>
            </>

            : 

            <p>An error with fetching this song occured, please try another one 😭</p>}
        </div>
    );
}
