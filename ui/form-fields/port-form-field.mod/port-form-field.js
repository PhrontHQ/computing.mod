const { RangeFormField } = require("ui/form-fields/range-form-field.mod/range-form-field");

/**
 * @class PortFormField
 * @extends TextFormField
 * @description A text form field for port numbers.
 */
exports.PortFormField = class PortFormField extends RangeFormField {
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
     * @description The label of the form field
     * @public
     * @type {string}
     */
    label = "Port";

    /**
     * @description The placeholder text for the text form field
     * @public
     * @type {string}
     */
    placeholder = "eg. 8080";

    /**
     * @description Minimum port number value (inclusive)
     * @public
     * @type {number}
     * @default 0
     */
    min = 0;

    /**
     * @description Maximum port number value (inclusive)
     * @public
     * @type {number}
     * @default 65535
     */
    max = 65535;

    /**
     * @description Optional validator for the form field
     * @public
     */
    validator = null;

    /**
     * @description Validation state
     * @public
     * @type {boolean}
     * @default true
     */
    isValid = true;

    /**
     * @description Validation message
     * @protected
     * @type {string}
     */
    validationMessage = null;
};
