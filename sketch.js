let array = [];
let colW = 5;

let currentBar;
let i, j;

let sort;

function setup() {
    createCanvas(1200, 800);
    frameRate(60);
    let amount = width / colW;
    let spacing = (height - 80) / amount;
    for (let i = 0; i < amount; i++) array.push(i * spacing);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    sort = "bubble";
}

function draw() {
    background(0);
    for (let a = 0; a < array.length; a++) {
        fill(a === currentBar ? "red" : 255);
        rect(a * colW, height - array[a], colW, array[a]);
    }
    
    for (let a = 0; a < 50; a++) {
        if (sort === "bubble") {
            if (i === undefined || j === undefined) {
                i = array.length - 1;
                j = 0;
            }
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