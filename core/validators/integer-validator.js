const { NumberValidator } = require("./number-validator");

/**
 * Validates a single integer
 * @class IntegerValidator
 * @extends NumberValidator
 */
exports.IntegerValidator = class IntegerValidator extends NumberValidator {
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
     * @param {boolean} [allowNegative=true] - Indicates if negative numbers are allowed
     */
    constructor(allowNegative = true) {
        super(false, allowNegative);
    }
};
