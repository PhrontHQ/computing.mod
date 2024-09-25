var Component = require("mod/ui/component").Component,
    NetworkAggregationProtocols = require("core/model/enumerations/network-aggregation-protocols").NetworkAggregationProtocols;

exports.Lagg = Component.specialize({
    laggProtocolOptions: {
        value: NetworkAggregationProtocols.members
    },

    enterDocument: {
        value: function() {
            if (this.object && this.object._isNew && this.object.type === 'LAGG') {
                this.object.lagg.ports = this.object.lagg.ports || [];
                this.object.lagg.protocol = this.object.lagg.protocol || 'FAILOVER';
            }
        }
    }
});
