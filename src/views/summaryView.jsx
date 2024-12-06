// un-comment when needed:
import {sortIngredients} from "/src/utilities.js";
import "/src/style.css"

/* Functional JSX component. Name must start with capital letter */
export function SummaryView(props){
  console.log(props);
    return (
            <div className="debug">


              {/* TW 1.2 note the syntax: {JS_expression_or_comment} */}
              Summary for <span title="nr guests">{ props.people }</span> persons:

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Aisle</th>
                    <th>Quantity</th>
                    <th>unit</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    sortIngredients(props.ingredients).map(ingredientTableRowCB)
                  }
                </tbody>
              </table>


              <button onClick={() => (window.location.hash = "#/search")}>Back</button>


            </div>
    );
    
    /* callback for Array Rendering in TW 1.3 */
    function ingredientTableRowCB(ingr){
      console.log(ingr);
        return <tr key={ /* Reflect on what's a key in array rendering! */ ingr.id } >
                 <td>{ingr.name}</td>
                 <td>{ingr.aisle}</td>
                 <td className="rightAlign">{(ingr.amount*props.people).toFixed(2)}</td>
                 <td>{ingr.unit}</td>
               </tr>;
    }
}

