export default function tok (token = '', action) {
    if (action.type === "addToken") {
        return action.token
    } else {
        return token
    }
}