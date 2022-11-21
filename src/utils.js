export default function sortRestaurants(distances) {
    let results = [];
    let N = distances.length;
    //initialization
    for (let i = 0; i < N; i++) {
        results.push(i);
    }
    //bubble sort
    for (let i = N - 1; i >= 1; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (distances[j + 1] < distances[j]) {
                permute(distances, j, j + 1);
                permute(results, j, j + 1);
            }
        }
    }

    return results;

}

function permute(array, i, j) {
    let arrayi = array[i];
    array[i] = array[j];
    array[j] = arrayi;
}