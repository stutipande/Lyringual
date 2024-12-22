    export function SearchFormView(props) {

    function renderSearchTypeOptions() {
        return props.searchTypeOptions.map(function(option, index) {
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
        props.onSearchSong();
    }

    // Display last song
    const lastSong = props.lastSongId ? props.lastSongId : "No previous song";  


    return (
        <div id="searchForm">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={props.text}
                    onChange={handleTextChange} 
                />
                <select
                    value={props.type} 
                    onChange={handleTypeChange}
                >
                    {renderSearchTypeOptions()}
                </select>
                <button type = "submit">Search!</button><br></br>
            </form>


            
        </div>
    );
}
