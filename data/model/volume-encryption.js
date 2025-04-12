var DataObject = require("mod/data/model/data-object").DataObject;

exports.VolumeEncryption = DataObject.specialize({
    _hashed_password: {
        value: null
    },
    hashed_password: {
        set: function (value) {
            if (this._hashed_password !== value) {
                this._hashed_password = value;
            }
        },
        get: function () {
            return this._hashed_password;
        }
    },
    _key: {
        value: null
    },
    key: {
        set: function (value) {
            if (this._key !== value) {
                this._key = value;
            }
        },
        get: function () {
            return this._key;
        }
    },
    _salt: {
        value: null
    },
    salt: {
        set: function (value) {
            if (this._salt !== value) {
                this._salt = value;
            }
        },
        get: function () {
            return this._salt;
        }
    },
    _slot: {
        value: null
    },
    slot: {
        set: function (value) {
            if (this._slot !== value) {
                this._slot = value;
            }
        },
        get: function () {
            return this._slot;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "hashed_password",
            valueType: "String"
        }, {
            mandatory: false,
            name: "key",
            valueType: "String"
        }, {
            mandatory: false,
            name: "salt",
            valueType: "String"
        }, {
            mandatory: false,
            name: "slot",
            valueType: "number"
        }]
    }
});
