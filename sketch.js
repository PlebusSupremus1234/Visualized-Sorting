let array;
let colW = 5;
let amount;
let spacing;

let currentBar;
let i, j;

let sort;

function setup() {
    createCanvas(1200, 800);
    amount = width / colW;
    spacing = (height - 80) / amount;
    frameRate(60);
    init("bubble");
}

function draw() {
    background(0);
    
    for (let a = 0; a < 200; a++) {
        if (sort === "bubble") {
            if (j >= i) {
                i--;
                j = 0;
            }
            if (i < 0) noLoop();
            if (array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]];
            j++;
            currentBar = j;
        }
    }

    for (let a = 0; a < array.length; a++) {
        fill(a === currentBar ? "red" : 255);
        rect(a * colW, height - array[a], colW, array[a]);
    }
}