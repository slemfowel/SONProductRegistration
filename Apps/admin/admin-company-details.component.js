window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyDetailsComponent = function (evt) {
        if (document.getElementById("company-details-component")) {
            var companyDetailsComponent = document.getElementById("company-details-component");
            console.log(companyDetailsComponent);


            var addCompanyProductButton = document.getElementById("add-product-button");
            var searchTextbox = document.getElementById("search-textbox");
            var companyProductListingTitlebar = document.getElementById("product-listing-titlebar");
            var companyProductSearchbar = document.getElementById("company-product-searchbar");
            var companyProductListGroup = document.getElementById("company-product-list-group");

            var stackablePanel = null;

            init = function () {
                if (companyDetailsComponent) {

                    var toastrOption = {
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-center",
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };

                    var companyProductListGroupTopPos = companyProductListingTitlebar.offsetHeight + companyProductSearchbar.offsetHeight;
                    companyProductListGroup.setAttribute("style", "top:" + companyProductListGroupTopPos + "px;");

                    var searchProductsButton = document.getElementById("search-companys-button");
                    if (searchProductsButton) {
                        searchProductsButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value,
                                    };
                                    $.post(baseUrl + "/companycompanybrands/search", data, function (response) {
                                        console.log(response);
                                        document.location.href = "./index";
                                        document.addEventListener("readystatechange", function (evt) {
                                            pageLoader.hide();
                                        });
                                    });
                                } catch (e) {
                                    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    if (addCompanyProductButton) {
                        addCompanyProductButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                //createNewCompanyProductForm();
                            }
                        })
                    }

                    // sidebar product listing
                    var companyProductsListGroup = document.getElementById("company-product-list-group");
                    var companyProductsListGroupItems = companyProductsListGroup.querySelectorAll("a[list-group-item]");
                    Array.prototype.forEach.call(companyProductsListGroupItems, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            try {
                                Array.prototype.forEach.call(companyProductsListGroupItems, function (row) {
                                    row.classList.remove("active");
                                });
                                row.classList.add("active");

                                getDetailsPage({
                                    companyProductId: row.getAttribute("data-product-id")
                                });

                            } catch (e) {
                                //
                            }
                        });
                    });

                    var companyProductDetailsStackableView = document.getElementById("company-product-details-stackable-view-section");
                    var companyProductRequiredCombo = companyProductDetailsStackableView.querySelector("select[id=\"business-type-combo\"]");

                    chooseRequiredCompanyProductDocument = function (value) {
                        var companyProductRequiredDocuments = companyProductDetailsStackableView.querySelector("div[id=\"required-documents\"]");
                        var selectedCompanyProductDetailsRequiredDocuments = companyProductDetailsStackableView.querySelectorAll("div[required-document]");

                        var selectedTypeOfBusinessRequirement;
                        Array.prototype.forEach.call(selectedCompanyProductDetailsRequiredDocuments, function (item) {
                            item.classList.add("hide");
                            companyProductRequiredDocuments.classList.add("hide");

                            var requiredTypeOfBusinessDocument = eval(item.getAttribute("type-of-business-requirement"));

                            if (Array.isArray(requiredTypeOfBusinessDocument)) {
                                var requiredTypeOfBusinessDocumentArrayPosition = requiredTypeOfBusinessDocument.indexOf(value);
                                if (requiredTypeOfBusinessDocumentArrayPosition != -1) {
                                    requiredTypeOfBusinessDocument = requiredTypeOfBusinessDocument[requiredTypeOfBusinessDocumentArrayPosition];
                                }
                            } else {
                                requiredTypeOfBusinessDocument = parseInt(requiredTypeOfBusinessDocument);
                            }

                            if (requiredTypeOfBusinessDocument == value) {
                                selectedTypeOfBusinessRequirement = item;
                            }
                        });

                        if (selectedTypeOfBusinessRequirement) {
                            selectedTypeOfBusinessRequirement.classList.remove("hide");
                            companyProductRequiredDocuments.classList.remove("hide");
                        }
                    };

                    toggleProductBrandDetailsView = function (viewObject) {

                        // deselect any previously selected brand details view
                        var companyProductDetailsStackableViewPanels = companyProductDetailsStackableView.getElementsByClassName("stackable-view-panel");
                        Array.prototype.forEach.call(companyProductDetailsStackableViewPanels, function (panelItem) {
                            panelItem.classList.remove("active");
                        });

                        // select brand details view
                        var selectedCompanyProductDetailsStackableViewPanel = companyProductDetailsStackableView.querySelector("div[id=\"" + viewObject.id + "\"]");
                        selectedCompanyProductDetailsStackableViewPanel.classList.add("active");

                        if ("response" in viewObject) {
                            selectedCompanyProductDetailsStackableViewPanel.innerHTML = viewObject.response;

                            // initialize response page
                            var editCompanyProductButton = document.getElementById("edit-brand-button");
                            if (editCompanyProductButton) {
                                editCompanyProductButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        try {
                                            pageLoader.show();
                                            $.get(baseUrl + "/companycompanybrands/edit/" + editCompanyProductButton.getAttribute("data-id"), function (response) {
                                                pageLoader.hide();

                                                toggleProductBrandDetailsView({
                                                    id: "createoredit-brand-details-form",
                                                    response: response,
                                                    action: "createoredit"
                                                });
                                            });
                                        } catch (e) {
                                            // toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                            pageLoader.hide();
                                        }
                                    }
                                })
                            }

                            // product brand listing
                            var companyProductBrandListGroup = document.getElementById("company-product-brand-list-group");
                            var companyProductBrandListGroupItems = companyProductBrandListGroup.querySelectorAll("a[list-group-item]");
                            Array.prototype.forEach.call(companyProductBrandListGroupItems, function (row) {
                                row.addEventListener("mousedown", function (evt) {
                                    try {
                                        Array.prototype.forEach.call(companyProductBrandListGroupItems, function (row) {
                                            row.classList.remove("active");
                                        });
                                        row.classList.add("active");

                                        // show details
                                        $('#createoredit-product-modal').modal({ show: true });

                                    } catch (e) {
                                        //
                                    }
                                });
                            });
                        }

                        if (("action" in viewObject) && viewObject.action == "createoredit") {
                            var companyProductRequiredCombo = companyProductDetailsStackableView.querySelector("select[id=\"business-type-combo\"]");
                            if (companyProductRequiredCombo) {
                                companyProductRequiredCombo.addEventListener("change", function (evt) {
                                    chooseRequiredCompanyProductDocument(parseInt(companyProductRequiredCombo.options[companyProductRequiredCombo.selectedIndex].value));
                                });
                            }

                            // choose default document to upload
                            if (companyProductRequiredCombo) {
                                chooseRequiredCompanyProductDocument(parseInt(companyProductRequiredCombo.options[0].value));
                            }

                            CreateOrEditCompanyCompanyProductComponent(viewObject.response);
                        }


                        // company uploaded documents
                        var companyProductDocuments = companyProductDetailsStackableView.querySelectorAll("div[company-document-item]");
                        Array.prototype.forEach.call(companyProductDocuments, function (companyProductDocument) {
                            companyProductDocument.addEventListener("click", function (evt) {
                                if (evt.button == 0) {
                                    pageLoader.show();
                                    try {
                                        $.get(baseUrl + "/companys/create", function (response) {
                                            pageLoader.hide();

                                            setTimeout(function () {
                                                PreviewCompanyCompanyProductDocumentComponent(response);
                                            }, 100);
                                        });
                                    } catch (e) {
                                        toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                        pageLoader.hide();
                                    }
                                }
                            });
                        });

                    };

                    getDetailsPage = function (data) {
                        pageLoader.show();
                        $.get(baseUrl + "/admin/companyproductdetails/" + data.companyProductId, function (response) {
                            pageLoader.hide();
                            toggleProductBrandDetailsView({
                                id: "preview-product-details",
                                response: response,
                                action: "details"
                            });
                        }).fail(function (error) {
                            pageLoader.hide();
                        });
                    };

                    // get first or default
                    if (companyProductsListGroupItems.length > 0) {
                        getDetailsPage({
                            companyProductId: companyProductsListGroupItems[0].getAttribute("data-product-id")
                        });
                    }

                }
            }
            init();

        }
    };
    CompanyDetailsComponent();
});