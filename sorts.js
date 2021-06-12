function QuickSort(a, low, high, continuous) {
    if (low < high) {
        let pivot = a[high];
        let b = low - 1;
        for (let j = low; j < high; j++) {
            if (a[j] < pivot) {
                frames.push([[1, low, j, high]].concat(a));
                b++;
                [a[b], a[j]] = [a[j], a[b]];
                frames.push([[0, low, j, high]].concat(a));
            }
        }
        frames.push([[1, low, b, high]].concat(a));
        b++;
        [a[high], a[b]] = [a[b], a[high]];
        frames.push([[0, low, b, high]].concat(a));
        if (continuous) {
            QuickSort(a, low, b - 1, true);
            QuickSort(a, b + 1, high, true);
        } else return [[low, b - 1], [b + 1, high]];
    }
}

function MergeSort(a) {
    let l = [[].concat(a.map(b => [b]))];
    while (!isEqual(l[l.length - 1].flat(), sorted)) {
        let b = _.cloneDeep(l[l.length - 1]);
        for (let i = 0; i < l[0].length; i++) {
            if (b[i] && b[i + 1]) {
                let left = b[i].slice();
                let right = b[i + 1].slice();
                let s = [];
                //add frames when it scans the elements, then orders them
                while (left.length > 0 && right.length > 0) s.push(left[0] < right[0] ? left.shift() : right.shift());
                s = s.concat(left).concat(right);
                b.splice(i, 0, []);
                for (let j = 0; j < s.length; j++) {
                    b[i].push(s[j]);
                    b[i + 1].shift();
                    if (b[i + 1].length === 0) b.splice(i + 1, 1);
                    l.push(_.cloneDeep(b));
                }
                l.push(_.cloneDeep(b));
            }
        }
    }

    for (let i of l) {
        if (i.flat().length !== a.length) console.log(JSON.stringify(i));
        else frames.push([[]].concat(i.flat()));
    }
    frames = l.slice(1).map(b => [[]].concat(b.flat()));
}


function heapify(a, l, i) {
    let largest = i;
    let left = i * 2 + 1;
    let right = left + 1;

    if (left < l && a[left] > a[largest]) largest = left;
    if (right < l && a[right] > a[largest]) largest = right;
    if (largest != i) {
        [a[i], a[largest]] = [a[largest], a[i]];
        heapify(a, l, largest);
    }
}

function HeapSort(a) {
    let { length } = a;
    let i = Math.floor(length / 2 - 1);
    let k = length - 1;

    while (i >= 0) {
        heapify(a, length, i);
        i--;
    }

    while (k >= 0) {
        [a[0], a[k]] = [a[k], a[0]];
        heapify(a, k, 0);
        k--;
    }
    return a;
}