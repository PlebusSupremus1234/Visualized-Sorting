const parse = t => (t + "").split("\n").map(i => i.trim()).join(" ");
let descs = {
    bubble: {
        title: "Bubble Sort",
        desc: parse`Bubble sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the
        wrong order. The pass through the list is repeated until the list is sorted. This simple algorithm performs poorly in real world use and is used primarily
        as an educational tool.`
    },
    selection: {
        title: "Selection Sort",
        desc: parse`Selection sort is a sorting algorithm that selects the smallest element from an unsorted list in each iteration and places that element at the
        beginning of the unsorted list. In computer science, selection sort is an in-place comparison sorting algorithm. It has an O(n^2) time complexity, which
        makes it inefficient on large lists.`
    },
    insertion: {
        title: "Insertion Sort",
        desc: parse`Insertion sort is a simple sorting algorithm that builds the final sorted array one item at a time. It isn't very efficient on large lists
        but has several advantages which are that it is simple, adaptive, stable and in-place. At each iteration, insertion sort removes one element from the
        input data, finds its correct location in the sorted list and inserts it there.`
    },
    cocktail: {
        title: "Cocktail Shaker Sort",
        desc: parse`Cocktail shaker sort is a slight variation of bubble sort. It differs in that instead of repeatedly passing through the list from bottom to top,
        it passes alternately from bottom to top and then from top to bottom. It can achieve slightly better performance than a standard bubble sort.`
    },
    bucket: {
        title: "Bucket Sort",
        desc: parse`Bucket sort is a sorting algorithm that works by distributing the elements of an array into a number of buckets. Each bucket is then sorted
        individually. It is an example of Space-Time Tradeoff, where you can increase the space needed to reduce the time taken and vice versa. In this
        visualisation, there are A.length / 10 buckets, making the space complexity high, and time complexity low.`
    },
    merge: {
        title: "Merge Sort",
        desc: parse`Merge sort is a very efficient, general-purpose, and comparison-based sorting algorithm. Firstly, it divides the unsorted list into n sublists,
        each containing one element. Then repeatedly, merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the
        sorted list.`
    },
    quick: {
        title: "Quick Sort",
        desc: parse`Quicksort is a very efficient sorting algorithm that uses divide-and-conquer. It works by selecting a 'pivot' element from the array and
        partitioning all the elments that are smaller than it to the left, and greater to the right. This makes the algorithm quick because it means that you no
        longer have to compare any of the elements on the left to ones on the right.`
    }
};