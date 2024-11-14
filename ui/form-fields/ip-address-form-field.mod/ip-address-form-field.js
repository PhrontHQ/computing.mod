const { Ipv4Validator } = require("core/validators/ipv4-validator");
const { Ipv6Validator } = require("core/validators/ipv6-validator");

const {
    TextFormField,
} = require("ui/form-fields/text-form-field.mod/text-form-field");

// Supported IP address types
const IpAddressType = {
    IPv4: "IPv4",
    IPv6: "IPv6",
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
        [IpAddressType.IPv6]: "eg. 2001:db8::1",
    };

    static validators = {
        [IpAddressType.IPv4]: new Ipv4Validator(),
        [IpAddressType.IPv6]: new Ipv6Validator(),
    };

    // The validator to use for the input field
    get validator() {
        return IpAddressFormField.validators[this.type];
    }

    // The type of IP address to accept (IPv4 or IPv6)
    #type = IpAddressType.IPv4;

    // Public API

    // Override the FromField label to provide a default value
    get label() {
        return this._label ?? "IP Address";
    }

    get type() {
        return this.#type;
    }

    set type(value) {
        // Ensure the value is a valid IP address type
        if (!Object.values(IpAddressType).includes(value)) {
            const validTypes = Object.values(IpAddressType).join(", ");

            throw new Error(
                `Invalid IP address type. Must be one of: ${validTypes}`
            );
        }

        this.#type = value;
    }

    get placeholder() {
        return this._placeholder ?? IpAddressFormField.placeholders[this.type];
    }
};
