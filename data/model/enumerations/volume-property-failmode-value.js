var Enum = require("mod/core/enum").Enum;

exports.VolumePropertyFailmodeValue = new Enum().initWithMembersAndValues(["continue","panic","wait"], ["continue","panic","wait"]);
