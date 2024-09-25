var Enum = require("mod/core/enum").Enum;

exports.DatasetType = new Enum().initWithMembersAndValues(["BOOKMARK","FILESYSTEM","SNAPSHOT","VOLUME"], ["BOOKMARK","FILESYSTEM","SNAPSHOT","VOLUME"]);
