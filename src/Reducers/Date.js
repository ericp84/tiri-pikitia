export default function date (date = "", action) {
    if (action.type === "addDate") {
        return action.date
    } else {
        return date
    }
}