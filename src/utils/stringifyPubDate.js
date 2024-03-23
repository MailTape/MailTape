export default function stringifyPubDate (a) {
    return "SUN MORNING, "+a.toString().slice(4,16).toUpperCase();
}