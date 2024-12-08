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
  
    function handleLanguageChange(evt){
        (props.onLanguageChange(evt.target.value));
            
    }

    // Display last song
    const lastSong = props.lastSongId ? props.lastSongId : "No previous song";  


    return (
        <div>
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
                <option value="">Choose:</option>
                {renderSearchTypeOptions()}
            </select>
            <button type = "submit">Search!</button><br></br>
            </form> 

            <select
                value={props.lang}
                onChange={handleLanguageChange}
                >
                <option value="en">English</option>
                <option value="sv">Swedish</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
</select>

        <div>   
            <p>Last Song: {lastSong} </p>
        </div>


            
        </div>
    );
}
