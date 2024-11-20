const {
    TextFormField,
} = require("ui/form-fields/text-form-field.mod/text-form-field");

/**
 * @class PortFormField
 * @extends TextFormField
 * @description A text form field for port numbers.
 */
exports.PortFormField = class PortFormField extends TextFormField {
    static placeholder = "eg. 8080";

    constructor() {
        super();
        this._min = 0;
        this._max = 65535;
    }

    // Public API

    // The minimum port number
    get min() {
        return this._min;
    }

    set min(value) {
        this._min = value;
    }

    // The maximum port number
    get max() {
        return this._max;
    }

    set max(value) {
        this._max = value;
    }

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
