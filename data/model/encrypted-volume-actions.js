var DataObject = require("mod/data/model/data-object").DataObject;

exports.EncryptedVolumeActions = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/storage/inspectors/encrypted-volume-actions.reel'
            },
            nameExpression: "'Encrypted Actions'"
        }
    }
});
