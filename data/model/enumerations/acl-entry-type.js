var Enum = require("mod/core/enum").Enum;

exports.AclEntryType = new Enum().initWithMembersAndValues(["ALLOW","DENY"], ["ALLOW","DENY"]);
