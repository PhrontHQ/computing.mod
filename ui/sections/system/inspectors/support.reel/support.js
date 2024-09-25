var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector,
    SupportService = require("core/service/support-service").SupportService;

exports.Support = AbstractInspector.specialize({

    categoryOptions: {
        value: null
    },

    save: {
        value: function() {
            var self = this;
            this.object.debug = !!this.object.debug;
            if (!this.object.attachments) {
                this.object.attachments = []; // fixme when attachments are implemented
            }
            return this._supportService.saveSupportTicket(this.object).then(function() {
                self._getNewTicket();
            }, function() {});
        }
    },

    _supportService: {
        value: null
    },

    enterDocument: {
        value: function(isFirstTime) {
            this.super(isFirstTime);
            if (!this.object) {
                this._getNewTicket();
            }
        }
    },

    typeOptions: {
        value: null
    },

    _getNewTicket: {
        value: function() {
            var self = this;
            this._supportService.getSupportTicket().then(function(supportTicket) {
                self.object = supportTicket;
                self.object._isNew = true;
                self.object.type = "bug";
                self.object.category = "-";
            });
        }
    },

    _inspectorTemplateDidLoad: {
        value: function() {
            var self = this;
            this._supportService = SupportService.instance;
            this.typeOptions = this._supportService.supportTicketTypes;
            return this._supportService.listCategories().then(function(categories) {
                self.categoryOptions = Object.keys(categories).sort().map(function(x) {
                    return {label: x, value: categories[x]};
                });
            });
        }
    }
});
