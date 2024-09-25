/**
 * @module ui/table-users.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class TableUsers
 * @extends Component
 */
exports.TableUsers = Component.specialize(/** @lends TableUsers# */ {
    tableWillUseNewEntry: {
        value: function () {
            return this._sectionService.getNewUser();
        }
    },
    //TODO: password checking.
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
