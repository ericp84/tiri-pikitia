export default function pins (pin = [], action) {
    if (action.type === "addPins") {
        return action.pin
    } else {
        return pin
    }
}