window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyProductsDueForRenewalComponent = function (evt) {
        var manageProductsListingComponent = document.getElementById("manage-products-listing-component");
        var productDetailsComponent = document.getElementById("product-details-component");

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
                            pageLoader.show();

                            var dateObject = new Date();

                            var startDateObj = startDateTimePicker.value.split("-");
                            var startDate = new Date(startDateObj[2], (startDateObj[1] - 1), startDateObj[0], dateObject.getHours(), dateObject.getMinutes(), dateObject.getDate());
                            var endDateObj = endDateTimePicker.value.split("-");
                            var endDate = new Date(endDateObj[2], (endDateObj[1] - 1), endDateObj[0], dateObject.getHours(), dateObject.getMinutes(), dateObject.getDate());

                            try {
                                var data = {
                                    SearchText: searchTextbox.value,
                                    StartDate: startDate.toISOString(),
                                    EndDate: endDate.toISOString()
                                };
                                $.post(baseUrl + "/products/search", data, function (response) {
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

                var newProductRegistrationButton = document.getElementById("new-product-registration-button");
                if (newProductRegistrationButton) {
                    newProductRegistrationButton.addEventListener("mousedown", function (evt) {
                        if (evt.button == 0) {
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
                    })
                }

                var registeredProductsDatagridview = document.getElementById("registered-products-datagridview");
                var registeredProductsDatagridviewRows = registeredProductsDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                Array.prototype.forEach.call(registeredProductsDatagridviewRows, function (row) {
                    row.addEventListener("mousedown", function (evt) {
                        pageLoader.show();
                        setTimeout(function () {
                            document.location.href = baseUrl + row.getAttribute("href");
                        }, 500);
                    });
                });

            }
        }
        init();
    }
});