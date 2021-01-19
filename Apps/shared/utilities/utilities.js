"use strict";
function isKeyCodeAlphanumeric(keyCode) {
    return /[a-zA-Z0-9-_ ]/.test(String.fromCharCode(event.keyCode));
};
function MouseEvent(evt) {
    if (evt) {
        this.e = evt;
    }
    else {
        this.e = window.event;
    }
    ;
    if (evt.pageX) {
        this.x = evt.pageX;
    }
    else {
        this.x = evt.clientX;
    }
    ;
    if (evt.pageY) {
        this.y = evt.pageY;
    }
    else {
        this.y = evt.clientY;
    }
    ;
    if (evt.target) {
        this.target = evt.target;
    }
    else {
        this.target = evt.srcElement;
    }
    ;
};
function parseBindingAttribute(bindingAttribute) {
    var bindingProperties = bindingAttribute;
    bindingProperties = bindingProperties.substr((bindingProperties.indexOf("{") + 1), (bindingProperties.lastIndexOf("}") - 1)).toString();
    bindingProperties = bindingProperties.split(",");
    var attributes = Array();
    var attributes = {};
    Array.prototype.forEach.call(bindingProperties, function (propertyPair, index) {
        propertyPair = propertyPair.split("=");
        attributes[propertyPair[0].trim()] = propertyPair[1].trim();
    });
    return attributes;
};
function parseNotation(notation) {
    return notation.substr(notation.lastIndexOf('.') + 1);
};
function parseEnum(enumStr) {
    var enumStr = enumStr.substr((enumStr.indexOf("(") + 1), (enumStr.lastIndexOf(")") - 1));
    var enumElements = enumStr.split("|");
    var enumValues = {};
    Array.prototype.forEach.call(enumElements, function (elem, indx) {
        enumValues[indx] = elem;
    });
    return enumValues;
};
function parseUrl(query) {
    var match, pl = /\+/g, // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g, decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        }, urlParams = {};
    while (match = search.exec(query)) {
        // urlParams[decode(match[1])] = decode(match[2]);
        urlParams[match[1]] = match[2];
    }
    ;
    return urlParams;
};
var ORM = {
    // maps server side data to controls bindingsource
    // ...
    toDataObject: function (dataObject, sourceNotation) {
        sourceNotation = (typeof sourceNotation === "string") ? sourceNotation.split(".") : sourceNotation;
        var arrIndex = sourceNotation.shift();
        try {
            // Perform a recursive test for nested object
            //
            if ((null != dataObject) && (arrIndex in dataObject) && ((typeof dataObject[arrIndex] == "object") && !(dataObject[arrIndex] instanceof Array))) {
                return ORM.toDataObject(dataObject[arrIndex], sourceNotation);
            }
            else {
                if ((null != dataObject) && (arrIndex in dataObject)) {
                    var response = dataObject[arrIndex];
                    // var searchWord = "<div></div>";
                    // var search = new RegExp(searchWord, "g");
                    // var textResponse = dataObject[arrIndex].replace(search, "");
                    // console.log(textResponse);
                    return response;
                }
                else {
                    return ORM.toDataObject(dataObject, sourceNotation);
                }
            }
        }
        catch (e) {
            // ...
        }
    },
    // Maps controls bindingsource data to server side data
    // ...
    toBindingSource: function (sourceNotation, value) {
        dataObject = {};
        ORM.createBindingSourceObject(dataObject, sourceNotation, value);
        return dataObject;
    },
    //
    // ...
    createBindingSourceObject: function (dataObject, newKey, value) {
        var keys = Object.keys(dataObject);
        if (keys.length > 0) {
            keys.map(function (key, indx) {
                if ((typeof dataObject[keys[indx]] == "object") && !(dataObject[keys[indx]] instanceof Array)) {
                    ORM.createBindingSourceObject(dataObject[keys[indx]], newKey, value);
                }
                else {
                    dataObject[keys[indx]] = new Object();
                    dataObject[keys[indx]][newKey] = value;
                }
            });
        }
        else {
            dataObject[newKey] = value;
        }
    },
    //
    // ...
    createArrayBindingSourceObject: function (dataObject, notationItem, newKey, value) {
        var keys = Object.keys(dataObject);
        if (keys.length > 0) {
            keys.map(function (key, indx) {
                if ((typeof dataObject[keys[indx]] == "object") && !(dataObject[keys[indx]] instanceof Array)) {
                    ORM.createArrayBindingSourceObject(dataObject[keys[indx]], notationItem, newKey, value);
                }
                else {
                    dataObject[keys[indx]] = new Object();
                    var values = value;
                    var collection = Array();
                    Array.prototype.forEach.call(values, function (value, index) {
                        var newObject = {};
                        newObject[newKey] = value;
                        collection.push(newObject);
                    });
                    dataObject[keys[indx]][notationItem] = collection;
                }
            });
        }
        else {
            dataObject[notationItem] = new Object();
            var values = value;
            var collection = Array();
            Array.prototype.forEach.call(values, function (value, index) {
                var newObject = {};
                newObject[newKey] = value;
                collection.push(newObject);
            });
            dataObject[notationItem] = collection;
        }
    }
};
function ClipBoard() {
    // ...
};
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var ARGUMENT_NAMES = /([^\s,]+)/g;
function getFunctionParameterNames(func) {
    var fnStr = func.toString().replace(STRIP_COMMENTS, '');
    var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
    if (result === null)
        result = [];
    return result;
};
function microtime(getAsFloat) {
    var s, now, multiplier;
    if (typeof performance !== 'undefined' && performance.now) {
        now = (performance.now() + performance.timing.navigationStart) / 1000;
        multiplier = 1e6; // 1,000,000 for microseconds
    }
    else {
        now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
        multiplier = 1e3; // 1,000
    }
    // Getting microtime as a float is easy
    if (getAsFloat) {
        return now;
    }
    // Dirty trick to only get the integer part
    s = now | 0;
    return (Math.round((now - s) * multiplier) / multiplier) + ' ' + s;
};
function toggleFullScreen(element, state) {
    if (state) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
};
function timeSince(timeStamp) {
    var now = new Date(), secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
    var formatDate = function (date, format, utc) {
        var MMMM = ["\x00", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var MMM = ["\x01", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dddd = ["\x02", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        function ii(i, len) {
            var s = i + "";
            len = len || 2;
            while (s.length < len)
                s = "0" + s;
            return s;
        }
        var y = utc ? date.getUTCFullYear() : date.getFullYear();
        format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
        format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
        format = format.replace(/(^|[^\\])y/g, "$1" + y);
        var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
        format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
        format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
        format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
        format = format.replace(/(^|[^\\])M/g, "$1" + M);
        var d = utc ? date.getUTCDate() : date.getDate();
        format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
        format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
        format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
        format = format.replace(/(^|[^\\])d/g, "$1" + d);
        var H = utc ? date.getUTCHours() : date.getHours();
        format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
        format = format.replace(/(^|[^\\])H/g, "$1" + H);
        var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
        format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
        format = format.replace(/(^|[^\\])h/g, "$1" + h);
        var m = utc ? date.getUTCMinutes() : date.getMinutes();
        format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
        format = format.replace(/(^|[^\\])m/g, "$1" + m);
        var s = utc ? date.getUTCSeconds() : date.getSeconds();
        format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
        format = format.replace(/(^|[^\\])s/g, "$1" + s);
        var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
        format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
        f = Math.round(f / 10);
        format = format.replace(/(^|[^\\])f/g, "$1" + f);
        var T = H < 12 ? "AM" : "PM";
        format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
        format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));
        var t = T.toLowerCase();
        format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
        format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));
        var tz = -date.getTimezoneOffset();
        var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
        if (!utc) {
            tz = Math.abs(tz);
            var tzHrs = Math.floor(tz / 60);
            var tzMin = tz % 60;
            K += ii(tzHrs) + ":" + ii(tzMin);
        }
        format = format.replace(/(^|[^\\])K/g, "$1" + K);
        var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
        format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
        format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);
        format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
        format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);
        format = format.replace(/\\(.)/g, "$1");
        return format;
    };
    if (secondsPast < 60) { // Less than a minute
        if (parseInt(secondsPast) <= 0) {
            return parseInt(secondsPast) + ' Just now';
        }
        else {
            return parseInt(secondsPast) + ' seconds';
        }
    }
    if (secondsPast < 3600) { // Less than an hour
        var lessThanHour = parseInt(secondsPast / 60);
        if (lessThanHour <= 1) {
            return 'A minute ago';
        }
        else {
            return lessThanHour + ' minutes ago';
        }
    }
    if (secondsPast <= 86400) { // Less than a day
        return parseInt(secondsPast / 3600) + ' hrs';
    }
    if (secondsPast <= 172800) { // Less than 2 days
        return 'Yesderday at ' + formatDate(timeStamp, "h:mmtt");
    }
    if (secondsPast > 172800) { // After two days
        var timeString;
        if (secondsPast <= 604800)
            timeString = formatDate(timeStamp, "dddd") + " at " + formatDate(timeStamp, "h:mmtt"); // with in a week
        else if (now.getFullYear() > timeStamp.getFullYear())
            timeString = formatDate(timeStamp, "MMMM d, yyyy"); // a year ago
        else if (now.getMonth() > timeStamp.getMonth())
            timeString = formatDate(timeStamp, "MMMM d"); // months ago
        else
            timeString = formatDate(timeStamp, "MMMM d") + " at " + formatDate(timeStamp, "h:mmtt"); // with in a month
        return timeString;
    }
};
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
activateMaterialDesign = function (canvas) {

    // form initializer
    matInitializeForm = function (formElem) {
        var formPrimaryButton = formElem.getElementsByClassName("btn-primary")[0];
        var formInputs = formElem.querySelectorAll("input[type=\"text\"]");

        var numberOfEmptyFields = 0;
        Array.prototype.forEach.call(formInputs, function (formInput) {
            if (formInput.value == "") {
                numberOfEmptyFields += 1;
            }

            if (formInput) {
                formInput.addEventListener("keydown", function (evt) {
                    if (this.value == "") {
                        formPrimaryButton.setAttribute("disabled", "disabled");
                    } else {
                        formPrimaryButton.removeAttribute("disabled");
                    }
                });
                formInput.addEventListener("keyup", function (evt) {
                    if (this.value == "") {
                        formPrimaryButton.setAttribute("disabled", "disabled");
                    } else {
                        formPrimaryButton.removeAttribute("disabled");
                    }
                });
                formInput.addEventListener("blur", function (evt) {
                    if (this.value == "") {
                        formPrimaryButton.setAttribute("disabled", "disabled");
                    } else {
                        formPrimaryButton.removeAttribute("disabled");
                    }
                });
            }
        });

        if (numberOfEmptyFields > 0) {
            console.log(numberOfEmptyFields);
            console.log(formPrimaryButton);
            formPrimaryButton.setAttribute("disabled", "disabled");
        }
    };

    // form validator
    matValidatorForm = function (formElem) {
        return true;
    };

    // input field
    (function () {
        var matInputFields = canvas.querySelectorAll("*[mat-input-field]");
        if (matInputFields.length > 0) {
            Array.prototype.forEach.call(matInputFields, function (inputField, index) {
                var textArea = inputField.getElementsByTagName("input")[0];
                inputField.addEventListener("click", function (evt) {
                    this.setAttribute("focused", "");
                    var textArea = this.getElementsByTagName("input")[0];
                    if (textArea)
                        textArea.focus();
                });

                if (textArea) {
                    textArea.addEventListener("focus", function (evt) {
                        var inputField = this.parentNode.parentNode;
                        inputField.setAttribute("focused", "");
                        this.focus();
                    });
                    textArea.addEventListener("blur", function (evt) {
                        var inputField = this.parentNode.parentNode;
                        if (this.value.length <= 0) {
                            inputField.removeAttribute("focused");
                        }
                        updateInputFieldUILabel(inputField);
                    });
                }
            });

            var updateInputFieldUILabel = function (inputField) {
                var textArea = inputField.getElementsByTagName("input")[0];
                var matFieldName = inputField.querySelector("*[mat-field-name]");
                var matFieldPreviewLabels = canvas.querySelectorAll("*[mat-label]");
                if (matFieldPreviewLabels) {
                    Array.prototype.forEach.call(matFieldPreviewLabels, function (label, index) {
                        if ((label.hasAttribute("mat-field-name")) && (label.getAttribute("mat-field-name") == matFieldName.getAttribute("mat-field-name"))) {
                            var labelText = label.querySelector("*[text]");
                            labelText.innerText = textArea.value;
                        }
                    });
                }
            };

            setTimeout(function (evt) {
                Array.prototype.forEach.call(matInputFields, function (inputField, index) {
                    var textArea = inputField.getElementsByTagName("input")[0];
                    if ((textArea) && (textArea.value != "")) {
                        inputField.setAttribute("focused", "");
                    }
                    updateInputFieldUILabel(inputField);
                });
            });
        }
    })();
    matInputFieldEventHandler = function (matInputFieldElem, action) {
        var matInputField = canvas.querySelector("div[id=\"" + matInputFieldElem + "\"]");
        var textArea = matInputField.getElementsByTagName("input")[0];
        textArea.addEventListener("mousedown", function (evt) {
            if ("click" in action) {
                action.click({});
            }
        });
        textArea.addEventListener("keydown", function (evt) {
            if ("keydown" in action) {
                action.keydown({
                    value: this.value,
                    keyCode: evt.keyCode,
                    isShiftKey: (evt.keyCode) ? true : false,
                    isCntrlKey: (evt.keyCode) ? true : false,
                    isEnterKey: (evt.keyCode) ? true : false,
                    isBackSpaceKey: (evt.keyCode) ? true : false,
                    isTabKey: (evt.keyCode) ? true : false,
                    isAltKey: (evt.keyCode) ? true : false
                });
            }

            if (("enter" in action) && (evt.keyCode == 13)) {
                action.enter({
                    value: this.value,
                    keyCode: evt.keyCode
                });
            }
        });
        textArea.addEventListener("keyup", function (evt) {
            if ("keyup" in action) {
                action.keyup({
                    value: this.value,
                    keyCode: evt.keyCode
                });
            }
        });
    };


    // date picker
    (function () {
        var matDatePickers = canvas.querySelectorAll("*[mat-date-picker]");
        if (matDatePickers.length > 0) {
            Array.prototype.forEach.call(matDatePickers, function (matDatePicker, index) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                matDatePicker.appendChild(hiddenField);

                var textArea = matDatePicker.getElementsByTagName("input")[0];
                matDatePicker.addEventListener("click", function (evt) {
                    this.setAttribute("focused", "");
                    var textArea = this.getElementsByTagName("input")[0];
                    if (textArea)
                        textArea.focus();
                });

                if (textArea) {
                    $('#' + textArea.getAttribute("id")).change(function (evt) {
                        var value = evt.target.value;
                        value = value.split("-");
                        var datevalue = value[2] + "-" + value[1] + "-" + value[0];
                        hiddenField.value = datevalue;
                    });
                    hiddenField.setAttribute("name", textArea.getAttribute("name"));
                    textArea.removeAttribute("name");
                    textArea.setAttribute("readonly", "true");
                    textArea.addEventListener("focus", function (evt) {
                        var matDatePicker = this.parentNode.parentNode;
                        matDatePicker.setAttribute("focused", "");
                        this.focus();
                    });
                    textArea.addEventListener("blur", function (evt) {
                        var matDatePicker = this.parentNode.parentNode;
                        if (this.value.length <= 0) {
                            matDatePicker.removeAttribute("focused");
                        }
                    });
                }
            });
        }
    })();
    matDatePickerEventHandler = function (matDatePickerElem) {
        var matDatePickerComponent = canvas.querySelector("div[id=\"" + matDatePickerElem + "\"]");
        return {
            getDate: function () {
                var matDatePickerField = matDatePickerComponent.querySelector("input");
                var matDatePickerFieldDateValue = matDatePickerField.value.toString();
                var dateValueArray = matDatePickerFieldDateValue.split("-");
                var matDatePickerFieldDate = dateValueArray[2] + "-" + dateValueArray[1] + "-" + dateValueArray[0];
                return matDatePickerFieldDate;
            }
        };
    };


    // editable field
    (function () {
        var matEditableFields = canvas.querySelectorAll("*[mat-editable-field]");
        if (matEditableFields.length > 0) {
            Array.prototype.forEach.call(matEditableFields, function (editableField, index) {
                var textArea = editableField.querySelector("textarea") || editableField.querySelector("div[contenteditable]");
                textArea.classList.add("min-height-42px");
                editableField.addEventListener("click", function (evt) {
                    this.setAttribute("focused", "");
                    var textArea = editableField.querySelector("textarea") || editableField.querySelector("div[contenteditable]");
                    if (textArea)
                        textArea.focus();
                });

                if (textArea) {
                    if (textArea.value) {
                        textArea.setAttribute("row", "1");
                    }

                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    editableField.appendChild(hiddenField);

                    hiddenField.setAttribute("name", textArea.getAttribute("mat-field-name"));
                    textArea.removeAttribute("name");

                    textArea.addEventListener("keyup", function (evt) {
                        //
                    });
                    textArea.value = textArea.value;
                    textArea.addEventListener("change", function (evt) {
                        var _editableField = this.parentNode.parentNode;
                        _editableField.setAttribute("focused", "");
                    });
                    textArea.addEventListener("paste", function (evt) {
                        evt.preventDefault();
                        var text = '';
                        if (evt.clipboardData || evt.originalEvent.clipboardData) {
                            text = (evt.originalEvent || evt).clipboardData.getData('text/plain');
                        } else if (window.clipboardData) {
                            text = window.clipboardData.getData('Text');
                        }
                        if (document.queryCommandSupported('insertText')) {
                            document.execCommand('insertText', false, text);
                        } else {
                            document.execCommand('paste', false, text);
                        }
                    });
                    textArea.addEventListener("keyup", function (evt) {
                        var _editableField = this.parentNode.parentNode;
                        var _hiddenField = _editableField.querySelector("input[type=\"hidden\"]");
                        _hiddenField.value = this.innerText;
                    });
                    textArea.addEventListener("focus", function (evt) {
                        var _editableField = this.parentNode.parentNode;
                        _editableField.setAttribute("focused", "");
                        this.focus();
                    });
                    textArea.addEventListener("blur", function (evt) {
                        var _editableField = this.parentNode.parentNode;
                        var _hiddenField = _editableField.querySelector("input[type=\"hidden\"]");
                        _hiddenField.value = this.innerText;

                        if ((this.value) && (this.value.length <= 0)) {
                            _editableField.removeAttribute("focused");
                        } else if (this.innerText.length <= 0) {
                            _editableField.removeAttribute("focused");
                        }

                        updateEditableFieldUILabel(_editableField);

                    });
                }
            });

            updateEditableFieldUILabel = function (editableField) {
                var textArea = editableField.querySelector("div[contenteditable]");
                var matFieldName = editableField.querySelector("*[mat-field-name]");
                var matFieldPreviewLabels = canvas.querySelectorAll("*[mat-label]");
                Array.prototype.forEach.call(matFieldPreviewLabels, function (label, index) {
                    if ((label.hasAttribute("mat-field-name")) && (label.getAttribute("mat-field-name") == matFieldName.getAttribute("mat-field-name"))) {
                        var labelText = label.querySelector("*[text]");
                        labelText.innerText = textArea.innerText;
                    }
                });
            };

            setTimeout(function (evt) {
                Array.prototype.forEach.call(matEditableFields, function (editableField, index) {
                    var textArea = editableField.querySelector("div[contenteditable]");
                    if ((textArea) && (textArea.innerHTML != "")) {
                        editableField.setAttribute("focused", "");
                    }
                });
            });

            setTimeout(function (evt) {
                Array.prototype.forEach.call(matEditableFields, function (editableField, index) {
                    var textArea = editableField.querySelector("div[contenteditable]");
                    if ((textArea) && (textArea.innerHTML != "")) {
                        var hiddenField = editableField.querySelector("input[type=\"hidden\"]");
                        hiddenField.value = textArea.innerText;
                    }
                    updateEditableFieldUILabel(editableField);
                });
            }, 1000);
        }
    })();


    // select menu
    (function () {
        var matSelectMenus = canvas.querySelectorAll("*[mat-select-menu]");
        if (matSelectMenus.length > 0) {
            Array.prototype.forEach.call(matSelectMenus, function (matSelectMenu, index) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                matSelectMenu.appendChild(hiddenField);

                var selectMenu = matSelectMenu.getElementsByTagName("select")[0];
                selectMenu.addEventListener("change", function (evt) {
                    updateSelectMenuUILabel(this.parentNode.parentNode);
                });
            });

            updateSelectMenuUILabel = function (matSelectMenu) {
                var selectMenu = matSelectMenu.getElementsByTagName("select")[0];
                var matFieldName = matSelectMenu.querySelector("*[mat-field-name]");
                var matFieldPreviewLabels = canvas.querySelectorAll("*[mat-label]");
                Array.prototype.forEach.call(matFieldPreviewLabels, function (label, index) {
                    if ((label.hasAttribute("mat-field-name")) && (label.getAttribute("mat-field-name") == matFieldName.getAttribute("mat-field-name"))) {
                        var labelText = label.querySelector("*[text]");
                        labelText.innerText = selectMenu.options[selectMenu.selectedIndex].text;
                    }
                });
            };

            setTimeout(function (evt) {
                Array.prototype.forEach.call(matSelectMenus, function (selectMenu, index) {
                    updateSelectMenuUILabel(selectMenu);
                });
            }, 1000);
        }
    })();


    // upload button
    let matUploadButtonEventManager = {};
    matUploadButtonComponent = function () {
        matExecuteUpload = function (formId, url) {
            var form = document.getElementById(formId);
            var progressPanel = form.parentNode.querySelector("div[progress-panel]");
            var matUploadButton = form.parentNode.parentNode;
            var uploadedItemList = matUploadButton.querySelector("*[uploaded-item-list]");
            var uploadedItems = uploadedItemList.querySelectorAll("*[upload-item]");

            let whatToUploadItem = whatToUpload(matUploadButton)

            var files = form.querySelector("input[type=\"file\"]").files;
            var formData = new FormData();
            var file = files[0];
            var fileName = file.name;
            var fileSize = (file.size * 0.001).toFixed(2);
            var fileType = file.type;
            var fileExt = file.type.substr(file.type.indexOf("/") + 1);
            if (fileSize <= 300 && (fileExt != ("jpg" || "jpeg" || "png" || "pdf"))) {
                progressPanel.classList.remove("hide");
                formData.append('file', file);
                $.ajax({
                    url: baseUrl + url,
                    type: 'POST',
                    data: formData,
                    async: true,
                    success: function (data) {
                        // clear file
                        form.querySelector("input[type=\"file\"]").value = "";

                        if ("DocumentID" in data) {
                            matUploadItem({
                                canvas: matUploadButton,
                                documentId: data.DocumentID,
                                description: whatToUploadItem,
                                fileName: fileName,
                                fileSize: fileSize,
                                fileType: fileType
                            });

                            if (hasUploadedItem(matUploadButton) && (getUploadCount(matUploadButton) >= 1) && (getUploadedCount(matUploadButton) < getUploadCount(matUploadButton))) {
                                setTimeout(function () {
                                    let whatToUploadNextItem = whatToUpload(matUploadButton)
                                    var uploadButtonItem = matUploadButton.querySelector("*[upload-button]");
                                    var popOverContainer = uploadButtonItem.querySelector("div[data-toggle=\"popover\"]");
                                    popOverContainer.setAttribute("data-content", "Please upload your " + whatToUploadNextItem + " here.");
                                    $('#' + popOverContainer.getAttribute("id")).popover('show');
                                }, 500);
                                toggleUploadButton(matUploadButton, true);
                            } else {
                                var uploadButtonItem = matUploadButton.querySelector("*[upload-button]");
                                var popOverContainer = uploadButtonItem.querySelector("div[data-toggle=\"popover\"]");
                                $('#' + popOverContainer.getAttribute("id")).popover('hide');
                                toggleUploadButton(matUploadButton, false);
                            }
                        }
                    },
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
        }

        matUploadItem = function (data) {
            if ("canvas" in data) {
                var matUploadButton = data.canvas;

                var uploadButtonItem = matUploadButton.querySelector("*[upload-button]");
                var uploadedItemList = matUploadButton.querySelector("*[uploaded-item-list]");

                var uploadItem = document.createElement("div");
                uploadItem.setAttribute("item-id", data.documentId);
                uploadItem.setAttribute("upload-item", "");
                uploadItem.setAttribute("class", "upload-item");
                uploadedItemList.appendChild(uploadItem);

                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                uploadItem.appendChild(hiddenField);

                // preview
                var width = 200,
                    height = width;
                var uploadPreviewPanel = document.createElement("div");
                uploadPreviewPanel.setAttribute("preview-panel", "");
                uploadPreviewPanel.setAttribute("class", "d-flex shadow-sm preview-panel cursor-default position-relative");
                uploadItem.appendChild(uploadPreviewPanel);

                var uploadPreview = document.createElement("div");
                uploadPreview.setAttribute("image-preview", "");
                uploadPreview.setAttribute("class", "image-preview width-100px mr-3");
                uploadPreviewPanel.appendChild(uploadPreview);

                // upload details
                var uploadDetails = document.createElement("div");
                uploadDetails.setAttribute("upload-details", "");
                uploadDetails.setAttribute("class", "upload-details w-100");
                uploadPreviewPanel.appendChild(uploadDetails);

                var uploadDescription = document.createElement("div");
                uploadDescription.setAttribute("class", "upload-title w-100 font-weight-bold text-15px");
                uploadDetails.appendChild(uploadDescription);

                var uploadFileName = document.createElement("div");
                uploadFileName.setAttribute("class", "upload-text w-100 pre-wrap");
                uploadFileName.innerHTML = "simple-document-file.pdf";
                uploadDetails.appendChild(uploadFileName);

                var uploadFileSize = document.createElement("div");
                uploadFileSize.setAttribute("class", "upload-sub-text w-100");
                uploadFileSize.innerHTML = "19.3KB";
                uploadDetails.appendChild(uploadFileSize);

                // action center
                var uploadAction = document.createElement("div");
                uploadAction.setAttribute("upload-action", "");
                uploadAction.setAttribute("class", "upload-action max-width-25px");
                uploadPreviewPanel.appendChild(uploadAction);

                var uploadDeleteAction = document.createElement("div");
                uploadDeleteAction.setAttribute("upload-action", "");
                uploadDeleteAction.setAttribute("class", "upload-action cursor-pointer width-20px height-20px text-center text-24px rounded-circle ion-ios-trash");
                uploadAction.appendChild(uploadDeleteAction);
                uploadDeleteAction.addEventListener("click", function (evt) {
                    alert("");
                });


                // show upload
                var imageUrl = "";
                if (matUploadButton.hasAttribute("image-url")) {
                    imageUrl = baseUrl + matUploadButton.getAttribute("image-url") + data.documentId;
                }

                var imagePreview = uploadPreviewPanel.querySelector("div[image-preview]");
                imagePreview.setAttribute("style", "background-image: url('" + imageUrl + "')");

                // hide every other component of the uploader if not multiple upload
                if (!matUploadButton.hasAttribute("upload-items")) {
                    uploadButtonItem.classList.add("hide");
                } else {
                    var progressPanel = uploadButtonItem.querySelector("*[progress-panel]");
                    progressPanel.classList.add("hide");
                    var uploadLabel = uploadButtonItem.querySelector("*[class=\"label\"]");
                    uploadLabel.classList.remove("hide");
                }

                uploadItem.setAttribute("item-uploaded", data.description);
                uploadDescription.innerHTML = data.description;
                uploadFileName.innerHTML = data.fileName;
                uploadFileSize.innerHTML = data.fileSize + "KB";

                // request to update uploaded document
                if ("success" in matUploadButtonEventManager) {
                    data["description"] = data.description;
                    matUploadButtonEventManager.success(data);
                }
                //}
            }
        }

        whatToUpload = function (matUploadButton) {

            var uploadButtonItem = matUploadButton.querySelector("*[upload-button]");
            var uploadedItemList = matUploadButton.querySelector("*[uploaded-item-list]");
            var uploadedItems = uploadedItemList.querySelectorAll("*[upload-item]");

            let whatToUploadItem;
            let itemsToUpload = matUploadButton.getAttribute("upload-items");
            if (itemsToUpload != "") {
                itemsToUpload = eval(itemsToUpload);
                for (var index = 0; index <= (itemsToUpload.length - 1); index++) {
                    var item = itemsToUpload[index];
                    if (item) {
                        var isUploadedItem = uploadedItemList.querySelector("*[item-uploaded=\"" + item + "\"]");
                        if (!isUploadedItem) {
                            selectedItemIndex = index;
                            break;
                        }
                    }
                };
                whatToUploadItem = itemsToUpload[selectedItemIndex];
            }

            if (!matUploadButton.hasAttribute("popover-description")) {
                setTimeout(function () {
                    var popOverContainer = uploadButtonItem.querySelector("div[data-toggle=\"popover\"]");
                    popOverContainer.setAttribute("data-content", "Please upload your " + whatToUploadItem + " here.");
                });
            }

            return whatToUploadItem;
        }

        hasUploadedItem = function (matUploadButton) {
            var uploadedItemList = matUploadButton.querySelector("*[uploaded-item-list]");
            var uploadedItems = uploadedItemList.querySelectorAll("*[upload-item]");
            if (uploadedItems.length > 0) {
                return true;
            } else {
                return false;
            }
        }

        getUploadCount = function (matUploadButton) {
            let itemsToUpload = matUploadButton.getAttribute("upload-items");
            if (itemsToUpload != "") {
                itemsToUpload = eval(itemsToUpload);
                return itemsToUpload.length;
            } else {
                return 0;
            }
        }

        getUploadedCount = function (matUploadButton) {
            var uploadedItemList = matUploadButton.querySelector("*[uploaded-item-list]");
            var uploadedItems = uploadedItemList.querySelectorAll("*[upload-item]");
            return uploadedItems.length;
        }

        toggleUploadButton = function (matUploadButton, state) {
            var uploadButton = matUploadButton.querySelector("*[upload-button]");
            if (state) {
                uploadButton.classList.remove("hide");
            } else {
                uploadButton.classList.add("hide");
            }
        }

        var matUploadButtons = canvas.querySelectorAll("*[mat-upload-button]");
        if (matUploadButtons.length > 0) {
            Array.prototype.forEach.call(matUploadButtons, function (matUploadButton, index) {

                var uploadItem = matUploadButton.querySelector("*[upload-item]");
                var uploadButtonItem = matUploadButton.querySelector("*[upload-button]");

                var uploadedItemList = document.createElement("div");
                uploadedItemList.setAttribute("uploaded-item-list", "");
                uploadedItemList.setAttribute("class", "uploaded-item-list position-relative");
                matUploadButton.appendChild(uploadedItemList);

                if (uploadButtonItem) {
                    var progressPanel = document.createElement("div");
                    progressPanel.setAttribute("progress-panel", "");
                    progressPanel.setAttribute("class", "hide cursor-default bg-white position-absolute absolute-top-5 absolute-left-5 absolute-bottom-5 absolute-right-5 z-index-3");
                    uploadButtonItem.appendChild(progressPanel);

                    var area = document.createElement("div");
                    area.setAttribute("class", "position-absolute absolute-top absolute-left absolute-bottom absolute-right width-200px height-35px margin-auto");
                    progressPanel.appendChild(area);

                    var progress = document.createElement("div");
                    progress.setAttribute("class", "progress");
                    area.appendChild(progress);

                    var progressBar = document.createElement("div");
                    progressBar.setAttribute("class", "progress-bar progress-bar-striped progress-bar-animated");
                    progressBar.setAttribute("style", "width: 100%");
                    progressBar.setAttribute("role", "progressbar");
                    progressBar.setAttribute("aria-valuenow", "75");
                    progressBar.setAttribute("aria-valuemin", "0");
                    progressBar.setAttribute("aria-valuemax", "100");
                    progress.appendChild(progressBar);

                    var progressHint = document.createElement("div");
                    progressHint.innerHTML = "Uploading, please wait...";
                    progressHint.setAttribute("class", "text-center mt-2");
                    area.appendChild(progressHint);

                    var formId = microtime(true) + "-form";

                    var formElement = document.createElement("form");
                    formElement.setAttribute("method", "post");
                    formElement.setAttribute("enctype", "multipart/form-data");
                    formElement.setAttribute("action", "javascript:matExecuteUpload(\"" + formId + "\", \"" + matUploadButton.getAttribute("upload-url") + "\");");
                    formElement.setAttribute("id", formId);
                    uploadButtonItem.appendChild(formElement);

                    //let file = uploadButtonItem.querySelector("input[type=\"file\"]");
                    let file = document.createElement("input");
                    file.setAttribute("type", "file");
                    file.setAttribute("id", (matUploadButton.getAttribute("id") + "-file"));
                    file.addEventListener("change", function (evt) {
                        this.parentNode.submit();
                    });
                    formElement.appendChild(file);

                    // get the next item to upload
                    let whatToUploadItem;
                    let itemsToUpload = matUploadButton.getAttribute("upload-items");
                    if (itemsToUpload != "") {
                        itemsToUpload = eval(itemsToUpload);
                        whatToUploadItem = whatToUpload(matUploadButton)
                        matUploadButton.setAttribute("what-to-upload", whatToUploadItem);
                    }

                    let popOverTitle = matUploadButton.getAttribute("popover-title");
                    let popOverDescription = whatToUploadItem ? whatToUploadItem : matUploadButton.getAttribute("popover-description");
                    let popOverContainer = document.createElement("div");
                    popOverContainer.setAttribute("id", matUploadButton.getAttribute("id") + "-popover-container");
                    popOverContainer.setAttribute("data-placement", "left");
                    popOverContainer.setAttribute("data-toggle", "popover");
                    popOverContainer.setAttribute("data-trigger", "focus");
                    popOverContainer.setAttribute("data-content", (popOverDescription ? popOverDescription : ""));
                    popOverContainer.setAttribute("title", (popOverTitle ? popOverTitle : ""));
                    popOverContainer.setAttribute("class", "margin-top-55px");
                    uploadButtonItem.appendChild(popOverContainer);

                    $('#' + popOverContainer.getAttribute("id")).popover({
                        animation: true,
                        trigger: "focus",
                        delay: { show: 0, hide: 1000 }
                    });
                }

            });
        }
    };
    matUploadButtonComponent();
    matUploadButtonEventHandler = function (matUploadButtonElem) {
        var matUploadButtonComponent = canvas.querySelector("div[id=\"" + matUploadButtonElem + "\"]");
        var popOverContainer = matUploadButtonComponent.querySelector("div[id=\"" + matUploadButtonElem + "-popover-container\"]");

        return {
            showPopOver: function () {
                if ((getUploadCount(matUploadButtonComponent) >= 1) && (getUploadedCount(matUploadButtonComponent) < getUploadCount(matUploadButtonComponent))) {
                    setTimeout(function () {
                        $('#' + popOverContainer.getAttribute("id")).popover('show');
                    }, 500);
                    toggleUploadButton(matUploadButtonComponent, true);
                } else {
                    $('#' + popOverContainer.getAttribute("id")).popover('hide');
                    toggleUploadButton(matUploadButtonComponent, false);
                }
            },
            hidePopOver: function () {
                $('#' + popOverContainer.getAttribute("id")).popover('hide');
            },
            on: function (eventName, action) {
                matUploadButtonEventManager[eventName] = action;
            }
        };
    };


    // multi-step progress
    matStepProgressComponent = function () {
        //setTimeout(function () {
        var matStepProgressComponents = canvas.querySelectorAll("div[mat-step-progress]");
        if (matStepProgressComponents.length > 0) {
            Array.prototype.forEach.call(matStepProgressComponents, function (matStepProgressComponentItem, index) {
                var progressBar = matStepProgressComponentItem.querySelector("ul");
                var progressBarSteps = progressBar.querySelectorAll("li");
                //console.log(progressBar);

                // panels
                var matPanelView = matStepProgressComponentItem.getElementsByClassName("mat-panel-view")[0];
                var panelContainer = matStepProgressComponentItem.getElementsByClassName("mat-panel-container")[0];
                var panels = panelContainer.getElementsByClassName("mat-panel");
                var panelHeight = 0;
                console.log(canvas);
                console.log(canvas.offsetWidth);

                Array.prototype.forEach.call(panels, function (panel) {
                    //panel.setAttribute("style", "width:" + matPanelView.offsetWidth + "px;");
                    panel.setAttribute("style", "min-width:" + canvas.offsetWidth + "px; width:" + canvas.offsetWidth + "px;");
                    if (panelContainer.offsetHeight > panelHeight) {
                        panelHeight = panelContainer.offsetHeight;
                    }
                });
            });
        }
        //}, 100);
    };
    matStepProgressComponent();
    matStepProgressEventHandler = function (matStepProgressElem) {
        var matStepProgressComponent = canvas.querySelector("div[id=\"" + matStepProgressElem + "\"]");
        var panelContainer = matStepProgressComponent.getElementsByClassName("mat-panel-container")[0];
        var defaultPanel = panelContainer.getElementsByClassName("mat-panel")[0];
        var panelWidth = defaultPanel.offsetWidth;

        var step = 0;
        return {
            first: function () {
                var style = window.getComputedStyle(panelContainer);
                var leftPos = style.getPropertyValue("left");
                if (leftPos < 0) {
                    //perform a slide action
                    //console.log(parseInt(leftPos));
                }
            },
            previous: function () {
                var style = window.getComputedStyle(panelContainer);
                var leftPos = parseInt(style.getPropertyValue("left")) + panelWidth;
                // if (leftPos < 0) {
                panelContainer.setAttribute("style", "left:" + leftPos + "px;");
                var progressBar = matStepProgressComponent.querySelector("ul");
                var progressBarSteps = progressBar.querySelectorAll("li");
                progressBarSteps[step].classList.remove("active");
                step -= 1;
                //console.log(leftPos);
                // }
            },
            next: function () {
                var style = window.getComputedStyle(panelContainer);
                var leftPos = parseInt(style.getPropertyValue("left")) - panelWidth;
                // if (leftPos <= 0) {                
                step += 1;
                panelContainer.setAttribute("style", "left:" + leftPos + "px;");
                var progressBar = matStepProgressComponent.querySelector("ul");
                var progressBarSteps = progressBar.querySelectorAll("li");
                progressBarSteps[step].classList.add("active");
                //console.log(progressBarSteps[step]);
                // }
            },
            last: function () {
                var style = window.getComputedStyle(panelContainer);
                var leftPos = style.getPropertyValue("left");
                if (leftPos <= 0) {
                    //perform a slide action
                    //console.log(parseInt(leftPos));
                }
            }
        };
    };


    // stackable view
    matStackableViewComponent = function () {
        //setTimeout(function () {
        var matStackableViewComponents = canvas.querySelectorAll("div[mat-stackable-view]");
        if (matStackableViewComponents.length > 0) {
            Array.prototype.forEach.call(matStackableViewComponents, function (matStackableViewComponent, index) {

                var matStackableViewPaneltItems = matStackableViewComponent.querySelectorAll("*[panel-item]");
                if (matStackableViewPaneltItems) {
                    Array.prototype.forEach.call(matStackableViewPaneltItems, function (matStackableViewPaneltItem, index) {
                        matStackableViewPaneltItem.setAttribute("panel-index", index);
                        matStackableViewPaneltItem.classList.remove("active");
                    });
                    var matStackableViewPaneltItem = matStackableViewPaneltItems[0];
                    matStackableViewPaneltItem.classList.add("active");
                }
            });
        }
        //}, 100);
    };
    matStackableViewComponent();
    matStackableViewEventHandler = function (matStackableViewElem) {
        var matStackableViewComponent = canvas.querySelector("div[id=\"" + matStackableViewElem + "\"]");
        var defaultPanel = matStackableViewComponent.getElementsByClassName("panel-item")[0];
        var panelWidth = defaultPanel.offsetWidth;

        var step = 0;
        return {
            first: function () {
                var matStackableViewPaneltItems = matStackableViewComponent.querySelectorAll("*[panel-item]");
                Array.prototype.forEach.call(matStackableViewPaneltItems, function (matStackableViewPaneltItem, index) {
                    matStackableViewPaneltItem.classList.remove("active");
                });
                var matStackableViewPaneltItem = matStackableViewPaneltItems[0];
                matStackableViewPaneltItem.classList.add("active");
            },
            previous: function () {
                var matStackableViewPaneltItems = matStackableViewComponent.querySelectorAll("*[panel-item]");
                var nextPos = 0;
                Array.prototype.forEach.call(matStackableViewPaneltItems, function (matStackableViewPaneltItem, index) {
                    if (matStackableViewPaneltItem.classList.contains("active")) {
                        //console.log(matStackableViewPaneltItem);
                        nextPos = index - 1;
                    }
                    matStackableViewPaneltItem.classList.remove("active");
                });
                var matStackableViewPaneltItem = matStackableViewPaneltItems[nextPos];
                matStackableViewPaneltItem.classList.add("active");
            },
            next: function () {
                var matStackableViewPaneltItems = matStackableViewComponent.querySelectorAll("*[panel-item]");
                var nextPos = 0;
                Array.prototype.forEach.call(matStackableViewPaneltItems, function (matStackableViewPaneltItem, index) {
                    if (matStackableViewPaneltItem.classList.contains("active")) {
                        //console.log(matStackableViewPaneltItem);
                        nextPos = index + 1;
                    }
                    matStackableViewPaneltItem.classList.remove("active");
                });
                var matStackableViewPaneltItem = matStackableViewPaneltItems[nextPos];
                matStackableViewPaneltItem.classList.add("active");
            },
            last: function () {
                var matStackableViewPaneltItems = matStackableViewComponent.querySelectorAll("*[panel-item]");
                Array.prototype.forEach.call(matStackableViewPaneltItems, function (matStackableViewPaneltItem, index) {
                    matStackableViewPaneltItem.classList.remove("active");
                });
                var matStackableViewPaneltItem = matStackableViewPaneltItems[matStackableViewPaneltItems.length - 1];
                matStackableViewPaneltItem.classList.add("active");
            }
        };
    };


    // toastr
    matToastrComponent = function () {
        if (!document.getElementsByClassName("mat-toastr")[0]) {
            var matToastrComponent = document.createElement("div");
            matToastrComponent.setAttribute("mat-toastr", "");
            matToastrComponent.setAttribute("class", "mat-toastr hide position-fixed fixed-top fixed-left fixed-right z-index-2005");
            document.body.appendChild(matToastrComponent);

            var matToastrAlertComponent = document.createElement("div");
            matToastrAlertComponent.setAttribute("role", "alert");
            matToastrComponent.appendChild(matToastrAlertComponent);

            var matToastrAlertContainer = document.createElement("div");
            matToastrAlertContainer.setAttribute("class", "d-flex");
            matToastrAlertComponent.appendChild(matToastrAlertContainer);

            var matToastrAlertIcon = document.createElement("div");
            matToastrAlertIcon.setAttribute("aria-icon", "ion-ios-checkmark");
            matToastrAlertContainer.appendChild(matToastrAlertIcon);

            var matToastrAlertHeading = document.createElement("div");
            matToastrAlertHeading.setAttribute("class", "alert-heading");
            matToastrAlertContainer.appendChild(matToastrAlertHeading);

            var matToastrAlertMessage = document.createElement("div");
            matToastrAlertMessage.setAttribute("class", "alert-message");
            matToastrAlertContainer.appendChild(matToastrAlertMessage);
        }
    };
    matToastrComponent();
    matToastrEventHandler = function () {
        var matToastrComponent = document.body.querySelector("div[mat-toastr]");
        var matToastrAlertComponent = matToastrComponent.querySelector("div[role=\"alert\"]");
        var matToastrAlertIcon = matToastrAlertComponent.querySelector("div[aria-icon]");
        var matToastrAlertHeading = matToastrAlertComponent.querySelector("div[class=\"alert-heading\"]");
        var matAlertMessage = matToastrAlertComponent.querySelector("div[class=\"alert-message\"]");

        optionsModule = function (options) {
            if (options && ("heading" in options)) {
                matToastrAlertHeading.innerHTML = options.heading;
            }

            if (options && ("message" in options)) {
                matAlertMessage.innerHTML = options.message;
            }

            var delay = 5000;
            if (options && ("delay" in options)) {
                delay = options.delay;
            }

            setTimeout(function () {
                matToastrComponent.classList.add("hide");
            }, delay);
        }

        var componentClassOptions = "alert margin-top-20px width-350px mx-auto shadow position-absolute absolute-left absolute-right ";
        var componentIconClassOptions = "alert-icon width-30px height-30px mr-3 font-weight-bold text-30px ";

        return {
            success: function (options) {
                if (matToastrAlertComponent.classList.contains("alert-success")) {
                    matToastrAlertComponent.classList.remove("alert-success");
                }
                if (matToastrAlertComponent.classList.contains("ion-ios-checkmark")) {
                    matToastrAlertComponent.classList.remove("ion-ios-checkmark")
                }

                matToastrComponent.classList.remove("hide");
                matToastrAlertComponent.setAttribute("class", (componentClassOptions + "alert-success"));
                matToastrAlertIcon.setAttribute("class", (componentIconClassOptions + "ion-ios-checkmark"));
                optionsModule(options);
            },

            error: function (options) {
                matToastrComponent.classList.remove("hide");
                matToastrAlertComponent.setAttribute("class", componentClassOptions + "alert-danger");
                matToastrAlertIcon.setAttribute("class", componentIconClassOptions + "ion-ios-close");
                optionsModule(options);
            },

            info: function (options) {
                matToastrComponent.classList.remove("hide");
                matToastrAlertComponent.setAttribute("class", componentClassOptions + "alert-info");
                matToastrAlertIcon.setAttribute("class", componentIconClassOptions + "ion-ios-information");
                optionsModule(options);
            },

            warning: function (options) {
                matToastrComponent.classList.remove("hide");
                matToastrAlertComponent.setAttribute("class", componentClassOptions + "alert-warning");
                matToastrAlertIcon.setAttribute("class", componentIconClassOptions + "ion-ios-close");
                optionsModule(options);
            }
        };
    };


    // alert
    matAlertComponent = function () {
        if (!document.getElementsByClassName("mat-alert")[0]) {
            var matAlertComponent = document.createElement("div");
            matAlertComponent.setAttribute("mat-alert", "");
            matAlertComponent.setAttribute("class", "mat-alert");
            var modalHtml = '<div class="modal" id="mat-alert-modal" tabindex="-1" role="dialog">';
            modalHtml += '      <div class="modal-dialog modal-lg" role="document" >';
            modalHtml += '           <div class="modal-content">';
            modalHtml += '                <div class="modal-header bg-white pt-3 pb-3">';
            modalHtml += '                   <div role="message-heading" class="modal-title text-15px font-weight-bold text-dark">Are you sure?</div>';
            modalHtml += '                   <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
            modalHtml += '                       <span aria-hidden="true">&times;</span>';
            modalHtml += '                   </button>';
            modalHtml += '                </div>';
            modalHtml += '                <div role="message-body" class="width-500px modal-body p-4">';
            modalHtml += '                  <div class="d-flex overflow-hidden mx-auto width-400px">';
            modalHtml += '                      <div role="message-icon" class="max-width-25px min-width-25px height-25px mr-2"><i class="ion-help-circled text-35px"></i></div>';
            modalHtml += '                      <div role="message-label" class="p-2 text-14px line-height-35px text-dark">Modal body text goes here.</div>';
            modalHtml += '                  </div>';
            modalHtml += '                </div>';
            modalHtml += '                <div role="modal-footer" class="modal-footer"></div>';
            modalHtml += '            </div >';
            modalHtml += '       </div >';
            modalHtml += '    </div > ';
            matAlertComponent.innerHTML = modalHtml;
            document.body.appendChild(matAlertComponent);
        }
    };
    matAlertComponent();
    matAlertEventHandler = function (matAlertElem) {
        var matAlertComponent = document.body.querySelector("div[mat-alert]");

        optionsModule = function (options) {
            if (options && ("title" in options)) {
                var matAlertHeading = matAlertComponent.querySelector("*[role=\"message-heading\"]");
                matAlertHeading.innerHTML = options.title;
            }

            if (options && ("message" in options)) {
                var matAlertMessage = matAlertComponent.querySelector("*[role=\"message-body\"]");
                var matAlertMessageLabel = matAlertMessage.querySelector("*[role=\"message-label\"]");
                matAlertMessageLabel.innerHTML = options.message;
            }

            var delay = 5000;
            if (options && ("delay" in options)) {
                delay = options.delay;
            }

            if (options && ("okay" in options)) {
                var matAlertOkayButton = matAlertComponent.querySelector("*[role=\"okay-button\"]");
                matAlertOkayButton.addEventListener("mousedown", function (evt) {
                    $('#mat-alert-modal').modal('hide');
                    if ("click" in options.okay) {
                        setTimeout(function () {
                            if (options.type != "prompt") {
                                options.okay.click(evt);
                            } else {
                                var matAlertMessageBody = matAlertComponent.querySelector("*[role=\"message-body\"]");
                                var matAlertPromptTextArea = matAlertMessageBody.querySelector("*[contenteditable]");

                                options.okay.click({
                                    text: matAlertPromptTextArea.innerText
                                });
                            }
                        }, 200);
                    }
                });
            }

            if (options && ("cancel" in options)) {
                var matAlertCancelButton = matAlertComponent.querySelector("*[role=\"cancel-button\"]");
                matAlertCancelButton.addEventListener("mousedown", function (evt) {
                    options.cancel(evt);
                });
            }
        }

        return {
            confirm: function (options) {
                options["type"] = "confirm";

                if (!("title" in options)) {
                    options["title"] = "Confirmation";
                }

                var modalAlertLabel = '<div class="d-flex overflow-hidden mx-auto width-400px">';
                modalAlertLabel += '<div role="message-icon" class="max-width-25px min-width-25px height-48px mr-2"><i class="ion-help-circled text-35px"></i></div>';
                modalAlertLabel += '<div role="message-label" class="p-2 text-14px text-dark margin-auto display-block vertical-align-middle">Modal body text goes here.</div>';
                modalAlertLabel += '</div>';

                var modalAlertBody = matAlertComponent.querySelector("*[role=\"message-body\"]");
                modalAlertBody.innerHTML = modalAlertLabel;

                var modalAlertFooter = matAlertComponent.querySelector("*[role=\"modal-footer\"]");
                var modalAlertFooterButtons = '<button type="button" role="cancel-button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>';
                modalAlertFooterButtons += '<button type="button" role="okay-button" class="btn btn-primary">' + ((("okay" in options) && ("label" in options.okay)) ? options.okay.label : "Yes, Continue") + '</button>';
                modalAlertFooter.innerHTML = modalAlertFooterButtons;

                optionsModule(options);
                $('#mat-alert-modal').modal({ show: true });
            },

            info: function (options) {
                options["type"] = "info";

                if (!("title" in options)) {
                    options["title"] = "Information";
                }

                var modalAlertLabel = '<div class="d-flex overflow-hidden mx-auto width-400px">';
                modalAlertLabel += '<div role="message-icon" class="max-width-25px min-width-25px height-48px mr-2"><i class="ion-help-circled text-35px"></i></div>';
                modalAlertLabel += '<div role="message-label" class="p-2 text-14px text-dark">Modal body text goes here.</div>';
                modalAlertLabel += '</div>';

                var modalAlertBody = matAlertComponent.querySelector("*[role=\"message-body\"]");
                modalAlertBody.innerHTML = modalAlertLabel;

                var modalAlertFooter = matAlertComponent.querySelector("*[role=\"modal-footer\"]");
                var modalAlertFooterButtons = '<button type="button" role="cancel-button" class="btn btn-secondary" data-dismiss="modal">Okay</button>'
                modalAlertFooter.innerHTML = modalAlertFooterButtons;

                optionsModule(options);
                $('#mat-alert-modal').modal({ show: true });
            },

            prompt: function (options) {
                options["type"] = "prompt";

                if (!("title" in options)) {
                    options["title"] = "Prompt";
                }
                if (("message" in options)) {
                    delete options["message"];
                }

                var modalAlertForm = '<div mat-editable-field class="mat-editable-field form-group mb-0">';
                modalAlertForm += '<div class="label margin-bottom-5px font-weight-bold">Reason:</div>';
                modalAlertForm += '<div class="w-100">';
                modalAlertForm += '<div contenteditable class="form-control w-100" mat-field-name="PackagingSpecifications" ></div >';
                modalAlertForm += '</div>';
                modalAlertForm += '</div>';

                var modalAlertBody = matAlertComponent.querySelector("*[role=\"message-body\"]");
                modalAlertBody.innerHTML = modalAlertForm;

                var modalAlertFooter = matAlertComponent.querySelector("*[role=\"modal-footer\"]");
                var modalAlertFooterButtons = '<button type="button" role="cancel-button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>'
                modalAlertFooterButtons += '<button type="button" role="okay-button" class="btn btn-primary">' + ((("okay" in options) && ("label" in options.okay)) ? options.okay.label : "Submit") + '</button>';
                modalAlertFooter.innerHTML = modalAlertFooterButtons;

                optionsModule(options);
                $('#mat-alert-modal').modal({ show: true });

                // activate material design features
                var matObject = activateMaterialDesign(modalAlertBody);
            }
        };
    };

    window.addEventListener("resize", function () {
        matStepProgressComponent();
        matStackableViewComponent();
    });

    return {
        matInitializeForm: matInitializeForm,
        matValidatorForm: matValidatorForm,
        matStepProgressEventHandler: matStepProgressEventHandler,
        matStackableViewEventHandler: matStackableViewEventHandler,
        matUploadButtonEventHandler: matUploadButtonEventHandler,
        matToastrEventHandler: matToastrEventHandler,
        matAlertEventHandler: matAlertEventHandler,
        matInputFieldEventHandler: matInputFieldEventHandler,
        matDatePickerEventHandler: matDatePickerEventHandler
    }
};




var http = {
    get: function (url, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.addEventListener("load", function (response) {
            var r = response.target;
            if (r.readyState == 4 && r.status == 200) {
                success({
                    data: r.responseText,
                    statusCode: r.status
                });
            }
        });
        xhr.addEventListener("error", function (response) {
            error(response);
        });
        xhr.send();
    },

    post: function (url, success, error) {
        var fd = new FormData();
        fd.append()
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.addEventListener("load", function (response) {
            var r = response.target;
            if (r.readyState == 4 && r.status == 200) {
                success({
                    data: r.responseText,
                    statusCode: r.status
                });
            }
        });
        xhr.addEventListener("error", function (response) {
            error(response);
        });
        xhr.send(fd);
    }
}