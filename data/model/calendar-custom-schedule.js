var DataObject = require("mod/data/model/data-object").DataObject;

exports.CalendarCustomSchedule = DataObject.specialize(null, {
    userInterfaceDescriptor: {
        value: {
            inspectorComponentModule: {
                id: 'ui/inspectors/cron-job.reel'
            },
            nameExpression: "'Custom Schedule Options'"
        }
    }
});
