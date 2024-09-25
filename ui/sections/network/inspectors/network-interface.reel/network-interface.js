var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector;

exports.NetworkInterface = AbstractInspector.specialize({
    isAddressSourceDhcp: {
        value: null
    },

    dhcpAlias: {
        value: null
    },

    _object: {
        value: null
    },

    object: {
        get: function() {
            return this._object;
        },
        set: function(object) {
            if (this._object !== object) {
                this._object = object;
            }
        }
    },

    _inspectorTemplateDidLoad: {
        value: function() {
            this.interfaces = this._sectionService.entries;
        }
    },

    enterDocument: {
        value: function() {
            this.super();
            var self = this;
            this.isLoading = true;
            this._sectionService.initializeInterface(this.object).then(function() {
                self.addPathChangeListener('object.dhcp', self, '_handleDhcpChange');
                self.isLoading = false;
            });
        }
    },

    exitDocument: {
        value: function() {
            this.super();
        }
    },

    _handleDhcpChange: {
        value: function() {
            this._sectionService.handleDhcpChangeOnInterface(this.object);
        }
    },

    save: {
        value: function() {
            return this._sectionService.saveInterface(this.object);
        }
    },

    revert: {
        value: function() {
            var self = this;
            return this.inspector.revert().then(function() {
                self._sectionService.initializeInterface(self.object);
            });
        }
    }
});
