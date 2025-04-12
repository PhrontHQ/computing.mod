var DataObject = require("mod/data/model/data-object").DataObject;

exports.PowerChanged = DataObject.specialize({
    _operation: {
        value: null
    },
    operation: {
        set: function (value) {
            if (this._operation !== value) {
                this._operation = value;
            }
        },
        get: function () {
            return this._operation;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "operation",
            valueObjectPrototypeName: "PowerChangedOperation",
            valueType: "object"
        }]
    }
});
