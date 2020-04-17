'use strict';

const Nick = require("nickjs");
const utils = require("./utils/utils");

const nick = new Nick({
    userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36",
});

let seedUrlFile = './seed-urls.txt';

(async () => {

    let lines = utils.readlines(seedUrlFile);
    lines.forEach(async (line) => {
        const tab = await nick.newTab();
        tab.open(line);
        tab.close();
    });
})()
    .then(() => {
        console.log('job done');
        nick.exit();
    })
    .catch((err) => {
        console.log(`something went wrong: ${err}`);
        nick.exit();
    });
