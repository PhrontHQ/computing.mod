const { FormField } = require("ui/form-fields/form-field.mod/form-field");

/**
 * @class TextareaFormField
 * @extends FormField
 * @description Multi-line textarea field component
 */
exports.TextareaFormField = class TextareaFormField extends FormField {
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
     * @description The placeholder text for the textarea form field
     * @public
     * @type {string}
     */
    placeholder = "";

    /**
     * @description The number of rows for the textarea
     * @public
     * @type {number}
     * @default 4
     */
    rows = 4;

    /**
     * @description The number of columns for the textarea
     * @public
     * @type {number}
     */
    cols = null;

    /** @protected */
    _value = null;

    /**
     * @description The value of the textarea form field
     * @public
     * @type {string}
     */
    get value() {
        return this._value;
    }

    set value(newValue) {
        if (newValue !== this.value) {
            this._value = newValue;
            this._checkValidity();
        }
    }

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

    /** @protected */
    handleAction() {
        // Mark as touched on user interaction
        this._isTouched = true;
        this._checkValidity();
    }
};
