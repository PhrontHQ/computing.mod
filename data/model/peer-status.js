var DataObject = require("mod/data/model/data-object").DataObject;

exports.PeerStatus = DataObject.specialize({
    _rtt: {
        value: null
    },
    rtt: {
        set: function (value) {
            if (this._rtt !== value) {
                this._rtt = value;
            }
        },
        get: function () {
            return this._rtt;
        }
    },
    _state: {
        value: null
    },
    state: {
        set: function (value) {
            if (this._state !== value) {
                this._state = value;
            }
        },
        get: function () {
            return this._state;
        }
    }
}, {
    propertyBlueprints: {
        value: [{
            mandatory: false,
            name: "rtt",
            readOnly: true,
            valueType: "number"
        }, {
            mandatory: false,
            name: "state",
            readOnly: true,
            valueType: "String"
        }]
    }
});
