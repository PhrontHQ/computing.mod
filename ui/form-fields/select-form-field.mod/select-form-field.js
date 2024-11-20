const { FormField } = require("ui/form-fields/form-field.mod/form-field");

/**
 * @class SelectFormField
 * @extends FormField
 * @description Select dropdown field component
 */
exports.SelectFormField = class SelectFormField extends FormField {
    /**
     * @description Track if user has interacted with the form field
     * @private
     * @type {boolean}
     */
    #isTouched = false;

    /**
     * @description The select element  (managed by Frb)
     * @protected
     * @type {Button}
     */
    _select = null;

    /**
     * @description The dropdown element (managed by Frb)
     * @protected
     * @type {Dropdown}
     */
    _dropdown = null;

    /**
     * @description The selected option (managed by Frb)
     * @public
     * @type {object}
     */
    selection = null;

    /**
     * @description Indicates whether the field is in loading state
     * @public
     * @type {boolean}
     */
    isLoading = false;

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
    #options = [];

    get options() {
        return this.#options;
    }

    set options(value) {
        if (value?.length) {
            // FIXME: This should be check only in development mode
            // Not sure how to do that with Mod.
            console.assert(
                "value" in value[0],
                "Select option must have a value property"
            );
        }

        this.#options = value;
    }

    /**
     * @description Placeholder text to show when no option is selected
     * @public
     * @type {string}
     */
    placeholder = "Select an option";

    enterDocument(isFirstTime) {
        if (isFirstTime) {
            this.addPathChangeListener(
                "selection",
                this,
                "handleSelectionChange"
            );
        }
    }

    /** @protected */
    handleAction() {
        this.#isTouched = true;
        this.#toggleDropdown();
    }

    handleSelectionChange(_) {
        if (this._dropdown.isShown) {
            this._dropdown.hide();
        }
    }

    #toggleDropdown() {
        if (!this._dropdown.isShown) {
            this.#buildOptionsIfNeeded();
            this._dropdown.show();
        } else {
            this._dropdown.hide();
        }
    }

    #buildOptionsIfNeeded() {
        if (this._displayedOptions) return;

        const options = this.options || [];

        this._displayedOptions = options.map((option, index) => {
            return {
                ...option,
                label: option.value ?? option.label,
                value: option.value,
                index: index,
            };
        });
    }
};
