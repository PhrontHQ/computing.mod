var DataObject = require("mod/data/model/data-object").DataObject;

exports.EncryptReplicationTransportOption = DataObject.specialize({
    "_%type": {
        value: null
    },
    "%type": {
        set: function (value) {
            if (this["_%type"] !== value) {
                this["_%type"] = value;
            }
        },
        get: function () {
            return this["_%type"];
        }
    },
    _type: {
        value: null
    },
    type: {
        set: function (value) {
            if (this._type !== value) {
                this._type = value;
            }
        },
        get: function () {
            return this._type;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "%type"
        }, {
            mandatory: false,
            name: "type",
            valueObjectPrototypeName: "EncryptPluginType",
            valueType: "object"
        }]
    }
});
