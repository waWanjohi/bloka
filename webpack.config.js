const path = require('path');

module.exports = {
    entry: 'bloka.js',
    outputs: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'bloka.js',
    },
};