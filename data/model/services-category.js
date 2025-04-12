var DataObject = require("mod/data/model/data-object").DataObject;

exports.ServicesCategory = DataObject.specialize({
    _name: {
        value: null
    },
    name: {
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
            }
        },
        get: function () {
            return this._name;
        }
    },
    _services: {
        value: null
    },
    services: {
        set: function (value) {
            if (this._services !== value) {
                this._services = value;
            }
        },
        get: function () {
            return this._services;
        }
    },
    _selector: {
        value: null
    },
    selector: {
        set: function (value) {
            if (this._selector !== value) {
                this._selector = value;
            }
        },
        get: function () {
            return this._selector;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "name"
        }, {
            mandatory: false,
            name: "services"
        }, {
            mandatory: false,
            name: "selector"
        }]
    },
    userInterfaceDescriptor: {
        value: {
            collectionInspectorComponentModule: {
                id: 'ui/controls/viewer.reel'
            },
            collectionNameExpression: "'Services Categories'",
            inspectorComponentModule: {
                id: 'ui/inspectors/services-category.reel'
            },
            nameExpression: "name"
        }
    }
});
