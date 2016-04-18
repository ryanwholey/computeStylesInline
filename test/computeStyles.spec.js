import computeStyles from './../src/computeStyles';

'use strict';

let fixture,
    style,
    child;

beforeEach(() => {
    fixture = document.createElement('div');
    fixture.className += 'fixture';
    fixture.innerHTML = 'i am fixture';
    document.body.appendChild(fixture);
});

afterEach(() => {
    document.body.removeChild(fixture);
});

describe('spec environment', () => {

    it('should have a working specrunner', () => {
        expect(true).toEqual(true);
    });

    it('should only have one fixture el', () => {
        expect(document.querySelectorAll('.fixture').length).toEqual(1);
    });
});

describe('computeStyles', () => {

    describe('On init and no style', () => {

        it('should be defined', () => {
            expect(computeStyles).toBeDefined();
            expect(!!computeStyles(fixture)).toEqual(true);
        });

        it('should return unmutated element if no style sheets touch it', () => {
            let html = '<div class="fixture">i am fixture</div>'
            expect(computeStyles(fixture)).toBe(html);
        });
    });

    describe('On inline styles', () => {

        beforeEach(() => fixture.style.background = 'red');

        afterEach(() => fixture.style.background = '');

        it('should return html with inline styles untouched', () => {
            let html = `<div class="fixture" style="background: red;">i am fixture</div>`
            expect(computeStyles(fixture)).toBe(html);
        });

        it('should return html with multiple inline styles untouched', () => {
            let html =  `<div class="fixture" style="color: green; background: red;">i am fixture</div>`
            fixture.style.color = 'green';
            expect(computeStyles(fixture)).toBe(html);
        });
    });

    describe('With style sheet', () => {

        beforeEach(() => {
            style = document.createElement('style');
        });

        afterEach(() => {
            try{document.body.removeChild(style);}catch(e){}
        });

        it('Should add one style sheet to inline styles', () => {
            style.innerHTML = '.fixture{color:red}';
            document.body.appendChild(style);
            let html =  `<div class="fixture" style="color: rgb(255, 0, 0);">i am fixture</div>`;
            expect(computeStyles(fixture)).toBe(html);
        });

        it('Should add all styles from single sheet to inline styles', () => {
            style.innerHTML = '.fixture{display:inline;color:red;}';
            document.body.appendChild(style);
            let html =  `<div class="fixture" style="display: inline; color: rgb(255, 0, 0);">i am fixture</div>`;
            expect(computeStyles(fixture)).toBe(html);
        });

        it('Should keep recomputed styles the same (will recompute)', () => {
            fixture.style.color = "rgb(0, 0, 255)";
            style.innerHTML = '.fixture{color:red;}';
            document.body.appendChild(style);
            let html =  `<div class="fixture" style="color: rgb(0, 0, 255);">i am fixture</div>`;
            expect(computeStyles(fixture)).toBe(html);
        });
    });

    describe('child behavior', () => {

        beforeEach(() => {
            child = document.createElement('div');
            child.innerHTML = 'i am child';
            child.className += 'child';
            fixture.appendChild(child);
        });

        afterEach(() => {
            document.querySelector('.fixture').removeChild(child);
        });

        describe('no added styles', () => {

            it('should return child and parent unchanged if no added styles', () => {
                let html =  `<div class="fixture">i am fixture<div class="child">i am child</div></div>`;
                expect(computeStyles(fixture)).toBe(html);
            });
        });

        describe('added styles', () => {

            beforeEach(() => style = document.createElement('style'));

            afterEach(() => {
                try{ document.body.removeChild(style); }catch(e){}
            });

            it('should add styles to child', () => {
                style.innerHTML = `.child{color:red;}`
                document.body.appendChild(style);
                let html =  `<div class="fixture" style="color: rgb(0, 0, 0);">i am fixture<div class="child" style="color: rgb(255, 0, 0);">i am child</div></div>`;
                expect(computeStyles(fixture)).toBe(html);
            });
        });
    });

    describe('should add the most recent or important style to the el', () => {
        let style2;
        beforeEach(() => {
            style = document.createElement('style');
        });
        afterEach(() => {
            try{
                document.body.removeChild(style);
                document.body.removeChild(style2);
            }catch(e){}
        });

        it('should take the most recent style addition', () => {
            style.innerHTML = '.fixture{color:red}';
            document.body.appendChild(style);
            let style2 = document.createElement('style');
            style2.innerHTML = '.fixture{color:blue}';
            document.body.appendChild(style2);
            let html =  `<div class="fixture" style="color: rgb(0, 0, 255);">i am fixture</div>`;
            expect(computeStyles(fixture)).toBe(html);
        });

        it('should use the !important feature', () => {
            fixture.style.color = 'red';
            style.innerHTML = '.fixture{color : blue !important}';
            document.body.appendChild(style);
            let html =  `<div class="fixture" style="color: rgb(0, 0, 255);">i am fixture</div>`;
            expect(computeStyles(fixture)).toBe(html);
        });
    });
});

















