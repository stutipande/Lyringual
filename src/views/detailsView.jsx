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
            <img src={props.dishData.image} />
            <button onClick={handleAddToMenuACB} disabled={props.isDishInMenu}>Add to menu</button>
            <p>Total price ({props.guests} guests): {(props.dishData.pricePerServing * props.guests).toFixed(2)}</p>
            <p>Price per person: {(props.dishData.pricePerServing).toFixed(2)}</p>
            <p>Ingredients:</p>
            <ul>
            {props.dishData.extendedIngredients.map(renderIngredientsCB)}
            </ul>
            <p>{props.dishData.instructions}</p>
            <a href={props.dishData.sourceUrl}>Link to recipe</a>
            <button onClick={() => (window.location.hash = "#/search")}>Cancel</button>
        </div>
    );
}