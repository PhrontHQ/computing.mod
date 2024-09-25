var DataObject = require("mod/data/model/data-object").DataObject;

exports.DirectoryServices = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/accounts/inspectors/directory-services.reel'
            },
            iconComponentModule: {
                id: 'ui/icons/directory-services.reel'
            },
            nameExpression: "'Directory Services'",
            wizardComponentModuleId: "ui/sections/wizard/inspectors/directory-services.reel",
            wizardTitle: "Set up a directory service"
        }
    }
});
