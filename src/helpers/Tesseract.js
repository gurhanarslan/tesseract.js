const Tesseract = require('tesseract.js');
function GetImageText(uri) {
    return Tesseract.recognize(
        `http://127.0.0.1:3001/images/${uri}`,
        'eng',
        { logger: m => console.log('logger') }
    ).then(({ data: { text } }) => {
        console.log(text);
        return text
    })
}
module.exports = GetImageText