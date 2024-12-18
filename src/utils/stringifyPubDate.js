export default function stringifyPubDate (a,compact) {
    if(compact){
        return a.toString().slice(4,16).toUpperCase();
    }
    else {
    return "SUN MORNING, "+a.toString().slice(4,16).toUpperCase();
    }
}