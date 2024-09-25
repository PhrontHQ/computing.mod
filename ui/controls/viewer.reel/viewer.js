var AbstractComponentActionDelegate = require("ui/abstract/abstract-component-action-delegate").AbstractComponentActionDelegate,
    RoutingService = require("core/service/routing-service").RoutingService,
    CascadingList = require("ui/controls/cascading-list.reel").CascadingList,
    ModelDescriptorService = require("core/service/model-descriptor-service").ModelDescriptorService,
    _ = require("lodash");

exports.Viewer = AbstractComponentActionDelegate.specialize({
    templateDidLoad: {
        value: function() {
            this._modelDescriptorService = ModelDescriptorService.getInstance();
            this._routingService = RoutingService.getInstance();
        }
    },

    displayTitle: {
        value: false
    },

    parentCascadingListItem: {
        get: function () {
            return this._parentCascadingListItem ||
                (this._parentCascadingListItem = CascadingList.findCascadingListItemContextWithComponent(this));
        }
    },

    _currentContext: {
        get: function() {
            return this.parentCascadingListItem.data;
        }
    },

    hasCreateEditor: {
        value: false
    },

    helpShown: {
        value: false
    },

    handleViewerHelpButtonAction: {
        value: function() {
            this.helpShown = !this.helpShown;
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            this.super(isFirstTime);
            if (this.object) {
                this._setViewerMetaDataWithObject(this.object);
            }
        }
    },

    handleCreateButtonAction: {
        value: function () {
            this._routingService.navigate(this._currentContext.path + '/create');
        }
    },

    handleNavigationBackButtonAction: {
        value: function () {
            this._routingService.closeColumn(this._currentContext.columnIndex);
        }
    },

    _setViewerMetaDataWithObject: {
        value: function (object) {
            var self = this;
            return this._modelDescriptorService.getUiDescriptorForObject(object).then(function (uiDescriptor) {
                self.userInterfaceDescriptor = uiDescriptor;
                self.hasCreateEditor = false;
                self.createLabel = null;
                if (uiDescriptor) {
                    self.hasCreateEditor = !self._currentContext.isCreatePrevented && !!uiDescriptor.creatorComponentModule;
                    self.createLabel = uiDescriptor.createLabel;
                }
            });
        }
    }

});
