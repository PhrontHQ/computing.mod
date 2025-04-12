var DataObject = require("mod/data/model/data-object").DataObject;

exports.SectionSettings = DataObject.specialize({
    _section: {
        value: null
    },
    section: {
        set: function (value) {
            if (this._section !== value) {
                this._section = value;
            }
        },
        get: function () {
            return this._section;
        }
    },
    _settings: {
        value: null
    },
    settings: {
        set: function (value) {
            if (this._settings !== value) {
                this._settings = value;
            }
        },
        get: function () {
            return this._settings;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "section",
            valueType: "object"
        }, {
            mandatory: false,
            name: "settings",
            valueType: "object"
        }]
    },
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/controls/section.reel/section-settings.reel'
            },
            nameExpression: "section.label + ' settings'"
        }
    }
});
