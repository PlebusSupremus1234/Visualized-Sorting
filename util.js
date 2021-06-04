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
    } else if (type === "quick") {
        frames = [];
        i = 0;
        j = [];
        if (array.length < 300) QuickSort([].concat(array), 0, array.length - 1, true);
        else {
            let coords = QuickSort([].concat(array), 0, array.length - 1, false);
            if (coords) j.push(coords);
        }
        frames = frames.filter((a, b) => b - 1 >= 0 && !isEqual(a, frames[b - 1].slice(1)));
    }

    currentBar = [];
}

function isEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let x = 0; x < a.length; x++) {
        if (a[x] !== b[x]) return false;
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

function QuickSort(a, low, high, continuous) {
    if (low < high) {
        let pivot = a[high];
        let b = low - 1;
        for (let j = low; j < high; j++) {
            if (a[j] < pivot) {
                frames.push([[1, low, j, high]].concat(a));
                b++;
                [a[b], a[j]] = [a[j], a[b]];
                frames.push([[1, low, j, high]].concat(a));
            }
        }
        frames.push([[0, low, b, high]].concat(a));
        b++;
        [a[high], a[b]] = [a[b], a[high]];
        frames.push([[0, low, b, high]].concat(a));
        if (continuous) {
            QuickSort(a, low, b - 1, true);
            QuickSort(a, b + 1, high, true);
        } else return [[low, b - 1], [b + 1, high]];
    }
}