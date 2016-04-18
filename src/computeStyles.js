'use strict'

var fixture = document.querySelector('.fixture');
computeStyles(fixture);


function computeStyles(node, styleElRules) {

    if(!node) { return }

    let styleEls = document.querySelectorAll('style'),
        cssSheets,
        cssRules,
        stylesRules;

    styleElRules = styleElRules || {};

    [].forEach.call(styleEls, (sheet) => {
        stylesRules = sheet.innerHTML
            .match(/{(.*?)}/g)[0]
            .replace(/ /g,'')
            .replace(/[:;{}]/g, ' ')
            .trim().split(' ');

        stylesRules = stylesRules.filter((prop) => prop !== '!important');

        for(let i = 0; i < stylesRules.length; i += 2) {
            styleElRules[stylesRules[i]] = true;
        }
    });

    try{
        cssRules = [].map.call(document.styleSheets, (sheet)=>{
            return [].map.call(sheet.cssRules,(rule) => rule.cssText );
        })
        .reduce((obj, piece) => {
            var piece = piece.map((rule)=>{
                return rule.match(/{(.*?)}/g)[0]
                    .replace(/ /g,'')
                    .replace(/[:;{}]/g, ' ')
                    .trim().split(' ')
                })[0];
            piece = piece.filter((item)=>item!=='!important');

            for(let i = 0; i < piece.length; i+=2){
                obj[piece[i]]=true;
            }

            return obj;
        },{});

    }catch(e){
        console.log('you got an error');
        console.log(e);
    }

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









