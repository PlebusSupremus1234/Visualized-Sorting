function playpause() {
    let element = document.getElementById("playpause");
    element.classList.toggle("paused");
    paused = !paused;
}

function restart() {
    let element = document.getElementById("restart");
    if (!element.classList.contains("clicked")) {
        element.classList.toggle("clicked");
        setTimeout(() => element.classList.toggle("clicked"), 800);

        init(sort, false);
    }
}

function newSet(el) {
    if (!el.classList.contains("clicked")) {
        init(sort, true);
        el.classList.toggle("clicked");
        setTimeout(() => el.classList.toggle("clicked"), 500);
    }
}

function changeAlg() {
    let element = document.getElementById("select");
    if (element.value !== sort) init(element.value, false, true);
}

function toggle(num) {
    if (num === 0) showCurrentBar = !showCurrentBar;
    else if (num === 1) {
        showColors = !showColors;
        document.getElementById("cshift").classList.toggle("visible");
    }
}

function manageElements() {
    document.getElementById("header").innerHTML = `${sort.charAt(0).toUpperCase() + sort.slice(1)} Sort - ${comparisons} Comparisons - Made by Plebus Supremus`;
    
    let { children } = document.getElementById("cshift");
    if (cshift !== parseInt(children[1].value) - 50) {
        cshift = parseInt(children[1].value) - 50;
        children[0].innerHTML = `Color Shift (${cshift}):`;   
    }
}

function manageInp(el) {
    el.value = el.value.replace(/\D/g, "");
    if (parseInt(el.value) === 0) el.value = "1";
    if (parseInt(el.value) > 1200) el.value = "1200";
}