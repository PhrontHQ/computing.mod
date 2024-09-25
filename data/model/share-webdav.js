var DataObject = require("mod/data/model/data-object").DataObject;

exports.ShareWebdav = DataObject.specialize({
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
    _permission: {
        value: null
    },
    permission: {
        set: function (value) {
            if (this._permission !== value) {
                this._permission = value;
            }
        },
        get: function () {
            return this._permission;
        }
    },
    _read_only: {
        value: null
    },
    read_only: {
        set: function (value) {
            if (this._read_only !== value) {
                this._read_only = value;
            }
        },
        get: function () {
            return this._read_only;
        }
    },
    _show_hidden_files: {
        value: null
    },
    show_hidden_files: {
        set: function (value) {
            if (this._show_hidden_files !== value) {
                this._show_hidden_files = value;
            }
        },
        get: function () {
            return this._show_hidden_files;
        }
    }
}, {
    propertyBlueprints: {
        value: [{
            mandatory: false,
            name: "%type"
        }, {
            mandatory: false,
            name: "permission",
            valueType: "boolean"
        }, {
            mandatory: false,
            name: "read_only",
            valueType: "boolean"
        }, {
            mandatory: false,
            name: "show_hidden_files",
            valueType: "boolean"
        }]
    }
});
