import { swap } from "./Utility";

export function getBubbleSortAnimations(arr){
    var i, j;
    var copy = [...arr]
    let n = copy.length;
    const animations = []
    console.log(copy);
    
    let checked;
    do {
        checked = false;
        for (let i = 0; i < n; i++) {
            animations.push([[i,i+1], false])
            if (copy[i] > copy[i + 1]) {
                animations.push([[i, copy[i + 1]], true]);
                animations.push([[i + 1, copy[i]], true]);
                swap(copy, i,i+1);
                checked = true;
            }
        }
    } while (checked);
    console.log(copy);

    return animations;
}