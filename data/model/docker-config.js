var DataObject = require("mod/data/model/data-object").DataObject;

exports.DockerConfig = DataObject.specialize({
    _api_forwarding: {
        value: null
    },
    api_forwarding: {
        set: function (value) {
            if (this._api_forwarding !== value) {
                this._api_forwarding = value;
            }
        },
        get: function () {
            return this._api_forwarding;
        }
    },
    _api_forwarding_enable: {
        value: null
    },
    api_forwarding_enable: {
        set: function (value) {
            if (this._api_forwarding_enable !== value) {
                this._api_forwarding_enable = value;
            }
        },
        get: function () {
            return this._api_forwarding_enable;
        }
    },
    _default_collection: {
        value: null
    },
    default_collection: {
        set: function (value) {
            if (this._default_collection !== value) {
                this._default_collection = value;
            }
        },
        get: function () {
            return this._default_collection;
        }
    },
    _default_host: {
        value: null
    },
    default_host: {
        set: function (value) {
            if (this._default_host !== value) {
                this._default_host = value;
            }
        },
        get: function () {
            return this._default_host;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "api_forwarding",
            valueType: "String"
        }, {
            mandatory: false,
            name: "api_forwarding_enable",
            valueType: "boolean"
        }, {
            mandatory: false,
            name: "default_collection",
            valueType: "String"
        }, {
            mandatory: false,
            name: "default_host",
            valueType: "String"
        }]
    }
});
