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

function setup() {
    createCanvas(1200 + 450, 800);
    colorMode(HSB);
    init({ type: "bubble", newA: true, length: 240 });
}

/*
    Todo:
    - Merge sort optimisations for larger arrays
    - Fix timing for sorts
    - Add quick sort
*/

function draw() {
    background("#ebebeb");
    noStroke();

    if (!paused && !done) {
        let element = document.getElementById("slider");
        for (let a = 0; a < Math.ceil((element.value ** 2) / 15); a++) {
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
            } else if (sort === "merge") {
                if (a % 15 === 0) {
                    if (i >= frames.length) {
                        let b = _.cloneDeep(m);
                        for (let i = j; i < (j + 10 > b.length ? b.length : j + 10); i++) { //limits to max 10 executions
                            if (b[i] && b[i + 1]) {
                                let left = b[i].slice();
                                let right = b[i + 1].slice();
                                let joined = left.concat(right);
                                for (let k = 0; k < joined.length; k++) frames.push([[b.flat().indexOf(joined[k])]].concat(b.flat()));
                                let s = [];
                                while (left.length > 0 && right.length > 0) s.push(left[0] < right[0] ? left.shift() : right.shift());
                                s = s.concat(left).concat(right);
                                b.splice(i, 0, []);
                                for (let k = 0; k < s.length; k++) {
                                    b[i].push(s[k]);
                                    b[i + 1].shift();
                                    if (b[i + 1].length === 0) b.splice(i + 1, 1);
                                    frames.push([[b.flat().indexOf(s[k])]].concat(b.flat()));
                                }
                            }
                            j++;
                            if (j >= b.length) j = 0;
                        }
                        m = _.cloneDeep(b);
                        //continue;
                    }
                    array = frames[i].slice(1);
                    currBars = frames[i][0];
                    i++;
                }
            }
        }
        if (isEqual(array, sorted)) {
            currBars = [0];
            done = true;
        }
    }

    if (done && currBars[0] < array.length - 1) {
        currBars[0] += 8;
        if (currBars[0] >= array.length - 1 && !paused) toggle(1);
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