import { render } from "@testing-library/react";

export function DetailsView(props) {


    function renderLyricsCB(lyric, index) {
        console.log(lyric);
        return <li style={{display: "block", height: "1em"}} key={index}>{lyric}</li>;
    }




    return (
        <div>
            <p style={{whiteSpace: "pre-line"}} id="original-lyrics">
            <ul style={{listStyle: "none"}}>
            {props.dishData.map(renderLyricsCB)}
            </ul>
            </p>

            <button onClick={() => (window.location.hash = "#/search")}>Cancel</button>
            
        </div>
        
    );
}