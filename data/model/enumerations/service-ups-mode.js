var Enum = require("mod/core/enum").Enum;

exports.ServiceUpsMode = new Enum().initWithMembersAndValues(["MASTER","SLAVE"], ["MASTER","SLAVE"]);
