/**
 * @module ui/table-iscsi.reel
 */
var Component = require("mod/ui/component").Component;

/**
 * @class TableIscsi
 * @extends Component
 */
exports.TableIscsi = Component.specialize(/** @lends TableIscsi# */ {
    tableWillUseNewEntry: {
        value: function () {
            var shareService = this.application.shareService;

            return shareService.createIscsiShare().then(function (share) {
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
