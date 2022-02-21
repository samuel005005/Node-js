const { response } = require("express");

const capitalizeWords = (string) => {
    return string.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};


module.exports = {
    capitalizeWords
}