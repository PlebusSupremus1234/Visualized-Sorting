function QuickSort(a, low, high, continuous) {
    if (low < high) {
        let pivot = a[high];
        let b = low - 1;
        for (let j = low; j < high; j++) {
            if (a[j] < pivot) {
                frames.push([[1, low, j, high]].concat(a));
                b++;
                [a[b], a[j]] = [a[j], a[b]];
                frames.push([[1, low, j, high]].concat(a));
            }
        }
        frames.push([[0, low, b, high]].concat(a));
        b++;
        [a[high], a[b]] = [a[b], a[high]];
        frames.push([[0, low, b, high]].concat(a));
        if (continuous) {
            QuickSort(a, low, b - 1, true);
            QuickSort(a, b + 1, high, true);
        } else return [[low, b - 1], [b + 1, high]];
    }
}