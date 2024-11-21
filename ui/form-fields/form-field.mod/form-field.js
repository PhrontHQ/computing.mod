const { Component } = require("mod/ui/component");

/**
 * @class FormField
 * @extends Component
 * @description Base component for form fields
 */
exports.FormField = class FormField extends Component {
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
};
