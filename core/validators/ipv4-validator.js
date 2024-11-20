const { Validator } = require("mod/core/converter/converter");
const { isValidIPv4 } = require("../helpers/ip-address-helper");

/**
 * Verifies that a string is a valid ipv4 address
 * @class Ipv4Validator
 * @extends Validator
 */
exports.Ipv4Validator = class Ipv4Validator extends Validator {
    validate(address) {
        if (isValidIPv4(address)) {
            return true;
        } else {
            throw new Error("IPv4 address is incorrect");
        }
    }
};
