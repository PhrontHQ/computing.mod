var DataObject = require("mod/data/model/data-object").DataObject;

exports.AccountSystem = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            collectionInspectorComponentModule: {
                id: 'ui/controls/viewer.reel'
            },
            iconComponentModule: {
                id: 'ui/icons/freenas-icon.reel'
            },
            collectionNameExpression: "'System'"
        }
    }
});
