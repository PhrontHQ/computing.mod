var Enum = require("mod/core/enum").Enum;

exports.ShareIscsiAuthType = new Enum().initWithMembersAndValues(["CHAP","CHAP_MUTUAL","DENY","NONE"], ["CHAP","CHAP_MUTUAL","DENY","NONE"]);
