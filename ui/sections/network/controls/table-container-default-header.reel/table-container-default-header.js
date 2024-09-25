/**
 * @module ui/table-container-default-header.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class TableContainerDefaultHeader
 * @extends Component
 */
exports.TableContainerDefaultHeader = Component.specialize(/** @lends TableContainerDefaultHeader# */ {

    prepareForActivationEvents: {
        value: function () {
            this.addEventListener("action", this);
        }
    },

    handleAddButtonAction: {
        value: function () {
            this.table.showNewEntryRow();
        }
    },

    handleDeleteButtonAction: {
        value: function () {
            this.table.deleteSelectedRows();
        }
    }

});
