var Component = require("mod/ui/component").Component,
    EventDispatcherService = require("core/service/event-dispatcher-service").EventDispatcherService,
    ModelEventName = require("core/model-event-name").ModelEventName,
    DataObjectChangeService = require('core/service/data-object-change-service').DataObjectChangeService,
    DashboardService = require("core/service/dashboard-service").DashboardService,
    _ = require("lodash");


exports.Tasks = Component.specialize({

    handleUserLogged: {
        value: function() {
            this._eventDispatcherService = EventDispatcherService.getInstance();
            this._dashboardService = DashboardService.getInstance();
            this._dashboardService.registerToTasks();
            this._eventDispatcherService.addEventListener(ModelEventName.Task.listChange, this._handleTasksChange.bind(this));
            this._dataObjectChangeService = new DataObjectChangeService();
            this.tasks = [];
        }
    },

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
                this.application.addEventListener("userLogged", this, false);
            }
        }
    },

    _handleTasksChange: {
        value: function(tasks) {
            this._dataObjectChangeService.handleContentChange(this.tasks, tasks);
            this.dispatchOwnPropertyChange('tasks', this.tasks);
        }
    }
});
