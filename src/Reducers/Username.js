export default function ap(pseudo = '', action) {
    if(action.type === 'addPseudo') {
        return action.pseudo
    } else {
        return pseudo
    }
}