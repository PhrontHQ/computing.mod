var DataObject = require("mod/data/model/data-object").DataObject;

exports.SshCredentials = DataObject.specialize({
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
    _address: {
        value: null
    },
    address: {
        set: function (value) {
            if (this._address !== value) {
                this._address = value;
            }
        },
        get: function () {
            return this._address;
        }
    },
    _hostkey: {
        value: null
    },
    hostkey: {
        set: function (value) {
            if (this._hostkey !== value) {
                this._hostkey = value;
            }
        },
        get: function () {
            return this._hostkey;
        }
    },
    _password: {
        value: null
    },
    password: {
        set: function (value) {
            if (this._password !== value) {
                this._password = value;
            }
        },
        get: function () {
            return this._password;
        }
    },
    _port: {
        value: null
    },
    port: {
        set: function (value) {
            if (this._port !== value) {
                this._port = value;
            }
        },
        get: function () {
            return this._port;
        }
    },
    _privkey: {
        value: null
    },
    privkey: {
        set: function (value) {
            if (this._privkey !== value) {
                this._privkey = value;
            }
        },
        get: function () {
            return this._privkey;
        }
    },
    _username: {
        value: null
    },
    username: {
        set: function (value) {
            if (this._username !== value) {
                this._username = value;
            }
        },
        get: function () {
            return this._username;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "%type"
        }, {
            mandatory: false,
            name: "address",
            valueType: "String"
        }, {
            mandatory: false,
            name: "hostkey",
            valueType: "String"
        }, {
            mandatory: false,
            name: "password",
            valueType: "String"
        }, {
            mandatory: false,
            name: "port",
            valueType: "number"
        }, {
            mandatory: false,
            name: "privkey",
            valueType: "String"
        }, {
            mandatory: false,
            name: "username",
            valueType: "String"
        }]
    }
});
