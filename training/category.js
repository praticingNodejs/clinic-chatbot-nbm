const dataset = require('./dataset');
const bayes = require('bayes');
const classifier = bayes();
const spellChecker = require('../dictionaryVI/checkSpell');

const learn = (data) => {
        for(let i = 0; i < data.length; i++) {
            classifier.learn(data[i].text, data[i].category)
        }
        console.log('learn')
};

learn(dataset);

module.exports = classifier;
