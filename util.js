function init(type, newA, same, arrLength) {
    if (!paused && !same) playpause();
    if (newA) {
        array = [];
        if (arrLength && arrLength !== amount) {
            amount = arrLength;
            colW = width / amount;
            spacing = (height - 80) / amount;
        }
        for (let a = 0; a < amount; a++) array.push((a + 1) * spacing);
        sorted = [].concat(array);
        for (let a = array.length - 1; a > 0; a--) {
            let b = Math.floor(Math.random() * (a + 1));
            [array[a], array[b]] = [array[b], array[a]];
        }

        initial = [].concat(array);
    } else {
        if (!same) array = [].concat(initial);
    }

    done = false;
    comparisons = 0;
    sort = type;
    if (type === "bubble") {
        i = array.length - 1;
        j = 0;
    } else if (type === "selection") {
        i = 0;
        j = i + 1;
        min = i;
    } else if (type === "insertion") {
        i = 1;
        j = 0;
    }

    currentBar = null;
}

function playpause() {
    let element = document.getElementById("playpause");
    element.classList.toggle("paused");
    paused = !paused;
}

function isSorted() {
    if (array.length !== sorted.length) return false;
    for (let a = 0; a < array.length; a++) {
        if (array[a] !== sorted[a]) return false;
    }
    return true;
}

function restart() {
    let element = document.getElementById("restart");
    if (!element.classList.contains("clicked")) {
        element.classList.toggle("clicked");
        setTimeout(() => element.classList.toggle("clicked"), 800);

        init(sort, false);
    }
}

function changeAlg() {
    let element = document.getElementById("select");
    if (element.value !== sort) init(element.value, false, true);
}

function toggle(num) {
    if (num === 0) showCurrentBar = !showCurrentBar;
}

function manageInp(el) {
    el.value = el.value.replace(/\D/g,'');
    if (parseInt(el.value) > 500) el.value = "500";
}