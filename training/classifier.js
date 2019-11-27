const classifier = require('./category');
const spellChecker = require('../dictionaryVI/checkSpell');

module.exports = (str) => {
    let string = str.toLowerCase();

    if (spellChecker(string)) {
        console.log(classifier.categorize(string));
        return classifier.categorize(string);

    } else {
        console.log('*Wrong input type');
        return null;
    }
};

