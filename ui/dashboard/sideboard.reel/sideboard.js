var Component = require("mod/ui/component").Component;

/**
 * @class Sideboard
 * @extends Component
 */
exports.Sideboard = Component.specialize({

    isCollapsed: {
        value: false
    },

    handleToggleSideboardAction: {
        value: function () {
            this.isCollapsed = !this.isCollapsed;
        }
    }
    
});
