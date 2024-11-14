/**
 * @requires mod/core/converter/converter
 */
var Validator = require("mod/core/converter/converter").Validator;

exports.IntegerValidator = Validator.specialize({

    validate: {
        value: function (value) {
            if (+value === parseInt(value)) {
                return true;
            } else {
                throw new Error("Value must be an integer.");
            }
        }
    }

});
