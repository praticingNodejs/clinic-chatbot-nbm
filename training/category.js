const dataset = require('./dataset');
const bayes = require('bayes');
const classifier = bayes();
const spellChecker = require('../dictionaryVI/checkSpell');

const learn = (data) => {
        for(let i = 0; i < data.length; i++) {
            classifier.learn(data[i].text, data[i].category)
        }
};

learn(dataset);

let str = 'Tôi muốn hủy lịch khám bệnh ngày mai nữa'.trim().toLowerCase();

if(spellChecker(str)) {
    console.log(classifier.categorize(str))
} else {
    console.log('*Wrong input type')
}

module.exports = classifier;
