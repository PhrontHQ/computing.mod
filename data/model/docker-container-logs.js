var DataObject = require("mod/data/model/data-object").DataObject;

exports.DockerContainerLogs = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/sections/containers/inspectors/docker-logs.reel'
            },
            nameExpression: "'Logs'"
        }
    }
});
