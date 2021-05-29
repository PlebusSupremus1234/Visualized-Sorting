function init(type) {
    array = [];
    for (let a = 0; a < amount; a++) array.push(a * spacing);
    for (let a = array.length - 1; a > 0; a--) {
        let b = Math.floor(Math.random() * (a + 1));
        [array[a], array[b]] = [array[b], array[a]];
    }

    sort = type;
    if (type === "bubble") {
        i = array.length - 1;
        j = 0;
    }
}