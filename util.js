function init({ type, newA, length, initialA }) {
    if (newA) {
        let l = length ? length : array.length;
        sorted = [];
        for (let i = 0; i < l; i++) sorted.push(i + 1);
        array = sorted.slice();
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        initial = array.slice();
        spacing = (height - 80) / l;
    } else {
        if (initialA) array = initial.slice();
    }
    sort = type;
    done = false;
    comparisons = 0;
    if (!paused) toggle(1);
    frames = [];
    i = 0;
    if (sort === "bubble") {
        i = array.length - 1;
        j = 0;
    } else if (type === "selection") {
        j = i + 1;
        m = i;
    } else if (type === "insertion") {
        i = 1;
        j = 0;
    } else if (type === "merge") {
        m = array.slice().map(a => [a]);
        j = 0;
    } else if (type === "quick") {
        j = [[[0, array.length - 1]]];
    }
}

function isEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let c = 0; c < a.length; c++) {
        if (a[c] !== b[c]) return false;
    }
    return true;
}