var DataObject = require("mod/data/model/data-object").DataObject;

exports.Scrub = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/inspectors/scrub.reel'
            },
            nameExpression: "'Scrub'"
        }
    }
});
