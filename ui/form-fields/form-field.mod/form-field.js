const { Component } = require("mod/ui/component");

/**
 * @class FormField
 * @extends Component
 * @description Base component for form fields
 */
exports.FormField = class FormField extends Component {
    /** @protected */
    _label = null;

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
    get label() {
        let displayedLabel = this._label ?? "Field";

        if (this.isRequired) displayedLabel += " *";

        return displayedLabel;
    }

    set label(value) {
        this._label = value;
    }
};
