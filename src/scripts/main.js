import { fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"
import { fetchPlumbers } from "./dataAccess.js"
export const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchRequests())
        .then(
            () =>  {
                mainContainer.innerHTML = SinkRepair()
            }
        )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        console.log("State of data has changed. Regenerating HTML...")
        render()
    }
)