const classifier = require('./category');
const spellChecker = require('../dictionaryVI/checkSpell');

module.exports = (str) => {
    if (str === null || str === undefined){
        return null;
    }else{
        let string = str.toLowerCase();

        if (spellChecker(string)) {
            // console.log(classifier.categorize(string));
            return classifier.categorize(string);

        } else {
            console.log('*Wrong input type');
            return null;
        }
    }
};

