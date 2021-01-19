window.addEventListener("DOMContentLoaded", function (evt) {
    UserComponent = function () {
        if (document.getElementById("users-component")) {
            var usersComponent = document.getElementById("users-component");

            // activate material design features
            var matObject = activateMaterialDesign(usersComponent);

            init = function () {
                if (usersComponent) {

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-user-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/users/search", data, function (response) {
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

                    var newUserButton = document.getElementById("new-user-button");
                    if (newUserButton) {
                        newUserButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/users/create", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditUserComponent({
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

                    var usersDatagridview = document.getElementById("users-datagridview");
                    var usersDatagridviewRows = usersDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(usersDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    var userId = this.getAttribute("data-user-id");
                                    $.get(baseUrl + "/users/edit/" + userId, function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditUserComponent({
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
    UserComponent();
});