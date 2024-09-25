var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector,
    RoutingService = require('core/service/routing-service').RoutingService,
    moment = require("moment-timezone"),
    MailEncryptionType = require("core/model/enumerations/mail-encryption-type").MailEncryptionType;

exports.Mail = AbstractInspector.specialize({

    _inspectorTemplateDidLoad: {
        value: function() {
            this.routingService = RoutingService.getInstance();
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            var self = this;
            if(isFirstTime) {
                this.isLoading = true;
                this.encryptionOptions = [];
                this._sectionService.getSystemGeneral().then(function(systemGeneral) {
                    self.mailMessageHostname = systemGeneral.hostname || 'FreeNAS';
                });
                for (var i = 0; i < MailEncryptionType.members.length; i++) {
                    this.encryptionOptions.push({label: MailEncryptionType.members[i], value: MailEncryptionType[MailEncryptionType.members[i]]});
                }
                self.isLoading = false;
            }
        }
    },

    save: {
        value: function() {
            return Promise.all([
                this._sectionService.saveAlertEmitter(this.object.email),
                this._sectionService.saveAlertEmitter(this.object.pushbullet)
            ]);
        }
    },

    handleSendTestMailAction: {
        value: function() {
            var self = this;
            this.msgSent = "";
            this.application.mailService.sendTestMail({
                "from_address": this.object.email.config.from_address,
                "subject": "Test message from " + this.mailMessageHostname + " alert system",
                "to": this.object.email.config.to,
                "extra_headers": {},
                "message": "This email was generated by the FreeNAS alert system on " + moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
                "attachments": []
            }, this.object.email.config).catch(function (error) {
                self.msgSent = error.message;
            });
        }
    },

    revert: {
        value: function() {
            this.routingService.navigate(this.context.path, true);
        }
    },

    _snapshotDataObjectsIfNecessary: {
        value: function() {
            if (!this._alertEmitterEmail) {
                this._alertEmitterEmail = this.application.dataService.clone(this.alertEmitterEmail);
            }
        }
    }
});
