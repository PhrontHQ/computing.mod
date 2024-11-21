const { TextFormField } = require("ui/form-fields/text-form-field.mod/text-form-field");

/**
 * @class PortFormField
 * @extends TextFormField
 * @description A text form field for port numbers.
 */
exports.PortFormField = class PortFormField extends TextFormField {
    static placeholder = "eg. 8080";

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

    // Override the FromField label to provide a default value
    get label() {
        return this._label ?? "Port";
    }

    // The placeholder text for the text form field
    get placeholder() {
        return this._placeholder ?? PortFormField.placeholder;
    }

    /**
     * @description Indicates whether the field is in loading state
     * @public
     * @type {boolean}
     */
    isLoading = false;

    /**
     * @description Indicates whether the form field is enabled
     * @public
     * @type {boolean}
     */
    isEnabled = true;
};
