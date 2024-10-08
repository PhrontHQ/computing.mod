var Component = require("mod/ui/component").Component,
    BackendBridge = require('core/backend/backend-bridge'),
    WebSocketClient = require("core/backend/websocket-client").WebSocketClient,
    WebSocketConfiguration = require("core/backend/websocket-configuration").WebSocketConfiguration,
    Terminal = require('xterm/src/xterm');

exports.Console = Component.specialize({
    _term: {
        value: null
    },

    _shellClient: {
        value: null
    },

    _defaultBackendBridge: {
        value: null
    },

    _isFirstMessage: {
        value: true
    },

    _areEventsRegistered: {
        value: false
    },

    templateDidLoad: {
        value: function() {
            this._consoleService = this.application.consoleService;
        }
    },

    enterDocument: {
        value: function(isFirstTime) {
            var self = this;

            if (!this._shellClient || !this._shellClient.isConnected) {
                this._reconnectTries = 0;

                if (!this.token && this.waitForToken) {
                    this.addPathChangeListener("token", this, "_handleTokenChange");
                } else {
                    this._connect();
                }
            }
            this._cancelResizeHandler = window.addEventListener("resize", function() { self.needsDraw = true; });
        }
    },

    exitDocument: {
        value: function() {
            if (typeof this._cancelResizeHandler === "function") {
                this._cancelResizeHandler();
                this._cancelResizeHandler = null;
            }
        }
    },

    draw: {
        value: function() {
            this._resizeTerminal();
        }
    },

    handleWebSocketMessage: {
        value: function(event) {
            var data = event.detail;
            try {
                JSON.parse(data);
            } catch (e) {
                var self = this,
                    reader = new FileReader();
                reader.addEventListener('loadend', function() {
                    self._term.write(reader.result);
                    if (self._isFirstMessage) {
                        self._isFirstMessage = false;
                        self.needsDraw = true;
                    }
                });
                reader.readAsBinaryString(data);
            }
        }
    },

    handleWebSocketClose: {
        value: function() {
            if (this._inDocument) {
                this._connect();
            }
        }
    },

    _handleTokenChange: {
        value: function(token) {
            if (token) {
                this._connect();
            }
        }
    },

    _getToken: {
        value: function() {
            var self = this;
            return this.token ?
                    Promise.resolve(this.token) :
                    this._consoleService.getCliToken(this._getColumns()).then(function(token) {
                        return self.token = token;
                    });
        }
    },

    _connect: {
        value: function() {
            var self = this;
            this._shellClient = new WebSocketClient().initWithUrl(WebSocketConfiguration[this.configurationKey].get(WebSocketConfiguration.KEYS.URL));
            this._shellClient.responseType = WebSocketClient.RESPONSE_TYPE.BINARY_BLOB;
            this._shellClient.connect().then(function() {
                if (!self._term) {
                    self._term = new Terminal({
                        cols: 80,
                        rows: 25,
                        screenKeys: true
                    });
                    self._term.open(self.terminalElement);
                }
                return self._getToken();
            }).then(function(token) {
                if (!self._areEventsregistered) {
                    self._term.on('data', function(data) {
                        self._shellClient.sendMessage(data);
                    });
                    self._areEventsregistered = true;
                }
                self._shellClient.addEventListener('webSocketMessage', self, false);
                self._shellClient.addEventListener('webSocketClose', self, false);
                self._shellClient.sendMessage(JSON.stringify({token: token}));
            });
        }
    },

    _resizeTerminal: {
        value: function() {
            if (this._term) {
                var line = this._term.children[0],
                    container = this.terminalElement.parentElement,
                    lines = Math.floor(container.offsetHeight / line.offsetHeight) - 2,
                    columns = this._getColumns();
                this._term.resize(columns, lines);
                this._term.options.geometry = this._term.geometry = [columns, lines];
            }
        }
    },

    _getColumns: {
        value: function() {
            var computedFontSize = getComputedStyle(this._term.children[0], "").fontSize,
                fontSize = computedFontSize !== '' ? Number(computedFontSize.match(/(\d*(\.\d*)?)px/)[1]) : 16;
            this.terminalElement.firstElementChild.style.display = 'none';
            var currentWidth = this.terminalElement.getBoundingClientRect().width;
            this.terminalElement.firstElementChild.style.display = 'block';
            this._oldWidth = currentWidth;
            return Math.floor(currentWidth / fontSize * 1.6) - 4;
        }
    }
});
