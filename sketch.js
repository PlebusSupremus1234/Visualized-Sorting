let array, initial, sorted;

let spacing;
let paused = true;
let done = false;

let settings = {
    showCurrBars: true,
    showBarColors: false
};

let currBars = [];
let frames = [];

let comparisons = 0;
let i = 0;
let j = 0;
let m = 0;

let s = 1;
let results = {};
let t;
let avgs = [];
let inc = 2;

function setup() {
    createCanvas(1200 + 450, 800);
    colorMode(HSB);
    init({ type: "bubble", newA: true, length: 240 });
}

function draw() {
    background("#ebebeb");
    noStroke();

    if (!paused && !done) {
        let v = document.getElementById("slider").value;
        let speed = Math.ceil((v ** 2) / 15);
        let mult = v <= 40 ? 10 / (50 - v) : (v / 10) - 3;
        let { length : len } =  array;
        if (["bubble", "selection", "insertion"].includes(sort)) speed = Math.round(mult * (0.00067982018 * len ** 2 + 0.02882118 * len) + 1.363636);
        else if (sort === "merge") speed = Math.round(mult * (0.000300949051 * len ** 2 + 0.18464036 * len) + 16.1363636);
        else if (sort === "quick") speed = Math.round(mult * (0.000044505929 * len ** 2  + 0.223883794 * len) - 12.6377708);
        else speed = s;
        if (speed < 1) speed = 1;
        for (let a = 0; a < speed; a++) {
            if (sort === "bubble") {
                if (j >= i) {
                    if (i < 1) continue;
                    i--;
                    j = 0;
                }
                if (array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]];
                currBars = [j + 1];
                comparisons++;
                j++;
            } else if (sort === "selection") {
                if (j >= array.length) {
                    if (i >= array.length - 1) continue;
                    [array[m], array[i]] = [array[i], array[m]];
                    i++;
                    m = i;
                    j = i + 1;
                }
                if (array[j] < array[m]) m = j;
                currBars = [m, j];
                comparisons++;
                j++;
            } else if (sort === "insertion") {
                if (j >= i) {
                    if (i >= array.length - 1) continue;
                    i++;
                    j = 0;
                }
                if (array[i] < array[j]) [array[i], array[j]] = [array[j], array[i]];
                currBars = [j];
                comparisons++;
                j++;
            } else if (sort === "heap") {
                if (i >= frames.length) continue;
                array = frames[i];
                i++;
            } else if (sort === "merge") {
                if (a % 15 === 0) {
                    if (i >= frames.length) {
                        if (m[j] && m[j + 1]) {
                            let left = m[j].slice();    
                            let right = m[j + 1].slice();
                            let joined = [...left, ...right];
                            let flattened = m.flat();
                            let start = flattened.indexOf(joined[0]);
                            for (let k = 0; k < joined.length; k++) frames.push([[1, start + k], ...flattened]);
                            let s = [];
                            while (left.length > 0 && right.length > 0) s.push(left[0] < right[0] ? left.shift() : right.shift());
                            s = [...s, ...left, ...right];
                            m[j] = [...m[j], ...m[j + 1]];
                            m.splice(j + 1, 1);
                            start = m.flat().indexOf(s[0]);
                            for (let k = 0; k < s.length; k++) {
                                m[j][k] = s[k];
                                frames.push([[0, start + k], ...m.flat()]);
                            }
                        }
                        j++;
                        if (j >= m.length) j = 0;
                    }
                    if (frames[i]) {
                        array = frames[i].slice(1);
                        currBars = frames[i][0].slice(1);
                        comparisons += frames[i][0][0];
                        i++;
                    }
                }
            } else if (sort === "quick") {
                if (a % 15 === 0) {
                    if (i >= frames.length) {
                        if (j.length > 0) {
                            let l = frames.length;
                            while (l === frames.length && j[0]) {
                                let left = j[0][0][0];
                                let right = j[0][0][1];
                                j[0].splice(0, 1);
                                if (j[0].length === 0) j.splice(0, 1);
                                if (left < right) {
                                    //let pivot = array[Math.floor((left + right) / 2)];
                                    let pivot = array[right];
                                    let b = left - 1;
                                    for (let j = left; j < right; j++) {
                                        if (array[j] < pivot) {
                                            frames.push([[1, left, j, right], ...array]);
                                            b++;
                                            [array[b], array[j]] = [array[j], array[b]];
                                            frames.push([[1, left, j, right], ...array]);
                                        }
                                    }
                                    frames.push([[0, left, b, right], ...array]);
                                    b++;
                                    [array[right], array[b]] = [array[b], array[right]];
                                    //console.log(b, pivot)
                                    array[b] = pivot;
                                    frames.push([[0, left, b, right], ...array]);
                                    j.splice(0, 0, [[left, b - 1], [b + 1, right]]);
                                }
                            }
                        }
                    }

                    if (i < frames.length) {
                        array = frames[i].slice(1);
                        comparisons += frames[i][0][0];
                        currBars = frames[i][0].slice(1);
                        i++;
                    }
                }
            }
        }
        if (isEqual(array, sorted)) {
            currBars = [0];
            done = true;
        }
    }

    if (done && currBars[0] < array.length - 1) {
        let amt = Math.floor(array.length / 40);
        if (amt === 0) amt = 1;
        currBars[0] += amt;
        if (currBars[0] >= array.length - 1 && !paused) {
            currBars = [];
            toggle(1);
        }
    }

    fill(0);
    rect(0, 0, 1200, 800);
    if (array.length < 450) stroke(0);
    for (let i = 0; i < array.length; i++) {
        let color = settings.showCurrBars && currBars.includes(i) ? [0, 100, 100] : (settings.showBarColors ? [(330 * array[i] / array.length) + 0 - 30, 100, 100] : [0, 0, 100]);
        fill(...color);
        rect(i * 1200 / array.length, height - array[i] * spacing, 1200 / array.length, array[i] * spacing);
    }

    document.getElementById("header").innerHTML = `${sort.charAt(0).toUpperCase() + sort.slice(1)} Sort - ${comparisons} Comparisons - Made by Plebus Supremus`;

    noStroke();
    fill(0);
    textSize(40);
    textStyle(BOLD);
    text("Visualized Sorting", 1215, 50);
    textSize(30);
    text("Play or Pause:", 1215, 90);
    text("Restart:", 1215, 130);
    text("Speed:", 1215, 170);
    text("Sorting Method:", 1215, 210);
}