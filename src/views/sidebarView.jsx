// un-comment when needed:
import {menuPrice, sortIngredients, sortDishes, dishType} from "/src/utilities.js";
//import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SidebarView(props){
    
    function clickMinusCB(e){
        console.log(props)

        props.onNumberChange(props.number-1);
    }

    function clickPlusCB(e){
        props.onNumberChange(props.number+1);
    }


    return (

        <div>
            <button onClick={clickMinusCB} label="-" disabled={props.number === 1}>-</button>
                {props.number}
            <button onClick={clickPlusCB} label="+">+</button>
            <table>
                <tbody>
                    {sortDishes(props.dishes).map(dishesTableRowCB)}
                    <tr>
                    <td></td>
                    <td>Total:</td>
                    <td></td>
                    <td className="rightAlign">{(menuPrice(props.dishes)*props.number).toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
        </div>


    );

    function dishesTableRowCB(dish){

        function clickXCB(e){
            console.log(dish);
            props.onRemoveDish(dish);
        }
    
        function clickDishCB(e){
            console.log(dish);
            props.onGetDish(dish);
        }

        return <tr key={ /* Reflect on what's a key in array rendering! */ dish.id } >
                 <td><button onClick={clickXCB}>x</button></td>
                 <td><a href="#/details" onClick={clickDishCB}>{dish.title}</a></td>
                 <td>{dishType(dish)}</td>
                 <td className="rightAlign">{((dish.pricePerServing * props.number).toFixed(2))}</td>
                 {/* <td>{ingr.unit}</td> */}
               </tr>;
    }

}

