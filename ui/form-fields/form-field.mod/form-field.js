const { Component } = require("mod/ui/component");

/**
 * @class FormField
 * @extends Component
 * @description Base component for form fields
 */
exports.FormField = class FormField extends Component {
    /**
     * @description Track if user has interacted with the form field
     * @private
     * @type {boolean}
     */
    _isTouched = false;

    /**
     * @description Track validation state
     * @protected
     * @type {boolean}
     */
    _previousValidity = true;

    /**
     * @description Track previous validation message
     * @protected
     * @type {string}
     */
    _previousValidationMessage = null;

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
    label = "Field";

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

    _clearValidity() {
        this._previousValidationMessage = null;
        this.validationMessage = null;
        this._previousValidity = true;
        this.isValid = true;
    }

    _setValidity(validity, message) {
        this.validationMessage = message;
        this.isValid = validity;
    }

    _checkValidity() {
        // Reset any custom validity
        this._setValidity(true, null);

        // Skip validation if not touched and empty
        if (!this._isTouched && !this.value) return;

        // Check if the field is required
        if (this.isRequired && !this.value) {
            this._setValidity(false, "This field is required");
        }

        // Validate the value if present and a validator is provided
        if (this.value) {
            try {
                this.validator?.validate?.(this.value);
            } catch (e) {
                this._setValidity(false, e.message ?? "Invalid value");
            }
        }

        console.log("isValid", this.isValid, this.validationMessage);

        this._dispatchValidityChange(this.isValid, this.validationMessage);
    }

    _dispatchValidityChange(currentValidity, currentMessage) {
        if (this._previousValidationMessage !== currentMessage || this._previousValidity !== currentValidity) {
            this.dispatchEventNamed("validityChange", true, true, {
                validationMessage: currentMessage,
                isValid: currentValidity,
                value: this.value
            });

            this._previousValidationMessage = currentMessage;
            this._previousValidity = currentValidity;
        }
    }
};
