export function SearchFormView(props) {

    function renderDishTypeOptions() {
        return props.dishTypeOptions.map(function(option, index) {
            return <option key={index} value={option}>{option}</option>;
        });
    };

    function handleTextChange(evt){
        (props.onTextChange(evt.target.value));
    }

    function handleTypeChange(evt){
        (props.onTypeChange(evt.target.value));
    }

    function handleSearch (){
        props.onSearchDish();
    }
    return (
        <div>
            <input
                type="text"
                value={props.text} sdsd
                onChange={handleTextChange} 
            />
            <select
                value={props.type} 
                onChange={handleTypeChange}
            >
                <option value="">Choose:</option>
                {renderDishTypeOptions()}
            </select>
            <button onClick={handleSearch}>Search!</button><br></br>
            <button onClick={() => (window.location.hash = "#/summary")}>View summary</button><br></br>
        </div>
    );
}
