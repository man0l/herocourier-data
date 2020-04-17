const Nick = require("nickjs");
const findChrome = require("chrome-finder");
const utils = require("./utils/utils");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


let chromePath  = findChrome();
let seedUrlFile = './seed-urls2.txt';

process.env.CHROME_PATH = chromePath;

const nick = new Nick();
const csvWriter = createCsvWriter({
    path: 'data2.csv',
    header: [
        {id: 'title', title: 'Title'},
        {id: 'subtitle', title: 'Subtitle'},
        {id: 'image', title: 'Image'},
        {id: 'quantity', title: 'Quantity'},
        {id: 'basicPrice', title: 'Basic Price'},
        {id: 'percentDiscount', title: 'Percent Discount'},
        {id: 'oldPrice', title: 'Old Price'},
        {id: 'price', title: 'Price'},
    ]
});


;(async () => {

    let lines = utils.readlines(seedUrlFile);

    const tab = await nick.newTab()
    let csvData = [];
    for(let i = 0; i < lines.length; i++)
    {
        await tab.open(lines[i]);
        await tab.untilVisible(".js-product-list");
        await tab.inject("http://code.jquery.com/jquery-3.2.1.min.js");

        const data = await tab.evaluate((arg, callback) => {
            const data = []
            /* eslint-disable */
            $("._product").each((index, element) => {
                data.push({
                    title: $(element).find("._product-name-tag a").text().trim(),
                    image: $(element).find("._product-image-thumb-holder img").attr('src'),
                    price: $(element).find("._product-price-inner span").text().trim(),
                    availability:  $(element).find("._product-ribbon _product-ribbon-custom").text().trim() == "Няма наличност",
                    category: $(document).find("title").text()
                });
            })
            /* eslint-enable */
            callback(null, data)
        });

        csvData = [...data];
        csvWriter
            .writeRecords(data)
            .then(()=> console.log('The CSV file was written successfully'));

    }

    console.log(JSON.stringify(csvData, null, 2));

})()
    .then(() => {
        console.log("Job done!")
        nick.exit()
    })
    .catch((err) => {
        console.log(`Something went wrong: ${err}`)
        nick.exit(1)
    })
