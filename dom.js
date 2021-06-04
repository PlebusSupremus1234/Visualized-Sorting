function playpause() {
    let element = document.getElementById("playpause");
    element.classList.toggle("paused");
    paused = !paused;
}

function changeAlg() {
    let element = document.getElementById("select");
    if (element.value !== sort) init(element.value, false, true);
}

function toggle(num) {
    if (num === 0) showCurrentBar = !showCurrentBar;
    else if (num === 1) showColors = !showColors;
}

function manageInp(el) {
    el.value = el.value.replace(/\D/g,'');
    if (parseInt(el.value) === 0) el.value = "1";
    if (parseInt(el.value) > 1200) el.value = "1200";
}