window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyComponent = function () {
        if (document.getElementById("companies-component")) {
            var companiesComponent = document.getElementById("companies-component");

            // activate material design features
            var matObject = activateMaterialDesign(companiesComponent);

            init = function () {
                if (companiesComponent) {

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-company-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/companies/search", data, function (response) {
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

                    var newCompanyButton = document.getElementById("new-company-button");
                    if (newCompanyButton) {
                        newCompanyButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/companies/create", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditCompanyComponent(response);
                                        }, 100);
                                    });
                                } catch (e) {
                                    //toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var companiesDatagridview = document.getElementById("companies-datagridview");
                    var companiesDatagridviewRows = companiesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(companiesDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                console.log(baseUrl + row.getAttribute("href"));
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
        }
    };
    CompanyComponent();
});
