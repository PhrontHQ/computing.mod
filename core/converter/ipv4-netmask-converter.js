/**
 * @requires mod/core/converter/converter
 */
var Converter = require("mod/core/converter/converter").Converter,
    Ipv4NetmaskValidator = require("core/converter/validator/ipv4-netmask-validator").Ipv4NetmaskValidator,
    _ = require('lodash');

/**
 * Converts a subnet mask value to and from CIDR block format
 * e.g. '255.255.255.0' <-> '24'
 *
 * @class Ipv4NetmaskConverter
 * @extends Converter
 */
 exports.Ipv4NetmaskConverter = Converter.specialize({

    constructor: {
        value: function() {
            this.validator = new Ipv4NetmaskValidator();
        }
    },

    convert: {
        value: function (suffix) {
            var suffixValue = _.toNumber(suffix);
            if (!_.isNumber(suffix)) {
                return suffix;
            }

            // Long representation of netmask
            var long = suffixValue > 0 ? (-1 << (32 - suffixValue)) : 0;
            var result;

            // Convert long to 4 parts, separated by dot
            for (var i = 0; i < 4; i++) {
                result = (i == 0) ? '' : ('.' + result);
                result = (long & 255) + result;

                long = long >>> 8;
            }
            return result;
        }
    },

    revert: {
        value: function (value) {
            try {
                if (typeof value !== 'string' || !this.validator.validate(value)) {
                    return value;
                }

                var result = 0;
                var d = value.split('.');

                for (var i = 0; i < d.length; i++) {
                    // Sum up the number of occurrences of '1's
                    // in the binary representations of each decimal part
                    result += ((+d[i]).toString(2).match(/1/g) || []).length;
                }

                return result;
            }
            catch (e) {
                return value;
            }
        }
    },

    validator: {
        value: null
    }

 });
