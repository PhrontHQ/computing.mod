var Enum = require("mod/core/enum").Enum;

exports.VmDeviceDiskMode = new Enum().initWithMembersAndValues(["AHCI","VIRTIO"], ["AHCI","VIRTIO"]);
