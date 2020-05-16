
if (process.env.NODE_ENV === 'development') {
    module.exports  = {
        api_url: 'http://localhost:5000/api/'
    }
} else {
    module.exports  = {
        baseUrl: 'https://multichannel.alpibo.com/api/'
    }
}
