window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyRegisterComponent = function (evt) {
        if (document.getElementById("company-register-component")) {
            var companyRegisterComponent = document.getElementById("company-register-component");

            var registrationFormContainer = document.getElementById("registration-form-container");
            var companyRegistrationContainer = document.getElementById("company-registration-container");
            var companyRegistrationForm = document.getElementById("company-registration-form");
            var tinVerificationForm = document.getElementById("tin-verification-form");

            // DataTime Picker
            $("#date-of-incorporation-date-picker").datepicker({
                dateFormat: 'dd-mm-yy'
            });
            var startDate = new Date();
            startDate.setUTCDate(startDate.getDate() - 365);
            $("#date-of-incorporation-date-picker").datepicker("setDate", startDate);

            var startDateTimePicker = document.getElementById("date-of-incorporation-date-picker");
            if (startDateTimePicker.hasAttribute("date-value") && startDateTimePicker.getAttribute("date-value") != "") {
                var startDate = new Date(startDateTimePicker.getAttribute("date-value"));
                $("#date-of-incorporation-date-picker").datepicker("setDate", startDate);
            }

            var verifyTINButton = document.getElementById("verify-tin-button");
            if (verifyTINButton) {
                verifyTINButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            if (matObject.matValidatorForm(document.getElementById("tin-verification-form"))) {
                                pageLoader.show();

                                var tinTextbox = document.getElementById("tax-identification-number");
                                var data = {
                                    Tin: tinTextbox.value
                                };
                                $.post((baseUrl + "/register/verifytaxidentificationnumber"), data, function (response) {
                                    //console.log(response);
                                    pageLoader.hide();
                                    registrationMatStackableViewEventHandler.next();

                                    toastr.success({
                                        message: "Hurray, we have done it again to you!"
                                    })
                                });
                            }
                        } catch (e) {
                            pageLoader.hide();
                            throw e;
                        }
                    }
                });
            }

            var continueToCertificateOfIncorporatioButton = document.getElementById("continue-to-coi-upload-button");
            if (continueToCertificateOfIncorporatioButton) {
                continueToCertificateOfIncorporatioButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.next();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            var continueToContactPersonDetailsButton = document.getElementById("continue-to-contact-person-details-button");
            if (continueToContactPersonDetailsButton) {
                continueToContactPersonDetailsButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.next();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            var continueToChoosePasswordButton = document.getElementById("continue-to-choose-a-password-button");
            if (continueToChoosePasswordButton) {
                continueToChoosePasswordButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.next();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            var submitRegistrationButton = document.getElementById("submit-registration-button");
            if (submitRegistrationButton) {
                submitRegistrationButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            //pageLoader.show();
                            //setTimeout(function (evt) {
                            //    pageLoader.hide();
                            //    //
                            //});


                            var data = {
                                __RequestVerificationToken: document.querySelector("*[name=\"__RequestVerificationToken\"").value,
                                Email: document.getElementById("Email").value,
                                Password: document.getElementById("Password").value,
                                ConfirmPassword: document.getElementById("ConfirmPassword").value,
                                CompanyName: document.getElementById("CompanyName").value,
                                ContactPersonName: document.getElementById("ContactPersonName").value,
                                ContactPersonPhoneNumber: document.getElementById("ContactPersonPhoneNumber").value,
                                ContactPersonEmail: document.getElementById("ContactPersonEmail").value,
                                BusinessPhoneNumber: document.getElementById("BusinessPhoneNumber").value,
                                BusinessAddress: document.getElementById("BusinessAddress").value,
                                DateOfIncorporation: dateOfIncorporationDatePicker.getDate(),
                                Tin: document.getElementById("Tin").value,
                                StateID: document.getElementById("StateID").value,
                                LGAID: document.getElementById("LGAID").value,
                                CACNumber: document.getElementById("CACNumber").value,
                                WareHouseAddress: document.getElementById("WareHouseAddress").value,
                                CertificateOfIncorporationId: document.getElementById("CertificateOfIncorporationId").value
                            };
                            $.post((baseUrl + "/register/submit"), data, function (response) {
                                console.log(response);
                                pageLoader.hide();
                                registrationMatStackableViewEventHandler.next();
                            });
                        }
                        catch (e) {
                            throw e;
                        }
                    }
                });
            }

            var registrationCompleteButton = document.getElementById("registration-complete-button");
            if (registrationCompleteButton) {
                registrationCompleteButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            var _this = this;
                            pageLoader.show();
                            setTimeout(function (evt) {
                                document.location.href = baseUrl;
                            });
                        }
                        catch (e) {
                            throw e;
                        }
                    }
                });
            }

            var backToCompanyDetailsButton = document.getElementById("back-to-company-details-button");
            if (backToCompanyDetailsButton) {
                backToCompanyDetailsButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.previous();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            var backToCertificateOfIncorporationUploadButton = document.getElementById("back-to-coi-upload-button");
            if (backToCertificateOfIncorporationUploadButton) {
                backToCertificateOfIncorporationUploadButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.previous();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            var backToContactPersonDetailsButton = document.getElementById("back-to-contact-person-details-button");
            if (backToContactPersonDetailsButton) {
                backToContactPersonDetailsButton.addEventListener("click", function (evt) {
                    if (evt.button == 0) {
                        try {
                            pageLoader.show();
                            setTimeout(function (evt) {
                                pageLoader.hide();
                                //
                                registrationMatStackableViewEventHandler.previous();
                            });
                        }
                        catch (e) {
                            //
                        }
                    }
                });
            }

            // activate material design features
            var matObject = activateMaterialDesign(companyRegistrationContainer);
            matObject.matInputFieldEventHandler("tin-mat-input-field", {
                keyup: function (args) {
                    //console.log(args);
                }
            });
            var registrationMatStackableViewEventHandler = matObject.matStackableViewEventHandler("registration-mat-stackable-view");
            //console.log(registrationMatStackableViewEventHandler);

            // certificate of incorporation uploader
            var certificateOfIncorporationUploadButton = matObject.matUploadButtonEventHandler("certificate-of-incorporation-document-uploader");
            certificateOfIncorporationUploadButton.on("success", function (response) {
                var certificateOfIncorporationTxt = document.getElementById("CertificateOfIncorporationId");
                certificateOfIncorporationTxt.value = response.documentId;
            });

            // certificate of incorporation uploader
            var dateOfIncorporationDatePicker = matObject.matDatePickerEventHandler("date-of-incorporation-mat-input-field");

            //
            var toastr = new matObject.matToastrEventHandler();

            // initialize form
            matObject.matInitializeForm(document.getElementById("tin-verification-form"));
            matObject.matInitializeForm(document.getElementById("company-details-form"));
            matObject.matInitializeForm(document.getElementById("upload-certification-of-incorporation-form"));
            matObject.matInitializeForm(document.getElementById("contact-person-form"));
            matObject.matInitializeForm(document.getElementById("choose-password-form"));
        }
    }
    CompanyRegisterComponent();
});