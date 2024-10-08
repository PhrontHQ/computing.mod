/**
 * @module ui/table-ldap.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class TableLdap
 * @extends Component
 */
exports.TableLdap = Component.specialize(/** @lends TableLdap# */ {
    tableWillUseNewEntry: {
        value: function () {
            return this._sectionService.getNewDirectoryForType("ldap");
        }
    },

    prepareForActivationEvents: {
        value: function () {
            this.addEventListener("action", this);
        }
    },

    exitDocument: {
        value: function() {
            this.removeEventListener("action", this);
        }
    },

    handleAddButtonAction: {
        value: function () {
            this.table.showNewEntryRow();
        }
    }
});
