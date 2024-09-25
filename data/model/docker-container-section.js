var DataObject = require("mod/data/model/data-object").DataObject;

exports.DockerContainerSection = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            nameExpression: "'Containers'"
        }
    }
});
