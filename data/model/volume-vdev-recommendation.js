var DataObject = require("mod/data/model/data-object").DataObject;

exports.VolumeVdevRecommendation = DataObject.specialize({
    _drives: {
        value: null
    },
    drives: {
        set: function (value) {
            if (this._drives !== value) {
                this._drives = value;
            }
        },
        get: function () {
            return this._drives;
        }
    },
    _type: {
        value: null
    },
    type: {
        set: function (value) {
            if (this._type !== value) {
                this._type = value;
            }
        },
        get: function () {
            return this._type;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "drives",
            valueType: "number"
        }, {
            mandatory: false,
            name: "type",
            valueType: "String"
        }]
    }
});
