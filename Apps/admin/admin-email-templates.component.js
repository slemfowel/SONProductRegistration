window.addEventListener("DOMContentLoaded", function (evt) {
    EmailTemplatesComponent = function (evt) {
        if (document.getElementById("email-templates-component")) {
            var emailTemplatesComponent = document.getElementById("email-templates-component");

            // activate material design features
            var matObject = activateMaterialDesign(emailTemplatesComponent);

            init = function () {
                if (emailTemplatesComponent) {

                    var searchTextbox = document.getElementById("search-textbox");
                    var searchButton = document.getElementById("search-email-template-button");
                    if (searchButton) {
                        searchButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();

                                try {
                                    var data = {
                                        SearchText: searchTextbox.value
                                    };
                                    $.post(baseUrl + "/admin/emailtemplates", data, function (response) {
                                        document.location.href = baseUrl + "/admin/emailtemplates";
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

                    var newEmailTemplateButton = document.getElementById("new-email-template-button");
                    if (newEmailTemplateButton) {
                        newEmailTemplateButton.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    $.get(baseUrl + "/admin/createemailtemplate", function (response) {
                                        pageLoader.hide();

                                        setTimeout(function () {
                                            CreateOrEditEmailTemplateComponent({
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

                    var emailTemplatesDatagridview = document.getElementById("email-templates-datagridview");
                    var emailTemplatesDatagridviewRows = emailTemplatesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
                    Array.prototype.forEach.call(emailTemplatesDatagridviewRows, function (row) {
                        row.addEventListener("mousedown", function (evt) {
                            if (evt.button == 0) {
                                pageLoader.show();
                                try {
                                    var templateId = this.getAttribute("data-template-id");
                                    $.get(baseUrl + "/admin/editemailtemplate/" + templateId, function (response) {
                                        pageLoader.hide();
                                        setTimeout(function () {
                                            CreateOrEditEmailTemplateComponent({
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
    EmailTemplatesComponent();
});