function init(type, same) {
    if (!paused) playpause();
    if (!same) {
        array = [];
        for (let a = 0; a < amount; a++) array.push(a * spacing);
        for (let a = array.length - 1; a > 0; a--) {
            let b = Math.floor(Math.random() * (a + 1));
            [array[a], array[b]] = [array[b], array[a]];
        }

        initial = [].concat(array); //concat for duplicating array,
    } else array = [].concat(initial); //so it isnt a pointer

    sort = type;
    if (type === "bubble") {
        i = array.length - 1;
        j = 0;
    }

    currentBar = null;
}

function playpause() {
    let element = document.getElementById("playpause");
    element.classList.toggle("paused");
    paused = !paused;
}

function restart() {
    let element = document.getElementById("restart");
    if (!element.classList.contains("clicked")) {
        element.classList.toggle("clicked");
        setTimeout(() => element.classList.toggle("clicked"), 800);

        init(sort, true);
    }
}