const { NumberValidator } = require("./number-validator");

/**
 * Validates if a number is within a specified range (inclusive)
 * @class RangeValidator
 * @extends NumberValidator
 */
exports.RangeValidator = class RangeValidator extends NumberValidator {
    static defaultOptions = {
        allowNegative: true,
        allowDecimal: true
    };

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
     * @description Indicates if decimal numbers are allowed
     * @type {boolean}
     * @default true
     * @public
     */
    allowDecimal = true;

    /**
     * @param {number} [min=0] - Minimum value (inclusive)
     * @param {number} [max=100] - Maximum value (inclusive)
     * @param {Object} [options] - Options
     * @param {boolean} [options.allowNegative=true] - Indicates if negative numbers are allowed
     * @param {boolean} [options.allowDecimal=true] - Indicates if decimal numbers are allowed
     */
    constructor(min = 0, max = 100, options = RangeValidator.defaultOptions) {
        super();

        if (options) {
            const mergedOptions = { ...RangeValidator.defaultOptions, ...options };
            this.allowNegative = mergedOptions.allowNegative;
            this.allowDecimal = mergedOptions.allowDecimal;
        }

        if (min > max) {
            throw new Error("Minimum value cannot be greater than maximum value");
        }

        this.min = min;
        this.max = max;
    }

    validate(value) {
        // First validate as a number
        super.validate(value);

        const num = typeof value === "string" ? Number(value) : value;

        // then validate range
        if (num < this.min || num > this.max) {
            throw new Error(`Value must be between ${this.min} and ${this.max} (inclusive)`);
        }

        return true;
    }
};
