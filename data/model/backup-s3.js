var DataObject = require("mod/data/model/data-object").DataObject;

exports.BackupS3 = DataObject.specialize({
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
    _bucket: {
        value: null
    },
    bucket: {
        set: function (value) {
            if (this._bucket !== value) {
                this._bucket = value;
            }
        },
        get: function () {
            return this._bucket;
        }
    },
    _folder: {
        value: null
    },
    folder: {
        set: function (value) {
            if (this._folder !== value) {
                this._folder = value;
            }
        },
        get: function () {
            return this._folder;
        }
    },
    _peer: {
        value: null
    },
    peer: {
        set: function (value) {
            if (this._peer !== value) {
                this._peer = value;
            }
        },
        get: function () {
            return this._peer;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "%type"
        }, {
            mandatory: false,
            name: "bucket",
            valueType: "String"
        }, {
            mandatory: false,
            name: "folder",
            valueType: "String"
        }, {
            mandatory: false,
            name: "peer",
            valueType: "String"
        }]
    }
});
