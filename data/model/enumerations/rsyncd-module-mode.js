var Enum = require("mod/core/enum").Enum;

exports.RsyncdModuleMode = new Enum().initWithMembersAndValues(["READONLY","READWRITE","WRITEONLY"], ["READONLY","READWRITE","WRITEONLY"]);
