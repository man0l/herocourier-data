
const fs = require('fs');

exports.readlines = (filepath) => {
    try {
        const data = fs.readFileSync(filepath, 'UTF-8');
        // split the contents by new line
        const lines = data.split(/\r?\n/);
        return lines;
    } catch (err) {
        console.error(err);
    }
    return null;
};

