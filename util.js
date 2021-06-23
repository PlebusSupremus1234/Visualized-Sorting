function init({ type, newA, length, initialA }) {
    if (newA) {
        let l = length ? length : array.length;
        sorted = [];
        for (let i = 0; i < l; i++) sorted.push(i + 1);
        array = sorted.slice();
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        initial = array.slice();
        spacing = (height - 80) / l;
    } else {
        if (initialA) array = initial.slice();
    }
    sort = type;
    done = false;
    comparisons = 0;
    t = Date.now();
    if (!paused) toggle(1);
    frames = [];
    i = 0;
    if (sort === "bubble") {
        i = array.length - 1;
        j = 0;
    } else if (type === "selection") {
        j = i + 1;
        m = i;
    } else if (type === "insertion") {
        i = 1;
        j = 0;
    } else if (type === "heap") {
        heapSort(array.slice());
    } else if (type === "merge") {
        m = array.slice().map(a => [a]);
        j = 0;
    } else if (type === "quick") {
        j = [[0, array.length - 1]];
    }
}

function isEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    for (let c = 0; c < a.length; c++) {
        if (a[c] !== b[c]) return false;
    }
    return true;
}

const buildMaxHeap = (arr) => {
    // Get index of the middle element
    let i = Math.floor(arr.length / 2 - 1);
  
    // Build a max heap out of
    // All array elements passed in
    while (i >= 0) {
      heapify(arr, i, arr.length);
      i -= 1;
    }
  }
  
  const heapify = (heap, i, max) => {
    let index;
    let leftChild;
    let rightChild;
  
    while (i < max) {
      index = i;
  
      // Get the left child index 
      // Using the known formula
      leftChild = 2 * i + 1;
      
      // Get the right child index 
      // Using the known formula
      rightChild = leftChild + 1;
  
      // If the left child is not last element 
      // And its value is bigger
      if (leftChild < max && heap[leftChild] > heap[index]) {
        index = leftChild;
      }
  
      // If the right child is not last element 
      // And its value is bigger
      if (rightChild < max && heap[rightChild] > heap[index]) {
        index = rightChild;
      }
  
      // If none of the above conditions is true
      // Just return
      if (index === i) {
        return;
      }
  
      // Else swap elements
      swap(heap, i, index);
  
      // Continue by using the swapped index
      i = index;
    }
  }
  
  const swap = (arr, firstItemIndex, lastItemIndex) => {
    const temp = arr[firstItemIndex];
  
    // Swap first and last items in the array
    arr[firstItemIndex] = arr[lastItemIndex];
    arr[lastItemIndex] = temp;
  }
  
  const heapSort = (arr) => {
    // Build max heap
    buildMaxHeap(arr);
  
    // Get the index of the last element
    lastElement = arr.length - 1;
  
    // Continue heap sorting until we have
    // One element left
    while (lastElement > 0) {
      swap(arr, 0, lastElement);
      heapify(arr, 0, lastElement);
      lastElement -= 1;
      frames.push(arr.slice());
    }
    
    // Return sorted array
    return arr;
  }