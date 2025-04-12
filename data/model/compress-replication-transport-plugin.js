var DataObject = require("mod/data/model/data-object").DataObject;

exports.CompressReplicationTransportPlugin = DataObject.specialize({
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
    _buffer_size: {
        value: null
    },
    buffer_size: {
        set: function (value) {
            if (this._buffer_size !== value) {
                this._buffer_size = value;
            }
        },
        get: function () {
            return this._buffer_size;
        }
    },
    _level: {
        value: null
    },
    level: {
        set: function (value) {
            if (this._level !== value) {
                this._level = value;
            }
        },
        get: function () {
            return this._level;
        }
    },
    _read_fd: {
        value: null
    },
    read_fd: {
        set: function (value) {
            if (this._read_fd !== value) {
                this._read_fd = value;
            }
        },
        get: function () {
            return this._read_fd;
        }
    },
    _write_fd: {
        value: null
    },
    write_fd: {
        set: function (value) {
            if (this._write_fd !== value) {
                this._write_fd = value;
            }
        },
        get: function () {
            return this._write_fd;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "%type"
        }, {
            mandatory: false,
            name: "buffer_size",
            valueType: "number"
        }, {
            mandatory: false,
            name: "level",
            valueObjectPrototypeName: "CompressPluginLevel",
            valueType: "object"
        }, {
            mandatory: false,
            name: "read_fd",
            valueType: "fd"
        }, {
            mandatory: false,
            name: "write_fd",
            valueType: "fd"
        }]
    }
});
