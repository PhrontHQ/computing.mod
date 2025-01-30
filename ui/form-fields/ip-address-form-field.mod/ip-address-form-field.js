const { TextFormField } = require("ui/form-fields/text-form-field.mod/text-form-field");
const { Ipv4Validator } = require("core/validators/ipv4-validator");
const { Ipv6Validator } = require("core/validators/ipv6-validator");

// Supported IP address types
const IpAddressType = {
    IPv4: "IPv4",
    IPv6: "IPv6"
};

Object.freeze(IpAddressType);

/**
 * @class IpAddressFormField
 * @extends TextFormField
 * @description A text form field for IP addresses.
 * It supports both IPv4 and IPv6 addresses.
 */
exports.IpAddressFormField = class IpAddressFormField extends TextFormField {
    static placeholders = {
        [IpAddressType.IPv4]: "eg. 192.168.1.1",
        [IpAddressType.IPv6]: "eg. 2001:db8::1"
    };

    static validators = {
        [IpAddressType.IPv4]: new Ipv4Validator(),
        [IpAddressType.IPv6]: new Ipv6Validator()
    };

    constructor() {
        super();

        // Initialize the form field with IPv4 type
        this.type = IpAddressType.IPv4;
        this.placeholder = IpAddressFormField.placeholders[this.type];
        this.validator = IpAddressFormField.validators[this.type];
    }

    // The validator to use for the input field
    get validator() {
        return IpAddressFormField.validators[this.type];
    }

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
    label = "IP Address";

    /**
     * @description The placeholder text for the text form field
     * @public
     * @type {string}
     */
    get placeholder() {
        return this._placeholder;
    }

    set placeholder(value) {
        this._placeholder = value ?? IpAddressFormField.placeholders[this.type];
    }

    /** @protected */
    _type = null;

    /**
     * @description The type of IP address to accept (IPv4 or IPv6)
     * @public
     * @type {string}
     */
    get type() {
        return this._type ?? IpAddressType.IPv4;
    }

    set type(value) {
        // Ensure the value is a valid IP address type
        if (!Object.values(IpAddressType).includes(value)) {
            const validTypes = Object.values(IpAddressType).join(", ");

            throw new Error(`Invalid IP address type. Must be one of: ${validTypes}`);
        }

        this._type = value;
        this.placeholder = IpAddressFormField.placeholders[value];
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
};
