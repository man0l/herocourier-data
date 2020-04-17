# Hero Courier Data Provider
## build and run docker
`docker build -t herocourier .`

`docker run herocourier node index.js`

## windows run
`npm run start`

Nick.js runs child process and it is looking for env variable process.env.CHROME_PATH. I use chrome-finder library to find the path to chrome.

```javascript
 const findChrome = require("chrome-finder");
 let chromePath  = findChrome();
 
 process.env.CHROME_PATH = chromePath;
```
