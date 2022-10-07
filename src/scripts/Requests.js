import {getRequests} from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

export const Requests = () => {
const requests = getRequests() 
const plumbers = getPlumbers()
//const merged = [...requests, ...plumbers] works but not for this assignment
let html = '<ul>'

 const listItemsArray = requests.map(req =>{
return `<li>
${req.description}
<button class="request__delete"
        id="request--${req.id}">
        🗑️
</button>
<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${req.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
</li>`})

        
html += listItemsArray.join("")
    
    html += '</ul>'
    return html
    


}

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: `${requestId}`,
                plumberId: `${plumberId}`,
                timestamp: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletion(completion)


        }
    }
)