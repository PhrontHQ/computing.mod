var DataObject = require("mod/data/model/data-object").DataObject;

exports.VmConfigNetworkAnonymous = DataObject.specialize({
    _management: {
        value: null
    },
    management: {
        set: function (value) {
            if (this._management !== value) {
                this._management = value;
            }
        },
        get: function () {
            return this._management;
        }
    },
    _nat: {
        value: null
    },
    nat: {
        set: function (value) {
            if (this._nat !== value) {
                this._nat = value;
            }
        },
        get: function () {
            return this._nat;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "management",
            valueType: "String"
        }, {
            mandatory: false,
            name: "nat",
            valueType: "String"
        }]
    }
});
