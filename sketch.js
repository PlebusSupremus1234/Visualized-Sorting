let array;
let initial;
let colW = 5;
let amount;
let spacing;

let currentBar;
let i, j, min;

let sort;

let paused = true;

function setup() {
    createCanvas(1200 + 450, 800);
    width = 1200;
    amount = width / colW;
    spacing = (height - 80) / amount;
    frameRate(60);
    init("selection");
}

function draw() {
    background(0);
    
    if (!paused) {
        let element = document.getElementById("slider");
        for (let a = 0; a < Math.ceil((element.value ** 2) / 15); a++) {
            if (sort === "bubble") {
                if (j >= i) {
                    if (i < 1) continue;
                    i--;
                    j = 0;
                }
                if (array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]];
                j++;
                currentBar = j;
            } else if (sort === "selection") {
                if (j >= array.length) {
                    if (i >= array.length - 1) continue;
                    [array[min], array[i]] = [array[i], array[min]];
                    i++;
                    min = i;
                    j = i + 1;
                }
                if (array[j] < array[min]) min = j;
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