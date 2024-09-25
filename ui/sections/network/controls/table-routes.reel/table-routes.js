var Component = require("mod/ui/component").Component;
exports.TableRoutes = Component.specialize({
    tableWillUseNewEntry: {
        value: function () {
            return {
                _isNew: true,
                id: null,
                type: 'INET',
                network: null,
                netmask: null,
                gateway: null
            }
        }
    },

    tableWillDeleteEntry: {
        value: function(route) {
            this.controller.markRouteAsDeleted(route);
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
