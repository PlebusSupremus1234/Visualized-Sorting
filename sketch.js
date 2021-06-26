let array, initial, sorted;

let spacing;
let paused = true;
let done = false;

let currBars = [];
let frames = [];

let comparisons = 0;
let i = 0;
let j = 0;
let m = 0;
let k = [];

let settings = {
    showCurrBars: true,
    showBarColors: false
};
let cshift = 0;

let t;
let s = 1;
let inc = 1;
let res = {};
let avgs = [];

function setup() {
    createCanvas(1200 + 450, 800);
    colorMode(HSB);
    init({ type: "bubble", newA: true, length: 100 });
}

function draw() {
    background("#ebebeb");
    noStroke();

    if (!paused && !done) {
        let v = document.getElementById("slider").value;
        let speed = Math.ceil((v ** 2) / 15);
        let mult = v <= 40 ? 10 / (50 - v) : (v / 10) - 3;
        let { length : len } =  array;
        if (["bubble", "selection", "insertion", "cocktail"].includes(sort)) speed = Math.round(mult * (0.00067982018 * len ** 2 + 0.02882118 * len) + 1.363636);
        else if (sort === "bucket") speed = k[0] === 2 ? Math.round(mult * (0.008122529644 * len + 0.111660079)) : array.length / 50;
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
            } else if (sort === "cocktail") {
                if (m) {
                    if (i >= j[1]) {
                        m = !m;
                        j[1]--;
                    }
                    if (array[i] > array[i + 1]) [array[i], array[i + 1]] = [array[i + 1], array[i]];
                    i++;
                } else {
                    if (i <= j[0]) {
                        m = !m;
                        j[0]++;
                    }
                    if (array[i] < array[i - 1]) [array[i], array[i - 1]] = [array[i - 1], array[i]];
                    i--;
                }
                comparisons++;
                currBars = [i];
            } else if (sort === "bucket") {
                if (k[0] === 0) { //putting in buckets
                    m[Math.floor(array[i] / 10)].push(array[i]);
                    i++;
                    if (i >= array.length) {
                        k[0]++;
                        i = 0;
                    }
                    currBars = [i];
                } else if (k[0] === 1) { //animating
                    array[i] = m.flat()[i];
                    currBars = [i];
                    i++;
                    if (i >= array.length) {
                        k[0]++;
                        i = 0;
                    }
                } else if (k[0] === 2) { //sorting
                    if (!k[1]) k.push(1);
                    let bucket = m[i];
                    if (!bucket || !bucket[j]) continue;
                    if (j >= k[1]) {
                        if (k[1] >= bucket.length - 1) {
                            i++;
                            k[1] = 0;
                            bucket = m[i];
                        }
                        k[1]++;
                        j = 0;
                    }
                    if (bucket[k[1]] < bucket[j]) [bucket[k[1]], bucket[j]] = [bucket[j], bucket[k[1]]];
                    comparisons++;
                    m[i] = bucket.slice();
                    array = m.flat();
                    currBars = [i * 10 + j];
                    j++;
                }
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
                            let ileft = j[0][0],
                                left = ileft,
                                iright = j[0][1],
                                right = iright;
                            let pivot = Math.floor((left + right) / 2);
                            while (left <= right) {
                                if (array[left] <= array[pivot]) left++;
                                else if (array[right] >= array[pivot]) right--;
                                else {
                                    [array[left], array[right]] = [array[right], array[left]];
                                    left++;
                                    right--;
                                }
                                frames.push([[1, left, pivot, right], ...array]);
                            }
                            if (pivot < right) {
                                [array[pivot], array[right]] = [array[right], array[pivot]];
                                pivot = right;
                            } else if (pivot > left) {
                                [array[pivot], array[left]] = [array[left], array[pivot]];
                                pivot = left;
                            }
                            frames.push([[1, left, pivot, right], ...array]);

                            let insert = [];
                            if (ileft < pivot - 1) insert.push([ileft, pivot - 1]);
                            if (iright > pivot + 1) insert.push([pivot + 1, iright]);
                            j.splice(0, 1, ...insert);
                            frames.push([[1, left, pivot, right], ...array]);
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
            if (isEqual(array, sorted)) {
                currBars = [0];
                done = true;
            }
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
        let color = settings.showCurrBars && currBars.includes(i) ? [0, 100, 100] : (settings.showBarColors ? [(330 * array[i] / array.length) - 30 + cshift, 100, 100] : [0, 0, 100]);
        fill(...color);
        rect(i * 1200 / array.length, height - array[i] * spacing, 1200 / array.length, array[i] * spacing);
    }

    document.getElementById("header").innerHTML = `${descs[sort].title} - ${comparisons} Comparisons - Made by Plebus Supremus`;
    let sliderD = document.getElementById("cshift").children;
    let v = parseInt(sliderD[1].value) - 50;
    if (cshift !== v) {
        sliderD[0].innerHTML = `Color Shift (${v}):`;
        cshift = v;
    }

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