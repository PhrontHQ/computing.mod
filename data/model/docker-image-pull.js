var DataObject = require("mod/data/model/data-object").DataObject;

exports.DockerImagePull = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            nameExpression: "'Pull a Image'",
            inspectorComponentModule: {
                id: 'ui/sections/containers/inspectors/docker-image-pull.reel'
            }
        }
    }
});
