export default function mail(email = '', action) {
    if(action.type === 'addEmail') {
        return action.email
    } else {
        return email
    }
}