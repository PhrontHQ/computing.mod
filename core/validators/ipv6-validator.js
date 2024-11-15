const { Validator } = require("mod/core/converter/converter");
const { isValidIPv6 } = require("../helpers/ip-address-helper");

/**
 * Verifies that a string is a valid ipv6 address
 * @class Ipv6Validator
 * @extends Validator
 */
exports.Ipv6Validator = class Ipv6Validator extends Validator {
    validate(address) {
        if (isValidIPv6(address)) {
            return true;
        } else {
            throw new Error("IPv6 address is incorrect");
        }
    }
};
