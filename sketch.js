let array;
let initial;
let colW = 5;
let amount;
let spacing;

let currentBar;
let i, j;

let sort;

let paused = true;

function setup() {
    createCanvas(1200 + 450, 800);
    width = 1200;
    amount = width / colW;
    spacing = (height - 80) / amount;
    frameRate(60);
    init("bubble");
}

function draw() {
    background(0);
    
    if (!paused) {
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
    }

    stroke(0);
    for (let a = 0; a < array.length; a++) {
        fill(a === currentBar ? "red" : 255);
        rect(a * colW, height - array[a], colW, array[a]);
    }

    fill("#ebebeb");
    noStroke();
    rect(width, 0, 450, height);

    fill(0);
    textSize(40);
    textStyle(BOLD);
    text("Visualized Sorting", width + 15, 50);
    textSize(30);
    text("Play or Pause:", width + 15, 90);
    text("Restart:", width + 15, 130);
}