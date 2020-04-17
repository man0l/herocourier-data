
const fs = require('fs');

exports.readlines = (filepath) => {
    try {
        const data = fs.readFileSync(filepath, 'UTF-8');
        // split the contents by new line
        let lines = data.split(/\r?\n/);
        lines = lines.filter((line) => {
            return line.match(/http/)
        });
        return lines;
    } catch (err) {
        console.error(err);
    }
    return null;
};

