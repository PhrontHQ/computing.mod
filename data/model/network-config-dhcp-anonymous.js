var DataObject = require("mod/data/model/data-object").DataObject;

exports.NetworkConfigDhcpAnonymous = DataObject.specialize({
    _assign_dns: {
        value: null
    },
    assign_dns: {
        set: function (value) {
            if (this._assign_dns !== value) {
                this._assign_dns = value;
            }
        },
        get: function () {
            return this._assign_dns;
        }
    },
    _assign_gateway: {
        value: null
    },
    assign_gateway: {
        set: function (value) {
            if (this._assign_gateway !== value) {
                this._assign_gateway = value;
            }
        },
        get: function () {
            return this._assign_gateway;
        }
    }
}, {
    propertyBlueprints: {
        value: [{
            mandatory: false,
            name: "assign_dns",
            valueType: "boolean"
        }, {
            mandatory: false,
            name: "assign_gateway",
            valueType: "boolean"
        }]
    }
});
