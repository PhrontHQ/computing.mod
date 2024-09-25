var Enum = require("mod/core/enum").Enum;

exports.VolumeStatus = new Enum().initWithMembersAndValues(["LOCKED","ONLINE","UNAVAIL","UNKNOWN"], ["LOCKED","ONLINE","UNAVAIL","UNKNOWN"]);
