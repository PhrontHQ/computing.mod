/**
 * @module ui/table-afp.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class TableAfp
 * @extends Component
 */
exports.TableAfp = Component.specialize(/** @lends TableAfp# */ {

    tableWillUseNewEntry: {
        value: function () {
            var shareService = this.application.shareService;

            return shareService.createAfpShare().then(function (share) {
                return shareService.populateShareObjectIfNeeded(share);
            });
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
