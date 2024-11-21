const { TextFormField } = require("ui/form-fields/text-form-field.mod/text-form-field");

/**
 * @class RangeFormField
 * @extends TextFormField
 * @description A text form field for numeric ranges.
 */
exports.RangeFormField = class RangeFormField extends TextFormField {
    /**
     * @description Indicates whether the form field is enabled
     * @public
     * @type {boolean}
     */
    isEnabled = true;

    /**
     * @description Indicates whether the form field is mandatory
     * @public
     * @type {boolean}
     */
    isRequired = false;

    /**
     * @description Indicates whether the field is in loading state
     * @public
     * @type {boolean}
     */
    isLoading = false;

    /**
     * @description The placeholder text for the text form field
     * @public
     * @type {string}
     */
    placeholder = "";

    /**
     * @description Minimum value (inclusive)
     * @public
     * @type {number}
     * @default 0
     */
    min = 0;

    /**
     * @description Maximum value (inclusive)
     * @public
     * @type {number}
     * @default 100
     */
    max = 100;

    /**
     * @description Allow decimal numbers
     * @public
     * @type {boolean}
     * @default true
     */
    allowDecimal = true;
};
