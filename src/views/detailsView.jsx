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
            <p style={{whiteSpace: "pre-line"}} id="original-lyrics">
            <ul class="lyrics" id="originalLyrics" style={{listStyle: "none"}}>
            {props.dishData[0].map(renderLyricsCB)}
            </ul>
            <ul class="lyrics" id="translatedLyrics" style={{listStyle: "none"}}>
            {props.dishData[1].map(renderLyricsCB)}
            </ul>
            </p>

            <button onClick={() => (window.location.hash = "#/search")}>Cancel</button>
            
        </div>
        
    );
}