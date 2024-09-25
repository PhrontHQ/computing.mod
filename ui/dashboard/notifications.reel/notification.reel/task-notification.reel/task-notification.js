var Component = require("mod/ui/component").Component,
    EventDispatcherService = require("core/service/event-dispatcher-service").EventDispatcherService,
    ModelEventName = require("core/model-event-name").ModelEventName,
    TaskService = require("core/service/task-service").TaskService,
    SystemService = require("core/service/system-service").SystemService,
    moment = require('moment-timezone'),
    _ = require("lodash");

exports.TaskNotification = Component.specialize({
    constructor: {
        value: function() {
            this.eventDispatcherService = EventDispatcherService.getInstance();
            this.taskService = TaskService.getInstance();
        }
    },

    _object: {
        value: null
    },

    object: {
        get: function() {
            return this._object;
        },
        set: function(object) {
            var self = this;
            this._object = object;
            this.availableDisksEventListener = this.eventDispatcherService.addEventListener(ModelEventName.Task.change(this.object.id), this._handleChange.bind(this));
            this.taskService.getTask(this.object.id).then(function(task) {
                _.assign(self.object, task);
            });
        }
    },

    timeFormat: {
        value: "HH:mm:ss"
    },

    setStartDate: {
        value: function() {
            var displayedDate = this.object.started_at || this.object.created_at;
            this.object.startDate = moment.utc(displayedDate.$date).tz(this.timezone).format(this.timeFormat);
        }
    },

    enterDocument: {
        value: function() {
            var self = this;
            this.systemService = SystemService.getInstance();
            this.systemService.getGeneral().then(function (general) {
                self.timezone = general.timezone;
            }).then(function() {
                self.setStartDate();
            });
            this.generalChangeListener = this.eventDispatcherService.addEventListener(ModelEventName.SystemGeneral.change(), this._handleSystemGeneralChange.bind(this));
        }
    },

    _unregisterUpdates: {
        value: function () {
            this.eventDispatcherService.removeEventListener(ModelEventName.Task.change(this.object.id), this.availableDisksEventListener);
        }
    },

    _handleSystemGeneralChange: {
        value: function(systemGeneral) {
            this.timezone = systemGeneral.get('timezone');
            this.setStartDate();
        }
    },

    exitDocument: {
        value: function() {
            this._unregisterUpdates();
            this.eventDispatcherService.removeEventListener(ModelEventName.SystemGeneral.change(), this.generalChangeListener);
        }
    },

    _handleChange: {
        value: function(state) {
            _.assign(this.object, state.toJS());
            if (this.object.state === 'FINISHED' || this.object.state === 'FAILED' || this.object.state === 'ABORTED') {
                var self = this;
                this.object.progress.percentage = 100;
                this._unregisterUpdates();
            }
        }
    }
}, {
    DRAW_GATE_FIELD: {
        value: 'objectRefreshed'
    }
});
