var DataObject = require("mod/data/model/data-object").DataObject;

exports.DockerContainerCreator = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/containers/inspectors/container-creator.reel'
            },
            nameExpression: "'Create a container'"
        }
    }
});
