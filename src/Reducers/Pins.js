export default function pins (pin = [], action) {
    console.log("pin reducer",pin)
    if (action.type === "addPins") {
        return action.pin
    } else {
        return pin
    }
}