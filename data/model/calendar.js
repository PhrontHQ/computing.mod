var DataObject = require("mod/data/model/data-object").DataObject;

exports.Calendar = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/inspectors/calendar.reel'
            },
            nameExpression: "'Calendar'"
        }
    }
});
