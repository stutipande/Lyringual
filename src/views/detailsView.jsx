import { render } from "@testing-library/react";

export function DetailsView(props) {


    function renderLyricsCB(lyric, index) {
        console.log(lyric);
        return <li style={{display: "block"}} key={index}>{decodeHtmlEntities(lyric)}</li>;
    }

    function decodeHtmlEntities(text) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");
        return doc.documentElement.textContent;
    }



    return (
        <div>
            <button className="topLeftButton" onClick={() => (window.location.hash = "#/search")}>Cancel</button>
            <div className="bob">
            <ul className="lyrics" id="originalLyrics" style={{listStyle: "none"}}>
            {props.lyricData[0].map(renderLyricsCB)}
            </ul>
            <ul className="lyrics" id="translatedLyrics" style={{listStyle: "none"}}>
            {props.lyricData[1].map(renderLyricsCB)}
            </ul>
            </div>
        </div>
        
    );
}