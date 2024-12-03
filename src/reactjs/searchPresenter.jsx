import { observer } from "mobx-react-lite";
import { SearchFormView } from '../views/searchFormView.jsx';
import { SearchResultsView } from '../views/searchResultsView.jsx';

const Search = observer( 
function SearchRender(props) {
    // Dish type options
    const dishTypeOptions = ["starter", "main course", "dessert"];
    const searchText = props.model.searchParams.query;  
    const searchType = props.model.searchParams.type   

    // Custom Event Handlers
    function handleTextChange(text) {
        props.model.setSearchQuery(text); 
    }

    function handleTypeChangeACB(type) {
        props.model.setSearchType(type);  
    }

    function searchNowACB() {
        props.model.doSearch(props.model.searchParams);  
    }

    function setCurrentDishACB(dish) {
        props.model.setCurrentDishId(dish.id); 
    }

    function renderSearchResults(promiseState) {
        if (!promiseState.promise) {
            return <div>No data</div>; 
        }

        if (promiseState.error) {
            return <div>Error: {promiseState.error.toString()}</div>; 
        }

        if (promiseState.promise && !promiseState.data) {
            return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading..." />; 
        }

        if (promiseState.data) {
            return <SearchResultsView
                searchResults={promiseState.data.length ? promiseState.data : []}
                onDishClick={setCurrentDishACB} 
            />;
        }

    }

    return (
        <div>

            <SearchFormView
                text={searchText}
                type={searchType}
                dishTypeOptions={dishTypeOptions}
                onTextChange={handleTextChange}  
                onTypeChange={handleTypeChangeACB} 
                onSearchDish={searchNowACB} 
                
            />

            {renderSearchResults(props.model.searchResultsPromiseState)}
        </div>
    );
}
);
export { Search };
