function* SelectionSort(array) {     
    for (let i = 0; i < array.length; i++) {
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[min]) min = j; 
        }
        if (min != i) [array[i], array[min]] = [array[min], array[i]];
        yield;
    }
}

function* InsertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = 0; j < i; j++) {
            if (array[i] < array[j]) [array[i], array[j]] = [array[j], array[i]];
        }
        yield;
    }
}

function* MergeSort(array, half = array.length / 2) {
    function merger(left, right){
        const arr = [];  
        while (left.length && right.length){
            if (left[0] < right [0]) arr.push(left.shift());
            else arr.push(right.shift());
        }  
        return [...arr, ...left, ...right];
    }
    if (array.length < 2) return array;  
    const left = array.splice(0, half);
    return merger(MergeSort(left), MergeSort(array));
}

function* QuickSort(array) {
    if (array.length < 2) return array;  
    let p = array[0];    
    let l = []; 
    let r = [];  
    for (let i = 1; i < array.length; i++) array[i] < p ? l.push(array[i]) : r.push(array[i]);
    yield;
    return QuickSort(l).concat(p, QuickSort(r));
}

//fix merge and quick sort