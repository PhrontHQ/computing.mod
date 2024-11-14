var Converter = require("mod/core/converter/converter").Converter,
    moment = require('moment'),
    _ = require('lodash');

var UNITS = [
    'years',
    'months',
    'weeks',
    'days',
    'hours',
    'minutes',
    'seconds'
];

exports.SecondsToStringConverter = Converter.specialize({
    convert: {
        value: function(seconds) {
            var duration = moment.duration(_.toNumber(seconds), 'seconds');
            return _.join(
                _.compact(_.map(UNITS, function(unit) {
                    var value = duration.get(unit);
                    return value ? value + ' ' + unit : null;
                })),
                ' '
            );
        }
    },

    revert: {
        value: function() {
            return '';
        }
    }
});
