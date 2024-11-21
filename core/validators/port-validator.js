const { IntegerRangeValidator } = require("core/validators/integer-range-validator");

/**
 * Validates a single port number
 * @class PortValidator
 * @extends Validator
 */
exports.PortValidator = class PortValidator extends IntegerRangeValidator {
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
     * @default 65535
     * @public
     */
    max = 65535;

    constructor(min = 0, max = 65535) {
        super(min, max);
    }
};
