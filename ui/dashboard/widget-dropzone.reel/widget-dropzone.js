/**
 * @module ui/widget-dropzone.reel
 */
var AbstractDropZoneComponent = require("core/drag-drop/abstract-dropzone-component").AbstractDropZoneComponent,
    AbstractComponentActionDelegate = require("ui/abstract/abstract-component-action-delegate").AbstractComponentActionDelegate,
    WidgetWrapper = require("ui/dashboard/widgets/widget-wrapper.reel").WidgetWrapper,
    Widget = require("ui/dashboard/widgets/widget.reel").Widget,
    DrawerItem = require("ui/drawer.reel/drawer-item.reel").DrawerItem;

/**
 * @class WidgetDropzone
 * @extends Component
 */
var WidgetDropzone = exports.WidgetDropzone = AbstractDropZoneComponent.specialize(/** @lends WidgetDropzone# */ {

    _widgetPlaceHolderElement: {
        value: null
    },

    userWidgets: {
        value: null
    },

    _placeHolderAnchor: {
        value: null
    },

    _placeHolderAnchorPosition: {
        value: null
    },

    _needsUpdatePlaceHolder: {
        value: null
    },

    _hasComponentDragging: {
        value: false
    },

    _shouldInsertBeforePlaceHolder: {
        value: false
    },

    enterDocument: {
        value: function (isFirstTime) {
            AbstractDropZoneComponent.prototype.enterDocument.call(this, isFirstTime);
            AbstractComponentActionDelegate.prototype.enterDocument.call(this, isFirstTime);
        }
    },

    handleRemoveWidgetButtonAction: {
        value: function (event) {
            if (this.application.isDrawerOpen) {
                var iteration = this._widgetsRepetition._findIterationContainingElement(event.target.element);

                if (iteration) {
                    this.userWidgets.splice(this.userWidgets.indexOf(iteration.object), 1);
                }
            }
        }
    },

    handleInfoWidgetButtonAction: {
        value: function (event) {
            var component = this._findWidgetComponentWithElement(event.target.element);

            if (component) {
                component.isFlipped = !component.isFlipped;
            }

            return component;
        }
    },

    handleSaveSettingWidgetButtonAction: {
        value: function (event) {
            var component = this.handleInfoWidgetButtonAction(event);

            if (component) {
                this.application.applicationContextService.save();
            }
        }
    },

    shouldAcceptComponent: {
        value: function (draggableComponent) {
            return (draggableComponent instanceof DrawerItem || draggableComponent instanceof WidgetWrapper);
        }
    },

    handleComponentDragStart: {
        value: function (draggableComponent, dragEvent) {
            AbstractDropZoneComponent.prototype.handleComponentDragStart.call(this, draggableComponent, dragEvent);

            if (this.willAcceptDrop) {
                if (draggableComponent instanceof DrawerItem) {
                    if (this.userWidgets.length > 0) {
                        this._placeHolderAnchor = this._widgetsRepetition._drawnIterations[this.userWidgets.length - 1].firstElement;
                        this._placeHolderAnchorPosition = this._findPositionFromTranslateEvent(dragEvent);
                    }

                    this._needsUpdatePlaceHolder = true;
                    this.needsDraw = true;
                }

                this._hasComponentDragging = true;
            }
        }
    },

    didComponentDrop: {
        value: function (draggableComponent) {
            var indexObjectAnchor, index,
                draggableObject = draggableComponent.object,
                previousIndex = this.userWidgets.indexOf(draggableObject);

            if (draggableComponent instanceof DrawerItem && previousIndex === -1) {
                draggableObject = Object.clone(draggableComponent.object);
                draggableObject.context = {};

                if (this._placeHolderAnchor) {
                    indexObjectAnchor = this.userWidgets.indexOf(this._placeHolderAnchor.component.object);
                    index = this._shouldInsertBeforePlaceHolder ? indexObjectAnchor : indexObjectAnchor + 1;

                    this.userWidgets.splice(index, 0, draggableObject);
                } else {
                    this.userWidgets.push(draggableObject);
                }
            } else if (draggableComponent instanceof WidgetWrapper && this._placeHolderAnchor.component.object !== draggableObject && previousIndex > -1) {
                this.userWidgets.splice(previousIndex, 1);

                indexObjectAnchor = this.userWidgets.indexOf(this._placeHolderAnchor.component.object);
                index = this._shouldInsertBeforePlaceHolder ? indexObjectAnchor : indexObjectAnchor + 1;

                this.userWidgets.splice(index, 0, draggableObject);
            }
        }
    },

    handleComponentDragOver: {
        value: function (draggableComponent, dragEvent) {
            var pointerPosition = this._placeHolderAnchorPosition = this._findPositionFromTranslateEvent(dragEvent),
                widgetWrapperComponent = this._findWidgetWrapperComponentFromPoint(pointerPosition.x, pointerPosition.y);

            if (widgetWrapperComponent) {
                this._placeHolderAnchor = widgetWrapperComponent.element;
                this._needsUpdatePlaceHolder = true;
                this.needsDraw = true;
            }
        }
    },

    didComponentDragEnd: {
        value: function () {
            this._hasComponentDragging = false;
            this._needsUpdatePlaceHolder = false;
            this._placeHolderAnchor = null;
            this._placeHolderAnchorPosition = null;
            this.needsDraw = true;
        }
    },

    shouldScrollViewComputeBoundaries: {
        value: function (scrollView, response, mutations) {
            if (response) {
                var widgetsRepetitionElement = this._widgetsRepetition.element;
                response = false;

                for (var i = 0, length = mutations.length; i < length && !response; i++) {
                    if(mutations[i].target.parentNode === widgetsRepetitionElement) {
                        response = true;
                    }
                }
            }
            
            return response;
        }
    },

    _findPositionFromTranslateEvent: {
        value: function (translateEvent) {
            return {
                x: translateEvent.startPositionX + translateEvent.translateX,
                y: translateEvent.startPositionY + translateEvent.translateY
            };
        }
    },

    _findWidgetWrapperComponentFromPoint: {
        value: function (pointerPositionX, pointerPositionY) {
            var element = document.elementFromPoint(pointerPositionX, pointerPositionY);
            return element ? this._findWidgetWrapperComponentWithElement(element) : null;
        }
    },

    _findWidgetWrapperComponentWithElement: {
        value: function (element) {
            return this._findComponentFromElementAndConstructor(element, WidgetWrapper);
        }
    },

    _findWidgetComponentWithElement: {
        value: function (element) {
            return this._findComponentFromElementAndConstructor(element, Widget);
        }
    },

    _findComponentFromElementAndConstructor: {
        value: function (element, constructor) {
            var component = this._findCloserComponentFromElement(element),
                candidateComponent;

            while (component && !candidateComponent && component !== this) {
                if (component instanceof constructor) {
                    candidateComponent = component;
                } else {
                    component = component.parentComponent;
                }
            }

            return candidateComponent;
        }
    },

    _findCloserComponentFromElement: {
        value: function (element) {
            var component;

            while (element && !(component = element.component) && element !== this.element) {
                element = element.parentNode;
            }

            return component;
        }
    },

    willDraw: {
        value: function () {
            AbstractDropZoneComponent.prototype.willDraw.call(this);

            if (this._placeHolderAnchor && this._needsUpdatePlaceHolder) {
                var placeHolder = this._placeHolderAnchor,
                    placeHolderAnchorBoundingClientRect = placeHolder.getBoundingClientRect();

                this._shouldInsertBeforePlaceHolder = !window.matchMedia("(min-width:65em)").matches ? this._placeHolderAnchorPosition.y <
                    placeHolderAnchorBoundingClientRect.top + (placeHolderAnchorBoundingClientRect.height/2) : this._placeHolderAnchorPosition.x <
                    placeHolderAnchorBoundingClientRect.left + (placeHolderAnchorBoundingClientRect.width/2);

                if (this._widgetPlaceHolderElement && this._widgetPlaceHolderElement.parentNode) {
                    if (this._shouldInsertBeforePlaceHolder) {
                        this._needsUpdatePlaceHolder = placeHolder.previousElementSibling !== this._widgetPlaceHolderElement;

                    } else {
                        this._needsUpdatePlaceHolder = placeHolder.nextElementSibling !== this._widgetPlaceHolderElement;
                    }
                }
            }
        }
    },

    draw: {
        value: function () {
            AbstractDropZoneComponent.prototype.draw.call(this);

            if (this._needsUpdatePlaceHolder) {
                if (!this._widgetPlaceHolderElement) {
                    this._widgetPlaceHolderElement = document.createElement("div");
                    this._widgetPlaceHolderElement.classList.add("WidgetDropzone-widget");
                    this._widgetPlaceHolderElement.classList.add("placeholder");
                }

                if (this._placeHolderAnchor) {
                    this._widgetsRepetition.element.insertBefore(
                        this._widgetPlaceHolderElement,
                        this._shouldInsertBeforePlaceHolder ? this._placeHolderAnchor : this._placeHolderAnchor.nextSibling
                    );
                } else {
                    this._widgetsRepetition.element.appendChild(this._widgetPlaceHolderElement);
                }

                this._needsUpdatePlaceHolder = false;

            } else if (!this._hasComponentDragging && this._widgetPlaceHolderElement && this._widgetPlaceHolderElement.parentNode) {
                this._widgetPlaceHolderElement.parentNode.removeChild(this._widgetPlaceHolderElement);
            }
        }
    },

    handleAddWidgetsButtonAction: {
        value: function () {
            this.application.isDrawerOpen = true;
        }
    }

});

WidgetDropzone.prototype.handleCancelSettingWidgetButtonAction = WidgetDropzone.prototype.handleInfoWidgetButtonAction;
