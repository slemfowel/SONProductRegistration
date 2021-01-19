window.addEventListener("DOMContentLoaded", function (evt) {
    ProductCategoriesComponent = function (evt) {
        if (document.getElementById("product-categories-component")) {
            var productCategoriesComponent = document.getElementById("product-categories-component");

            // activate material design features
            var matObject = activateMaterialDesign(productCategoriesComponent);

            init = function () {
                if (productCategoriesComponent) {

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-product-category-button");
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

                    var newProductCategoryButton = document.getElementById("new-product-category-button");
                    if (newProductCategoryButton) {
                        newProductCategoryButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/admin/createproductcategory", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditProductCategoryComponent({
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

                    var productCategoriesDatagridview = document.getElementById("product-categories-datagridview");
                    var productCategoriesDatagridviewRows = productCategoriesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(productCategoriesDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    var categoryId = this.getAttribute("data-product-category-id");
                                    $.get(baseUrl + "/admin/editproductcategory/" + categoryId, function (response) {
                                        pageLoader.hide();
                                        setTimeout(function () {
                                            CreateOrEditProductCategoryComponent({
                                                action: "details",
                                                data: response
                                            });
                                        }, 100);
                                    });
                                } catch (e) {
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
    ProductCategoriesComponent();
});