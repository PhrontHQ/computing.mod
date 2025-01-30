const { Validator } = require("mod/core/converter/converter");

/**
 * Validates a numeric value (integer or decimal)
 * @class NumberValidator
 * @extends Validator
 *
 * FIXME: this validator should probably be the default one within Mod.
 *
 * The current Mod implementation is not ideal because when the `allowFloat` is
 * set to `false` it will still allow decimal numbers. It will parse it as an
 * Integer, but it should throw an error instead.
 */
exports.NumberValidator = class NumberValidator extends Validator {
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
     * @param {boolean} [allowDecimal=true] - Indicates if decimal numbers are allowed
     * @param {boolean} [allowNegative=true] - Indicates if negative numbers are allowed
     */
    constructor(allowDecimal = true, allowNegative = true) {
        super();

        this.allowNegative = allowNegative;
        this.allowDecimal = allowDecimal;
    }

    validate(value) {
        // Handle null/undefined values
        if (value == null || value === undefined) {
            throw new Error("Value cannot be null or undefined");
        }

        const isString = typeof value === "string";

        // Check string format first
        // Allow decimal numbers but validate proper format
        if (isString && !/^-?\d*\.?\d+$/.test(value)) {
            throw new Error("Invalid number format");
        }

        // Convert to number if value is a string
        const num = isString ? Number(value) : value;

        // Check if it's a number
        if (typeof num !== "number") {
            throw new Error("Value must be a number or numeric string");
        }

        // Check for NaN and Infinity
        if (!Number.isFinite(num)) {
            throw new Error("Value must be a finite number");
        }

        // Check for negative numbers if not allowed
        if (!this.allowNegative && num < 0) {
            throw new Error("Negative numbers are not allowed");
        }

        // Check for decimal numbers if not allowed
        if (!this.allowDecimal && !Number.isSafeInteger(num)) {
            throw new Error("Value must be an integer");
        }

        return true;
    }
};
