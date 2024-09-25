var Component = require("mod/ui/component").Component;

exports.TablePort = Component.specialize({
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

    tableWillUseNewEntry: {
        value: function() {
            return {
                protocol: 'TCP'
            }
        }
    }
});
