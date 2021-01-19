window.addEventListener("DOMContentLoaded", function (evt) {
    ProductCategorySectorsComponent = function (evt) {
        if (document.getElementById("product-category-sectors-component")) {
            var productCategorySectorsComponent = document.getElementById("product-category-sectors-component");

            // activate material design features
            var matObject = activateMaterialDesign(productCategorySectorsComponent);

            init = function () {
                if (productCategorySectorsComponent) {

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-product-category-sector-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/productcategories/search", data, function (response) {
                                        console.log(response);
                                        document.location.href = "./index";
                                        document.addEventListener("readystatechange", function (evt) {
                                            pageLoader.hide();
                                        });
                                    });
                                } catch (e) {
                                    //toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var newProductCategoryButton = document.getElementById("new-product-category-sector-button");
                    if (newProductCategoryButton) {
                        newProductCategoryButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/admin/createsector", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditProductCategorySectorComponent({
                                                action: "create",
                                                data: response
                                            });
                                        }, 100);
                                    });
                                } catch (e) {
                                    //toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var productCategorySectorsDatagridview = document.getElementById("product-category-sectors-datagridview");
                    var productCategorySectorsDatagridviewRows = productCategorySectorsDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(productCategorySectorsDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    var sectorId = this.getAttribute("data-sector-id");
                                    $.get(baseUrl + "/admin/editsector/" + sectorId, function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditProductCategorySectorComponent({
                                                action: "details",
                                                data: response
                                            });
                                        }, 100);
                                    });
                                } catch (e) {
                                    //toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
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
    ProductCategorySectorsComponent();
});