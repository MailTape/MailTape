export default function sortByName(arr) {
    return arr.sort((a, b) => {
        if (a.data.name < b.data.name) {
            return -1; // a comes before b
        }
        if (a.data.name > b.data.name) {
            return 1; // a comes after b
        }
        return 0; // a and b are equal
    });
}