export default function id (id = '', action) {
    if (action.type === "addId") {
        return action.id
    } else {
        return id
    }
}