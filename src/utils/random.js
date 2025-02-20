export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
export function getRandomElement(array) {
    return array[getRandomInt(0, array.length - 1)];
}
export function getRandomBool() {
    return Math.random() > 0.5;
}

