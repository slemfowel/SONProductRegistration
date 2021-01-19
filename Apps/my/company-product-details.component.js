window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyProductDetailsComponent = function (evt) {
        if (document.getElementById("company-product-details-component")) {
            var productDetailsComponent = document.getElementById("company-product-details-component");
            var addProductBrandButton = document.getElementById("add-product-brand-button");
            var searchTextbox = document.getElementById("search-textbox");
            var productBrandDescriptionTitlebar = document.getElementById("product-brand-description-titlebar");
            var productBrandSearchbar = document.getElementById("product-brand-searchbar");
            var productBrandListGroup = document.getElementById("product-brand-list-group");

            var stackablePanel = null;

            createNewProductBrandForm = function () {
                try {
                    pageLoader.show();
                    $.get(baseUrl + "/companyproductbrands/create/" + addProductBrandButton.getAttribute("data-product-id"), function (response) {
                        pageLoader.hide();

                        // check if response is an object or partial view
                        toggleBrandProductDetailsView({
                            id: "createoredit-brand-product-details-form",
                            response: response,
                            action: "createoredit"
                        });
                    });
                } catch (e) {
                    // toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                    pageLoader.hide();
                }
            }

            init = function () {
                if (productDetailsComponent) {

                    var productBrandListGroupTopPos = productBrandDescriptionTitlebar.offsetHeight + productBrandSearchbar.offsetHeight;
                    productBrandListGroup.setAttribute("style", "top:" + productBrandListGroupTopPos + "px;");

                    var searchProductsButton = document.getElementById("search-products-button");
                    if (searchProductsButton) {
                        searchProductsButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value,
                                    };
                                    $.post(baseUrl + "/companyproductbrands/search", data, function (response) {
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

                    if (addProductBrandButton) {
                        addProductBrandButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                createNewProductBrandForm();
                            }
                        })
                    }

                    // sidebar brand listing
                    var productBrandsDatagridview = document.getElementById("product-brand-list-group");
                    var productBrandsDatagridviewRows = productBrandsDatagridview.querySelectorAll("a[list-group-item]");
                    Array.prototype.forEach.call(productBrandsDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            try {
                                Array.prototype.forEach.call(productBrandsDatagridviewRows, function (row) {
                                    row.classList.remove("active");
                                });
                                row.classList.add("active");

                                getDetailsPage({
                                    productBrandId: row.getAttribute("data-product-brand-id"),
                                    status: row.getAttribute("data-product-brand-status")
                                });

                            } catch (e) {
                                //
                            }
                        });
                    });

                    var productBrandDetailsStackableView = document.getElementById("product-brand-details-stackable-view-section");
                    var productBrandRequiredCombo = productBrandDetailsStackableView.querySelector("select[id=\"business-type-combo\"]");

                    chooseRequiredProductBrandDocument = function (value) {
                        var productBrandRequiredDocuments = productBrandDetailsStackableView.querySelector("div[id=\"required-documents\"]");
                        var selectedProductBrandDetailsRequiredDocuments = productBrandDetailsStackableView.querySelectorAll("div[required-document]");

                        var selectedTypeOfBusinessRequirement;
                        Array.prototype.forEach.call(selectedProductBrandDetailsRequiredDocuments, function (item) {
                            item.classList.add("hide");
                            productBrandRequiredDocuments.classList.add("hide");

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
                            productBrandRequiredDocuments.classList.remove("hide");
                        }
                    };

                    toggleBrandProductDetailsView = function (viewObject) {

                        // deselect any previously selected brand details view
                        var productBrandDetailsStackableViewPanels = productBrandDetailsStackableView.getElementsByClassName("stackable-view-panel");
                        Array.prototype.forEach.call(productBrandDetailsStackableViewPanels, function (panelItem) {
                            panelItem.classList.remove("active");
                        });

                        // select brand details view
                        var selectedProductBrandDetailsStackableViewPanel = productBrandDetailsStackableView.querySelector("div[id=\"" + viewObject.id + "\"]");
                        selectedProductBrandDetailsStackableViewPanel.classList.add("active");

                        if ("response" in viewObject) {
                            selectedProductBrandDetailsStackableViewPanel.innerHTML = viewObject.response;

                            // initialize response page
                            var editProductBrandButton = document.getElementById("edit-product-brand-button");
                            if (editProductBrandButton) {
                                editProductBrandButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        try {
                                            pageLoader.show();
                                            $.get(baseUrl + "/companyproductbrands/edit/" + editProductBrandButton.getAttribute("data-product-id"), function (response) {
                                                pageLoader.hide();

                                                toggleBrandProductDetailsView({
                                                    id: "createoredit-brand-product-details-form",
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
                        }
                        
                        if (("action" in viewObject) && viewObject.action == "createoredit") {
                            var productBrandRequiredCombo = productBrandDetailsStackableView.querySelector("select[id=\"business-type-combo\"]");
                            if (productBrandRequiredCombo) {
                                productBrandRequiredCombo.addEventListener("change", function (evt) {
                                    chooseRequiredProductBrandDocument(parseInt(productBrandRequiredCombo.options[productBrandRequiredCombo.selectedIndex].value));
                                });
                            }

                            // choose default document to upload
                            if (productBrandRequiredCombo) {
                                chooseRequiredProductBrandDocument(parseInt(productBrandRequiredCombo.options[0].value));
                            }

                            CreateOrEditCompanyProductBrandComponent(viewObject.response);
                        }


                        // product uploaded documents
                        var productBrandDocuments = productBrandDetailsStackableView.querySelectorAll("div[product-document-item]");
                        Array.prototype.forEach.call(productBrandDocuments, function (productBrandDocument) {
                            productBrandDocument.addEventListener("click", function (evt) {
                                if (evt.button == 0) {
                                    pageLoader.show();
                                    try {
                                        $.get(baseUrl + "/products/create", function (response) {
                                            pageLoader.hide();

                                            setTimeout(function () {
                                                PreviewCompanyProductBrandDocumentComponent(response);
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
                        if (parseInt(data.status)) {
                            pageLoader.show();
                            $.get(baseUrl + "/companyproductbrands/details/" + data.productBrandId, function (response) {
                                pageLoader.hide();
                                toggleBrandProductDetailsView({
                                    id: "preview-brand-product-details",
                                    response: response,
                                    action: "details"
                                });
                            }).fail(function (error) {
                                pageLoader.hide();
                            });
                        } else {
                            createNewProductBrandForm();
                        }
                    };

                    // get first or default
                    if (productBrandsDatagridviewRows.length > 0) {
                        getDetailsPage({
                            productBrandId: productBrandsDatagridviewRows[0].getAttribute("data-product-brand-id"),
                            status: productBrandsDatagridviewRows[0].getAttribute("data-product-brand-status")
                        });
                    }

                }
            }
            init();
        }
    }
    CompanyProductDetailsComponent();

    PreviewCompanyProductBrandDocumentComponent = function (response) {

        $('#product-document-preview-modal').modal({ show: true });

        // initialize view
        var productDocumentPreviewModalView = document.getElementById("product-document-preview-modal-view");
        productDocumentPreviewModalView.innerHTML = response;

        var createOEditProductRegistrationForm = productDocumentPreviewModalView.querySelector("form[id=\"createoredit-product-registration-form\"]");

        var productCategoriesCombo = document.getElementById("Product-category-combo");
        productCategoriesCombo.addEventListener("change", function (evt) {
            $.ajax({
                type: "GET",
                url: baseUrl + "/producttypes/getproducttypesbycategoryid/" + this.options[this.selectedIndex].value,
                success: function (response) {
                    var productTypeGridContainer = document.getElementById('product-type-grid-container');
                    productTypeGridContainer.innerHTML = response;
                },
                error: function () {
                    alert("Content load failed.");
                }
            });
        });

        var saveProductRegistrationButton = document.getElementById("save-product-registration-button");
        saveProductRegistrationButton.addEventListener("click", function (evt) {
            $('#createoredit-product-modal').modal('hide');
            console.log(createOEditProductRegistrationForm);
            createOEditProductRegistrationForm.submit();
            pageLoader.show();
            evt.cancelBubble = true;
            evt.preventDefault();
        });

        // var productDocumentPreviewModalView = document.getElementById("transaction-createoredit-view-form");

        createOEditProductRegistrationForm.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        // }
    }
});