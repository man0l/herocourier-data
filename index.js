const Nick = require("nickjs");
const findChrome = require("chrome-finder");
const utils = require("./utils/utils");

let chromePath  = findChrome();
let seedUrlFile = './seed-urls.txt';

process.env.CHROME_PATH = chromePath;

const nick = new Nick()

;(async () => {

    let lines = utils.readlines(seedUrlFile);

    const tab = await nick.newTab()

    for(let i = 0; i < lines.length; i++)
    {
        await tab.open(lines[i]);
        await tab.untilVisible(".t-offers-overview");
        await tab.inject("http://code.jquery.com/jquery-3.2.1.min.js");

        const data = await tab.evaluate((arg, callback) => {
            const data = []
            /* eslint-disable */
            $(".o-overview-list__list-item").each((index, element) => {
                data.push({
                    title: $(element).find(".m-offer-tile__title").text().trim(),
                    subtitle: $(element).find(".m-offer-tile__subtitle").text().trim()
                })
            })
            /* eslint-enable */
            callback(null, data)
        });

        console.log(JSON.stringify(data, null, 2));
    }

})()
    .then(() => {
        console.log("Job done!")
        nick.exit()
    })
    .catch((err) => {
        console.log(`Something went wrong: ${err}`)
        nick.exit(1)
    })
