import { SidebarView } from "../views/sidebarView.jsx";
import { observer } from "mobx-react-lite";


const Sidebar = observer(            


    function SidebarRender(props){

        function handleNumberChange(number) {
            props.model.setNumberOfGuests(number);
        };

        function handleRemoveDish(dish) {

            props.model.removeFromMenu(dish);

        }

        function handleOnGetDish(dish) {

            props.model.setCurrentDishId(dish.id);
            
        }

        return <SidebarView onRemoveDish={handleRemoveDish} onGetDish={handleOnGetDish} onNumberChange={handleNumberChange} number={props.model.numberOfGuests} dishes={props.model.dishes}/>;
    }
);

export { Sidebar };
