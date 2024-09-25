var AbstractInspector = require("ui/abstract/abstract-inspector").AbstractInspector,
    ModelEventName = require("core/model-event-name").ModelEventName,
    DataObjectChangeService = require('core/service/data-object-change-service').DataObjectChangeService,
    _ = require("lodash");

exports.DirectoryServices = AbstractInspector.specialize({
    _inspectorTemplateDidLoad: {
        value: function() {
            var self = this;
            this.dataObjectChangeService = new DataObjectChangeService();
            this._sectionService.listNtpServers().then(function(ntpServers) {
                self._handleNtpServersChange(ntpServers);
                if (self.ntpServerOptions.length) {
                    self.ntpServer = self.ntpServerOptions[0].value;
                }
                self.eventDispatcherService.addEventListener(ModelEventName.NtpServer.listChange, self._handleNtpServersChange.bind(self));
            })
        }
    },

    enterDocument: {
        value: function () {
            this.super();
            this._fetchDataIfNeeded();
        }
    },

    _handleNtpServersChange: {
        value: function(ntpServers) {
            this.ntpServerOptions = ntpServers.map(function(x) {
                return { label: x.address, value: x.address };
            });
        }
    },

    handleNtpSyncNowAction: {
        value: function() {
            return this._sectionService.syncNtpNow(this.ntpServer);
        }
    },

    refreshDirectories: {
        value: function () {
            var directoryTypesKeyValuesKeys = _.keys(this._sectionService.DIRECTORY_TYPES_LABELS),
                directoryTypesLabels = this._sectionService.DIRECTORY_TYPES_LABELS,
                directoryServicesMap = new Map(),
                directories = this._directories,
                directory,
                directoryTypesValueKey,
                directoryTypesKeyValue,
                i, length,
                promises = [],
                self = this;

            for (i = 0, length = directories.length; i < length; i++) {
                directory = directories[i];

                if ((directoryTypesValueKey = directoryTypesLabels[directory.type]) && directory.name) {
                    directoryServicesMap.set(directory.type, directory);
                    directory.label = directoryTypesLabels[directory.type];
                }
            }

            for (i = 0, length = directoryTypesKeyValuesKeys.length; i < length; i++) {
                directoryTypesKeyValue = directoryTypesKeyValuesKeys[i];

                if (!directoryServicesMap.has(directoryTypesKeyValue)) {
                    promises.push(this._getNewDirectoryInstance(directoryTypesKeyValue));
                }
            }

            promises.push(this._sectionService.getKerberosRealmEmptyList());

            Promise.all(promises).then(function (directoryServices) {
                var directoryService;

                for (i = 0, length = directoryServices.length; i < length; i++) {
                    directoryService = directoryServices[i];

                    directoryServicesMap.set(directoryServices[i].type || i, directoryService);
                }

                var array = directoryServicesMap.toArray();
                array._objectType = 'Directory';
                self.directoryServices = _.sortBy(array, ['_objectType', 'label']);
            });
        }
    },

    handleDirectoriesChange: {
        value: function(state) {
            this.dataObjectChangeService.handleDataChange(this._directories, state);
            this.refreshDirectories();
        }
    },

    revert: {
        value: function() {
            this.directoryServiceConfig.search_order = this._originalSearchOrder.slice();
        }
    },

    save: {
        value: function() {
            var self = this;
            this.application.dataService.saveDataObject(this.directoryServiceConfig).then(function() {
                self._originalSearchOrder = self.directoryServiceConfig.search_order.slice();
            });
        }
    },

    _fetchDataIfNeeded: {
        value: function () {
            if (!this._directories) {
                var self = this;

                this._sectionService.getDirectoryServiceConfig().then(function(directoryServiceConfig) {
                    self.directoryServiceConfig = directoryServiceConfig;
                    self._originalSearchOrder = self.directoryServiceConfig.search_order.slice();
                    return self._sectionService.listDirectories();
                }).then(function (directories) {
                    self._directories = directories;
                    self.refreshDirectories();
                    self.eventDispatcherService.addEventListener(ModelEventName.Directory.listChange, self.handleDirectoriesChange.bind(self));
                    // self.addRangeAtPathChangeListener("_directories", self, "handleDirectoriesChange");
                    self.object.isLoading = false;
                });
            }
        }
    },

    _getNewDirectoryInstance: {
        value: function (type) {
            return this._sectionService.getNewDirectoryForType(type);
        }
    }


}, {

    DIRECTORY_TYPES_KEY_VALUES: {
        value: {
            ACTIVE_DIRECTORY: "winbind",
            FREE_IPA: "freeipa",
            LDAP: "ldap",
            NIS: "nis"
        }
    },

    DIRECTORY_TYPES_VALUE_KEYS: {
        get: function () {
            if (!this._DIRECTORY_TYPES_VALUE_KEYS) {
                var keys = Object.keys(this.DIRECTORY_TYPES_KEY_VALUES),
                    types = this.DIRECTORY_TYPES_KEY_VALUES,
                    key;

                this._DIRECTORY_TYPES_VALUE_KEYS = {};

                for (var i = 0, length = keys.length; i < length; i++) {
                    key = keys[i];
                    this._DIRECTORY_TYPES_VALUE_KEYS[types[key]] = key;
                }
            }

            return this._DIRECTORY_TYPES_VALUE_KEYS;
        }
    }

});
