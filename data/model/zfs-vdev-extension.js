var DataObject = require("mod/data/model/data-object").DataObject;

exports.ZfsVdevExtension = DataObject.specialize({
    _target_guid: {
        value: null
    },
    target_guid: {
        set: function (value) {
            if (this._target_guid !== value) {
                this._target_guid = value;
            }
        },
        get: function () {
            return this._target_guid;
        }
    },
    _vdev: {
        value: null
    },
    vdev: {
        set: function (value) {
            if (this._vdev !== value) {
                this._vdev = value;
            }
        },
        get: function () {
            return this._vdev;
        }
    }
}, {
    propertyDescriptors: {
        value: [{
            mandatory: false,
            name: "target_guid",
            valueType: "String"
        }, {
            mandatory: false,
            name: "vdev",
            valueObjectPrototypeName: "ZfsVdev",
            valueType: "object"
        }]
    }
});
