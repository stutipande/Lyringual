export function SearchResultsView(props) {
 
    // Event handler for dish click
    function handleDishClickACB(dish) {
            window.location.hash = '#/details';
            return props.onDishClick(dish); 
    };

    // Render search results
    function renderSearchResultsCB() {
        return props.searchResults.map((dish) => (
            <span 
                
                key={dish.id} 
                onClick={() => handleDishClickACB(dish)} 
            >
                <img
                    src={dish.image} 
                    alt={dish.title} 
                    height="100"  
                />
                <div>{dish.title}</div> 
                <button onClick={() => (window.location.hash = "#/details")}>View details</button><br></br>
            </span>
        ));
    };

    return (
        <div class="searchResult"> {renderSearchResultsCB()}</div>
    );
}
