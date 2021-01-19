window.addEventListener("DOMContentLoaded", function (evt) {
    AdminProductsComponent = function (evt) {
        if (document.getElementById("admin-products-component")) {
            var manageProductsListingComponent = document.getElementById("manage-products-listing-component");
            var productDetailsComponent = document.getElementById("product-details-component");

            // activate material design features
            var matObject = activateMaterialDesign(manageProductsListingComponent);

            // toastr event handler
            var matToastr = matObject.matToastrEventHandler();

            init = function () {
                if (manageProductsListingComponent) {

                    // DataTime Picker
                    $("#start-date-picker").datepicker({
                        dateFormat: 'dd-mm-yy'
                    });
                    var startDate = new Date();
                    startDate.setUTCDate(startDate.getDate() - 7);
                    $("#start-date-picker").datepicker("setDate", startDate);
                    $("#end-date-picker").datepicker({
                        dateFormat: 'dd-mm-yy'
                    });
                    $("#end-date-picker").datepicker("setDate", new Date());

                    var startDateTimePicker = document.getElementById("start-date-picker");
                    if (startDateTimePicker.hasAttribute("date-value") && startDateTimePicker.getAttribute("date-value") != "") {
                        var startDate = new Date(startDateTimePicker.getAttribute("date-value"));
                        $("#start-date-picker").datepicker("setDate", startDate);
                    }

                    var endDateTimePicker = document.getElementById("end-date-picker");
                    if (endDateTimePicker.hasAttribute("date-value") && endDateTimePicker.getAttribute("date-value") != "") {
                        var endDate = new Date(endDateTimePicker.getAttribute("date-value"));
                        $("#end-date-picker").datepicker("setDate", endDate);
                    }

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchProductsButton = document.getElementById("search-products-button");
                    if (searchProductsButton) {
                        searchProductsButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {

                                var dateObject = new Date();

                                var startDateObj = startDateTimePicker.value.split("-");
                                var startDate = new Date(startDateObj[2], (startDateObj[1] - 1), startDateObj[0], dateObject.getHours(), dateObject.getMinutes(), dateObject.getDate());
                                var endDateObj = endDateTimePicker.value.split("-");
                                var endDate = new Date(endDateObj[2], (endDateObj[1] - 1), endDateObj[0], dateObject.getHours(), dateObject.getMinutes(), dateObject.getDate());

                                try {
                                    pageLoader.show();

                                    var data = {
                                        SearchText: searchTextbox.value,
                                        StartDate: startDate.toISOString(),
                                        EndDate: endDate.toISOString()
                                    };
                                    $.post(baseUrl + "/products/search", data, function (response) {
                                        matToastr.success({
                                            title: "",
                                            message: "Congratulations, your search was successful."
                                        });
                                        document.location.href = "./index";
                                        document.addEventListener("readystatechange", function (evt) {
                                            pageLoader.hide();
                                        });
                                    }).fail(function (reponse) {
                                        matToastr.error({
                                            title: "",
                                            message: "Oops! your search failed."
                                        });
                                        pageLoader.hide();
                                    }).abort(function (response) {
                                        matToastr.error({
                                            title: "",
                                            message: "Search was aborted."
                                        });
                                        pageLoader.hide();
                                    });
                                } catch (e) {
                                    matToastr.error({
                                        title: "",
                                        message: "Oops! something went wrong, please try again later."
                                    });
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var newProductRegistrationButton = document.getElementById("new-product-registration-button");
                    if (newProductRegistrationButton) {
                        newProductRegistrationButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                createNewProductRegistrationForm();
                            }
                        })
                    }

                    var registeredProductsDatagridview = document.getElementById("products-datagridview");
                    var registeredProductsDatagridviewRows = registeredProductsDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(registeredProductsDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                setTimeout(function () {
                                    document.location.href = baseUrl + row.getAttribute("href");
                                }, 500);
                            }
                        });
                    });

                }
            }
            init();

            createNewProductRegistrationForm = function () {
                pageLoader.show();
                try {
                    $.get(baseUrl + "/my/createproduct", function (response) {
                        pageLoader.hide();

                        setTimeout(function () {
                            CreateOrEditCompanyProductComponent(response);
                        }, 100);
                    });
                } catch (e) {
                    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                    pageLoader.hide();
                }
            }
        }
    }
    AdminProductsComponent();
});