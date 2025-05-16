export const colors = {
    blue: 0x4040c0,
    red: 0xc04040,
    green: 0x40c040,
    yellow: 0xc0c040,
    purple: 0x8040c0,
    orange: 0xc08040,
    pink: 0xc04080,
    cyan: 0x40c0c0,
    white: 0xffffff,
    black: 0x000000
};

export function getRandomColor() {
    const colorKeys = Object.keys(colors);
    const randomKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
    return colors[randomKey];
}

export function colorToHexString(color) {
    // Ensure color is treated as a 24-bit integer
    console.log(color);
    
    return '#' + (color & 0xFFFFFF).toString(16).padStart(6, '0');
}