window.addEventListener("DOMContentLoaded", function (evt) {
    RoleManagementComponent = function () {
        if (document.getElementById("roles-component")) {
            var rolesComponent = document.getElementById("roles-component");
            console.log(rolesComponent);

            // activate material design features
            var matObject = activateMaterialDesign(rolesComponent);

            init = function () {
                if (rolesComponent) {

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

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-role-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/roles/search", data, function (response) {
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

                    var newRoleButton = document.getElementById("new-role-button");
                    if (newRoleButton) {
                        newRoleButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/roles/create", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditRoleComponent(response);
                                        }, 100);
                                    });
                                } catch (e) {
                                    toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                                    pageLoader.hide();
                                }
                            }
                        })
                    }

                    var rolesDatagridview = document.getElementById("roles-datagridview");
                    var rolesDatagridviewRows = rolesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(rolesDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            // document.location.href = baseUrl + row.getAttribute("href");
                        });
                    });

                }
            }
            init();
        }
    };
    RoleManagementComponent();
});