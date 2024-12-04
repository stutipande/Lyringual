export function DetailsView(props) {

    function renderIngredientsCB(item, index) {
            return <li key={index}>{item.name} {item.amount} {item.unit}</li>;
    };

    function handleAddToMenuACB() {
        props.addToMenu(props.dishData);
        window.location.hash = "#/search";
    };




    return (
        <div>
            <p style={{whiteSpace: "pre-line"}} id="original-lyrics">

            {props.dishData}

            </p>

            <button onClick={() => (window.location.hash = "#/search")}>Cancel</button>
            
        </div>
        
    );
}