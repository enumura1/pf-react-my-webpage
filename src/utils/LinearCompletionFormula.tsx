// 線形補完
const lerp = (x : number, y : number, a : number) => {
    return (1 - a) * x + a * y;
};

export default lerp;