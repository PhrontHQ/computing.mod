var Component = require("mod/ui/component").Component,
    Units = require('core/Units');

exports.TableRow = Component.specialize({
    units: {
        value: Units.BYTE_SIZES
    }
});
