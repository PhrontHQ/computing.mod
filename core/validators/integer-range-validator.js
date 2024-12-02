const { RangeValidator } = require("./range-validator");

/**
 * Validates if a number is an integer and within a specified range (inclusive)
 * @class IntegerRangeValidator
 * @extends RangeValidator
 */
exports.IntegerRangeValidator = class IntegerRangeValidator extends RangeValidator {
    /**
     * @description Minimum value (inclusive)
     * @type {number}
     * @default 0
     * @public
     */
    min = 0;

    /**
     * @description Maximum value (inclusive)
     * @type {number}
     * @default 100
     * @public
     */
    max = 100;

    /**
     * @description Indicates if negative numbers are allowed
     * @type {boolean}
     * @default true
     * @public
     */
    allowNegative = true;

    /**
     * @override Forbids decimal numbers
     */
    _allowDecimal = false;

    set allowDecimal(_) {
        this._allowDecimal = false;
    }

    get allowDecimal() {
        return this._allowDecimal;
    }

    /**
     * @param {number} [min=0] - Minimum value (inclusive)
     * @param {number} [max=100] - Maximum value (inclusive)
     */
    constructor(min, max) {
        // force allowDecimal to be false
        super(min, max, false);
    }
};
