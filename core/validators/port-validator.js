const { Validator } = require("mod/core/converter/converter");

const {
    IntegerRangeValidator,
} = require("core/converter/validator/integer-range-validator");

/**
 * Validates a single port number
 * @class PortValidator
 * @extends Validator
 */
exports.PortValidator = class PortValidator extends Validator {
    constructor(min = 0, max = 65535) {
        super();
        this._integerRangeValidator = new IntegerRangeValidator();
        this._integerRangeValidator.floor = min;
        this._integerRangeValidator.ceiling = max;
    }

    validate(port) {
        try {
            const portNumber =
                typeof port === "string" ? parseInt(port, 10) : port;

            if (isNaN(portNumber)) {
                throw new Error("Port must be a valid number");
            }

            this._integerRangeValidator.validate(portNumber);

            return true;
        } catch (error) {
            throw new Error(
                `Port must be an integer between ${this._integerRangeValidator.floor} and ${this._integerRangeValidator.ceiling}`
            );
        }
    }
};
