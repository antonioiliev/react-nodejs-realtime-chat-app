module.exports = {
    entry: './index.js',
    target: 'node',
    node: {
        fs: 'empty',
        net: 'empty'
    }
};

