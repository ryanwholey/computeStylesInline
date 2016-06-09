'use strict';

module.exports = function () {

    'use strict';

    // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.

    var defaultStylesByTagName = {};

    // Styles inherited from style sheets will not be rendered for elements with these tag names
    var noStyleTags = { 'BASE': true, 'HEAD': true, 'HTML': true, 'META': true, 'NOFRAME': true, 'NOSCRIPT': true, 'PARAM': true, 'SCRIPT': true, 'STYLE': true, 'TITLE': true };

    // This list determines which css default values lookup tables are precomputed at load time
    // Lookup tables for other tag names will be automatically built at runtime if needed
    var tagNames = ['A', 'ABBR', 'ADDRESS', 'AREA', 'ARTICLE', 'ASIDE', 'AUDIO', 'B', 'BASE', 'BDI', 'BDO', 'BLOCKQUOTE', 'BODY', 'BR', 'BUTTON', 'CANVAS', 'CAPTION', 'CENTER', 'CITE', 'CODE', 'COL', 'COLGROUP', 'COMMAND', 'DATALIST', 'DD', 'DEL', 'DETAILS', 'DFN', 'DIV', 'DL', 'DT', 'EM', 'EMBED', 'FIELDSET', 'FIGCAPTION', 'FIGURE', 'FONT', 'FOOTER', 'FORM', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'HEAD', 'HEADER', 'HGROUP', 'HR', 'HTML', 'I', 'IFRAME', 'IMG', 'INPUT', 'INS', 'KBD', 'LABEL', 'LEGEND', 'LI', 'LINK', 'MAP', 'MARK', 'MATH', 'MENU', 'META', 'METER', 'NAV', 'NOBR', 'NOSCRIPT', 'OBJECT', 'OL', 'OPTION', 'OPTGROUP', 'OUTPUT', 'P', 'PARAM', 'PRE', 'PROGRESS', 'Q', 'RP', 'RT', 'RUBY', 'S', 'SAMP', 'SCRIPT', 'SECTION', 'SELECT', 'SMALL', 'SOURCE', 'SPAN', 'STRONG', 'STYLE', 'SUB', 'SUMMARY', 'SUP', 'SVG', 'TABLE', 'TBODY', 'TD', 'TEXTAREA', 'TFOOT', 'TH', 'THEAD', 'TIME', 'TITLE', 'TR', 'TRACK', 'U', 'UL', 'VAR', 'VIDEO', 'WBR'];

    // Precompute the lookup tables.
    [].forEach.call(tagNames, function (name) {
        if (!noStyleTags[name]) {
            defaultStylesByTagName[name] = computeDefaultStyleByTagName(name);
        }
    });

    function computeDefaultStyleByTagName(tagName) {
        var defaultStyle = {},
            element = document.body.appendChild(document.createElement(tagName)),
            computedStyle = window.getComputedStyle(element);

        [].forEach.call(computedStyle, function (style) {
            defaultStyle[style] = computedStyle[style];
        });
        document.body.removeChild(element);
        return defaultStyle;
    }

    function getDefaultStyleByTagName(tagName) {
        tagName = tagName.toUpperCase();
        if (!defaultStylesByTagName[tagName]) {
            defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
        }
        return defaultStylesByTagName[tagName];
    };

    function serializeWithStyles(elem) {

        var cssTexts = [],
            elements = void 0,
            computedStyle = void 0,
            defaultStyle = void 0,
            result = void 0;

        if (!elem || elem.nodeType !== Node.ELEMENT_NODE) {
            console.error('Error: Object passed in to serializeWithSyles not of nodeType Node.ELEMENT_NODE');
            return;
        }
        cssTexts = [];
        elements = elem.querySelectorAll('*');

        [].forEach.call(elements, function (el, i) {
            if (!noStyleTags[el.tagName]) {
                computedStyle = window.getComputedStyle(el);
                defaultStyle = getDefaultStyleByTagName(el.tagName);
                cssTexts[i] = el.style.cssText;
                [].forEach.call(computedStyle, function (cssPropName) {
                    if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
                        el.style[cssPropName] = computedStyle[cssPropName];
                    }
                });
            }
        });

        result = elem.outerHTML;
        elements = [].map.call(elements, function (el, i) {
            el.style.cssText = cssTexts[i];
            return el;
        });

        return result;
    };

    return serializeWithStyles;
}();
