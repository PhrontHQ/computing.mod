var DataObject = require("mod/data/model/data-object").DataObject;

exports.VmDeviceCdrom = DataObject.specialize({
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
    _path: {
        value: null
    },
    path: {
        set: function (value) {
            if (this._path !== value) {
                this._path = value;
            }
        },
        get: function () {
            return this._path;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: true,
            name: "%type"
        }, {
            mandatory: false,
            name: "path",
            valueType: "String"
        }]
    }
});
