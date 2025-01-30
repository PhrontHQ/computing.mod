const { FormField } = require("ui/form-fields/form-field.mod/form-field");

/**
 * @class SelectFormField
 * @extends FormField
 * @description Select dropdown field component
 */
exports.SelectFormField = class SelectFormField extends FormField {
    /**
     * @description The dropdown element (managed by Frb)
     * @protected
     * @type {Dropdown}
     */
    _dropdown = null;

    /**
     * @description The selected option (managed by Frb)
     * @protected
     * @type {object}
     */
    _selection = null;

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
     * @description Placeholder text to show when no option is selected
     * @public
     * @type {string}
     */
    placeholder = "Select an option";

    /**
     * @description The currently selected value
     * @public
     */
    value = null;

    /**
     * @description The options to display in the dropdown
     * @public
     * @type {Array<object>}
     * @default []
     * @example
     * [
     *    { label: "Option 1", value: "option1" },
     *    { label: "Option 2", value: "option2" },
     *    { label: "Option 3", value: "option3" },
     * ]
     */
    _options = [];

    get options() {
        return this._options;
    }

    set options(value) {
        if (value?.length) {
            // FIXME: This should be only check in development mode
            // Not sure how to do deal with that within Mod.
            console.assert("value" in value[0], "Select option must have a value property");
        }

        this._options = value;
        this._buildOptions();
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

    enterDocument(isFirstTime) {
        if (isFirstTime) {
            this.addPathChangeListener("_optionsController.selection.0", this, "handleSelectionChange");
        }
    }

    handleVisibilityChange({ detail }) {
        if (!detail.isVisible) {
            this._checkValidity();
        }
    }

    /** @protected */
    handleAction() {
        // Mark as touched on user interaction
        this._isTouched = true;
        this._toggleDropdown();
    }

    handleSelectionChange(option) {
        if (this._dropdown.isShown) {
            this.value = option?.value;
            this.dispatchEventNamed("change", true, true, { value: this.value });
            this._dropdown.hide();
        }
    }

    _toggleDropdown() {
        if (!this._dropdown.isShown) {
            this._dropdown.show();
        } else {
            this._dropdown.hide();
        }
    }

    _buildOptions() {
        const options = this.options || [];

        this._displayedOptions = options.map((option, index) => {
            return {
                ...option,
                label: option.value ?? option.label,
                value: option.value,
                index: index
            };
        });
    }
};
