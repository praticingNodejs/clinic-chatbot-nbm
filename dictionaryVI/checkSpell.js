let fs = require('fs');
let path = require('path');
let SpellChecker = require('hunspell-spellchecker');
let spellchecker = new SpellChecker();

module.exports = (string) => {
    const DICT = spellchecker.parse({
        aff: fs.readFileSync(path.resolve(__dirname, './index.aff')),
        dic: fs.readFileSync(path.resolve(__dirname, './index.dic'))
    });

    spellchecker.use(DICT);

    let resMessage = string.split(" ");

    for (let i = 0; i < resMessage.length; i++) {

        //syntax != number
        if (isNaN(resMessage[i])) {
            if (!spellchecker.check(resMessage[i])) {
                return false
            }
            if (i == resMessage.length - 1) {
                if (spellchecker.check(resMessage[i])) {
                    return true
                }
            }
        } else {
            if (i == resMessage.length - 1) {
                return true
            }
        }
    }
};