var Enum = require("mod/core/enum").Enum;

exports.ZfsPoolStatus = new Enum().initWithMembersAndValues(["DEGRADED","FAULTED","OFFLINE","ONLINE","REMOVED","UNAVAIL"], ["DEGRADED","FAULTED","OFFLINE","ONLINE","REMOVED","UNAVAIL"]);
