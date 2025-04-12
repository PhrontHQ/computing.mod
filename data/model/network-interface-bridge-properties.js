var DataObject = require("mod/data/model/data-object").DataObject;

exports.NetworkInterfaceBridgeProperties = DataObject.specialize({
    _members: {
        value: null
    },
    members: {
        set: function (value) {
            if (this._members !== value) {
                this._members = value;
            }
        },
        get: function () {
            return this._members;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "members",
            valueType: "array"
        }]
    }
});
