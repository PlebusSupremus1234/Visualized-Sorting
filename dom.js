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
    } else if (id === 3 || id === 4) { //new set
        let element = document.getElementsByClassName("btn")[id === 3 ? 0 : 1];
        if (!element.classList.contains("clicked")) {
            init({ type: sort, newA: true, custom: id === 4 ? "reverse" : false });
            element.classList.toggle("clicked");
            setTimeout(() => element.classList.toggle("clicked"), 200);
        }
    } else if (id === 5) { //show current bars
        settings.showCurrBars = !settings.showCurrBars;
    } else if (id === 6) { //show colors
        settings.showBarColors = !settings.showBarColors;
        let element = document.getElementById("cshift");
        element.classList.toggle("visible");
    } else if (id === 7) { //custom array
        let value = document.getElementById("mcontent").children[3].value.trim();
        let error = false;
        if (value.startsWith("[")) {
            if (value.endsWith("]")) value = value.slice(1, value.length - 1);
            else error = true;
        }
        let arr = value.split(",").map(x => parseInt(x)).filter(x => x);
        if (arr.length === 0) error = true;
        let sted = arr.slice().sort((a, b) => a - b);
        for (let x = 0; x < sted.length; x++) {
            if (x + 1 !== sted[x]) error = true;
        }
        if (error) document.getElementById("err").innerHTML = "Please input a full complete array of integers";
        else {
            init({ type: sort, newA: true, custom: arr });
            document.getElementById('modal').style.display = "none";
        }
    } else if (id === 8) { //deploy modal
        let element = document.getElementById("modal");
        element.style.display = "block";
        element.children[0].children[4].innerHTML = "";
        element.children[0].children[3].value = JSON.stringify(array);
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