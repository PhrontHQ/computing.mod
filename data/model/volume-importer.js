var DataObject = require("mod/data/model/data-object").DataObject;

exports.VolumeImporter = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/storage/inspectors/volume-importer.reel'
            },
            nameExpression: "'Import volumes'"
        }
    }
});
