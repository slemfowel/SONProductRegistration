window.addEventListener("DOMContentLoaded", function (evt) {
    AdminProductDetailsComponent = function (evt) {
        if (document.getElementById("admin-product-details-component")) {
            var productDetailsComponent = document.getElementById("admin-product-details-component");
            var addProductBrandButton = document.getElementById("add-product-brand-button");
            var searchTextbox = document.getElementById("search-textbox");
            var productBrandDescriptionTitlebar = document.getElementById("product-brand-description-titlebar");
            var productBrandSearchbar = document.getElementById("product-brand-searchbar");
            var productBrandListGroup = document.getElementById("product-brand-list-group");

            var stackablePanel = null;

            // activate material design features
            var matObject = activateMaterialDesign(productDetailsComponent);

            // material event handler
            var matToastr = matObject.matToastrEventHandler();
            var matAlert = matObject.matAlertEventHandler();

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
                                    module: row.getAttribute("data-product-brand-module")
                                });

                            } catch (e) {
                                //
                            }
                        });
                    });

                    var productBrandDetailsStackableView = document.getElementById("product-brand-details-stackable-view-section");

                    getDetailsPage = function (data) {
                        pageLoader.show();
                        $.get(baseUrl + "/companyproductbrands/" + data.module + "/" + data.productBrandId, function (response) {
                            pageLoader.hide();

                            // deselect any previously selected brand details view
                            var productBrandDetailsStackableViewPanels = productBrandDetailsStackableView.getElementsByClassName("stackable-view-panel");
                            Array.prototype.forEach.call(productBrandDetailsStackableViewPanels, function (panelItem) {
                                panelItem.classList.remove("active");
                            });

                            // select brand details view
                            var selectedProductBrandDetailsStackableViewPanel = productBrandDetailsStackableView.querySelector("div[id=\"preview-brand-product-details\"]");
                            selectedProductBrandDetailsStackableViewPanel.classList.add("active");

                            selectedProductBrandDetailsStackableViewPanel.innerHTML = response;

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

                            // initial approve button
                            var approveProductButton = document.getElementById("approve-button");
                            if (approveProductButton) {
                                approveProductButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        var _this = this;
                                        matAlert.confirm({
                                            title: "Confirm Approval",
                                            message: "Are you sure you want to approve this registration?",
                                            okay: {
                                                label: "Yes, Sure!",
                                                click: function (evt) {
                                                    try {
                                                        var returnUrl = _this.getAttribute("data-return-url");
                                                        var productId = _this.getAttribute("data-product-id");

                                                        pageLoader.show();
                                                        $.get(baseUrl + "/admin/approve-generate-demand-note/" + productId, function (response) {
                                                            pageLoader.hide();
                                                            document.location.href = returnUrl;
                                                        });
                                                    } catch (e) {
                                                        pageLoader.hide();
                                                    }
                                                }
                                            }
                                        });
                                    }
                                })
                            }

                            // initial disapprove button
                            var disapproveProductButton = document.getElementById("disapprove-button");
                            if (disapproveProductButton) {
                                disapproveProductButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        var _this = this;
                                        matAlert.prompt({
                                            title: "Tell us your reason",
                                            message: "Are you sure you want to disapprove this registration?",
                                            okay: {
                                                label: "Continue",
                                                click: function (args) {
                                                    try {
                                                        var returnUrl = _this.getAttribute("data-return-url");
                                                        var productId = _this.getAttribute("data-product-id");

                                                        var data = {
                                                            ApprovalStatus: 2,
                                                            CompanyProductID: productId,
                                                            Reason: args.text
                                                        };
                                                        pageLoader.show();
                                                        $.post(baseUrl + "/admin/disapprove-product-registration", data, function (response) {
                                                            //pageLoader.hide();
                                                            console.log(response);
                                                            document.location.href = returnUrl;
                                                        }).fail(function (error) {
                                                            pageLoader.hide();
                                                        });
                                                    } catch (e) {
                                                        pageLoader.hide();
                                                    }
                                                }
                                            }
                                        });


                                    }
                                })
                            }

                            // initial confirm payment button
                            var confirmPaymentButton = document.getElementById("confirm-payment-button");
                            if (confirmPaymentButton) {
                                confirmPaymentButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        var _this = this;
                                        matAlert.confirm({
                                            title: "Confirm Payment",
                                            message: "Are you sure you want to confirm payment for this product?",
                                            okay: {
                                                label: "Yes, Sure!",
                                                click: function (evt) {
                                                    try {
                                                        var returnUrl = _this.getAttribute("data-return-url");
                                                        var productId = _this.getAttribute("data-product-id");

                                                        pageLoader.show();
                                                        $.get(baseUrl + "/admin/confirm-payment/" + productId, function (response) {
                                                            //    pageLoader.hide();
                                                            document.location.href = returnUrl;
                                                        });
                                                    } catch (e) {
                                                        pageLoader.hide();
                                                    }
                                                }
                                            }
                                        });
                                    }
                                })
                            }

                            // initial schedule for inspection button
                            var scheduleForInspectionButton = document.getElementById("schedule-for-inspection-button");
                            if (scheduleForInspectionButton) {
                                scheduleForInspectionButton.addEventListener("mousedown", function (evt) {
                                    if (evt.button == 0) {
                                        pageLoader.show();
                                        try {
                                            $.get(baseUrl + "/admin/selectinspectorforinspection/" + scheduleForInspectionButton.getAttribute("data-product-id"), function (response) {
                                                pageLoader.hide();
                                                setTimeout(function () {
                                                    CreateOrEditInspectionScheduleComponent(response);
                                                }, 100);
                                            });
                                        } catch (e) {
                                            //    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                            pageLoader.hide();
                                        }
                                    }
                                })
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

                        }).fail(function (error) {
                            pageLoader.hide();
                        });
                    };

                    // get first or default
                    if (productBrandsDatagridviewRows.length > 0) {
                        getDetailsPage({
                            productBrandId: productBrandsDatagridviewRows[0].getAttribute("data-product-brand-id"),
                            module: productBrandsDatagridviewRows[0].getAttribute("data-product-brand-module")
                        });
                    }

                }
            }
            init();
        }
    }
    AdminProductDetailsComponent();

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