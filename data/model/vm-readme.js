var DataObject = require("mod/data/model/data-object").DataObject;

exports.VmReadme = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/vms/inspectors/virtual-machine.reel/virtual-machine-readme.reel'
            },
            nameExpression: "'Readme'"
        }
    }
});
