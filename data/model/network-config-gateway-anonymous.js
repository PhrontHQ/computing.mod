var DataObject = require("mod/data/model/data-object").DataObject;

exports.NetworkConfigGatewayAnonymous = DataObject.specialize({
    _ipv4: {
        value: null
    },
    ipv4: {
        set: function (value) {
            if (this._ipv4 !== value) {
                this._ipv4 = value;
            }
        },
        get: function () {
            return this._ipv4;
        }
    },
    _ipv6: {
        value: null
    },
    ipv6: {
        set: function (value) {
            if (this._ipv6 !== value) {
                this._ipv6 = value;
            }
        },
        get: function () {
            return this._ipv6;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "ipv4",
            valueObjectPrototypeName: "Ipv4Address",
            valueType: "object"
        }, {
            mandatory: false,
            name: "ipv6",
            valueObjectPrototypeName: "Ipv6Address",
            valueType: "object"
        }]
    }
});
