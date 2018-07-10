const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const testVal = false;
        expect(isRealString(testVal)).toBeFalsy();
    });
    it('should reject string with only spaces', () => {
        const testVal = '           ';
        expect(isRealString(testVal)).toBeFalsy();
    });
    it('should allow string with non-spaces chars', () => {
        const testVal = 'something weird';
        expect(isRealString(testVal)).toBeTruthy();
    });
});
