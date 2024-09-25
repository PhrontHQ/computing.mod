/**
 * @module ui/version.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class Version
 * @extends Component
 */
exports.Version = Component.specialize(/** @lends Version# */ {
    constructor: {
        value: function Version() {
            this.super();
        }
    },

    modDescription: {
        get: function() {
            return ( typeof montageRequire !== "undefined" ? montageRequire : mr).packageDescription;
        }
    }
});
