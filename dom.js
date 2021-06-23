function toggle(id) {
    if (id === 1) { //play/pause
        let element = document.getElementById("playpause");
        element.classList.toggle("paused");
        paused = !paused;
    } else if (id === 2) { //restart
        let element = document.getElementById("restart");
        if (!element.classList.contains("clicked")) {
            init({ type: sort, newA: false, initialA: true });
            element.classList.toggle("clicked");
            setTimeout(() => element.classList.toggle("clicked"), 800);
        }
    } else if (id === 3) { //new set
        let element = document.getElementById("btn");
        if (!element.classList.contains("clicked")) {
            init({ type: sort, newA: true });
            element.classList.toggle("clicked");
            setTimeout(() => element.classList.toggle("clicked"), 200);
        }
    } else if (id === 4) { //show current bars
        settings.showCurrBars = !settings.showCurrBars;
    } else if (id === 5) { //show colors
        settings.showBarColors = !settings.showBarColors;
        let element = document.getElementById("cshift");
        element.classList.toggle("visible");
    }
}

function manage(type) {
    if (type === "input") {
        let element = document.getElementById("element-amt");
        element.value = element.value.replace(/\D/g, "");
        if (parseInt(element.value) === 0) element.value = "1";
        if (parseInt(element.value) > 1200) element.value = "1200";
        init({ type: sort, newA: true, length: parseInt(element.value) });
    }
}