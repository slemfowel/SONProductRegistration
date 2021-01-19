window.addEventListener("DOMContentLoaded", function (evt) {
    ProductTypesComponent = function (evt) {
        if (document.getElementById("product-types-component")) {
            var productTypesComponent = document.getElementById("product-types-component");

            // activate material design features
            var matObject = activateMaterialDesign(productTypesComponent);

            init = function () {
                if (productTypesComponent) {

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

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-product-type-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/producttypes/search", data, function (response) {
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

                    var newProductTypeButton = document.getElementById("new-product-type-button");
                    if (newProductTypeButton) {
                        newProductTypeButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/admin/createproducttype", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditProductTypeComponent({
                                                action: "create",
                                                data: response
                                            });
                                        }, 100);
                                    });
                                } catch (e) {
                                    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var productTypesDatagridview = document.getElementById("product-types-datagridview");
                    var productTypesDatagridviewRows = productTypesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(productTypesDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    var typeId = this.getAttribute("data-product-type-id");
                                    $.get(baseUrl + "/admin/editproducttype/" + typeId, function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditProductTypeComponent({
                                                action: "details",
                                                data: response
                                            });
                                        }, 100);
                                    });
                                } catch (e) {
                                    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        });
                    });

                }
            }
            init();
        }
    };
    ProductTypesComponent();
});