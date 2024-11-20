const { FormField } = require("ui/form-fields/form-field.mod/form-field");

/**
 * @class TextFormField
 * @extends FormField
 * @description Basic text field component
 */
exports.TextFormField = class TextFormField extends FormField {
    /**
     * @description Track if user has interacted with the form field
     * @private
     * @type {boolean}
     */
    #isTouched = false;

    /**
     * @description Track validation state
     * @private
     * @type {boolean}
     */
    #previousValidity = true;

    /**
     * @description Track previous validation message
     * @private
     * @type {string}
     */
    #previousValidationMessage = "";

    /**
     * @description The input element
     * @protected
     * @type {HTMLInputElement}
     */
    _input = null;

    /** @protected */
    _value = null;

    /**
     * @description Indicates whether the field is in loading state
     * @public
     * @type {boolean}
     */
    isLoading = false;

    /** @protected */
    _placeholder = null;

    /**
     * @description The placeholder text for the text form field
     * @public
     * @type {string}
     */
    get placeholder() {
        return this._placeholder ?? "";
    }

    set placeholder(value) {
        this._placeholder = value;
    }

    /**
     * @description The value of the text form field
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
     * @description Indicates whether the form field is enabled
     * @public
     * @type {boolean}
     */
    isEnabled = true;

    /** @protected */
    handleAction() {
        // Mark as touched on user interaction
        this.#isTouched = true;
        this._checkValidity();
    }

    /** @protected */
    _checkValidity() {
        if (!this._input) return;

        // Reset any custom validity
        this._input.setCustomValidity("");

        // Skip validation if not touched and empty
        if (!this.#isTouched && !this.value) return;

        // Check if the field is required
        if (this.isRequired && !this.value) {
            this._input.setCustomValidity("This field is required");
        }

        // Validate the value if present and a validator is provided
        if (this.value) {
            try {
                this.validator?.validate?.(this.value);
            } catch (e) {
                this._input.setCustomValidity(e.message);
            }
        }

        const currentValidity = this._input.checkValidity();
        const currentMessage = this._input.validationMessage;

        this.#dispatchValidityChange(currentValidity, currentMessage);
    }

    #dispatchValidityChange(currentValidity, currentMessage) {
        if (
            this.#previousValidationMessage !== currentMessage ||
            this.#previousValidity !== currentValidity
        ) {
            this.dispatchEventNamed("validityChange", true, true, {
                validationMessage: currentMessage,
                validity: this._input.validity,
                isValid: currentValidity,
                value: this.value,
            });

            this.#previousValidationMessage = currentMessage;
            this.#previousValidity = currentValidity;
        }
    }
};
