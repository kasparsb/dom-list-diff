function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getNewData() {

    let start = random(1, 10);
    let end = random(start+10, 30);

    let r = [];
    for (let i = start; i < end; i++) {
        r.push({id: i, text: i+' row '+(new Date()).getTime()})
    }

    return r
}

export default getNewData