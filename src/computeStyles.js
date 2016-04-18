'use strict'

function computeStyles(node, styleElRules) {

    if(!node) { return }

    let styleEls = document.querySelectorAll('style'),
        rulesArr;

    styleElRules = styleElRules || {};

    [].forEach.call(styleEls, (sheet) => {
        rulesArr = sheet.innerHTML
            .match(/{(.*?)}/g)[0]
            .replace(/ /g,'')
            .replace(/[:;{}]/g, ' ')
            .trim().split(' ');

        rulesArr = rulesArr.filter((prop) => prop !== '!important');

        for(let i = 0; i < rulesArr.length; i += 2) {
            styleElRules[rulesArr[i]] = true;
        }
    });

    [].forEach.call(node.children, (child) => computeStyles(child));

    for(let prop in styleElRules) {
        node.style[prop] = getComputedStyle(node)[prop]
    }
    return node.outerHTML;
}

function getInline() {
    let inlineRaw = {};
     if(node.getAttribute('style')) {
        inlineRaw = node.getAttribute('style')
            .replace(/ /g,'')
            .replace(/[:;]/g, ' ')
            .split(' ');
    }
    return inlineRaw;
}


export default computeStyles;









