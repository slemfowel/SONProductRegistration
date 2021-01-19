CreateOrEditEmailTemplateComponent = function (response) {
    $('#createoredit-email-template-modal').modal({ show: true });

    var createOEditEmailTemplateComponentModal = document.getElementById("createoredit-email-template-modal");
    var createOEditEmailTemplateComponentModalHeaderTitle = createOEditEmailTemplateComponentModal.querySelector("*[class=\"modal-title\"]");

    // initialize view
    var createOEditEmailTemplateComponentView = document.getElementById("createoredit-email-template-modal-view");
    if ("data" in response) {
        createOEditEmailTemplateComponentView.innerHTML = response.data;

        // enable summer note
        $('.summernote').summernote({
            airMode: false
        });
    }

    // activate material design features
    var matObject = activateMaterialDesign(createOEditEmailTemplateComponentView);

    var createOEditEmailTemplateForm = createOEditEmailTemplateComponentView.querySelector("form[id=\"createoredit-email-template-form\"]");

    var saveEmailTemplateButton = document.getElementById("save-email-template-button");
    saveEmailTemplateButton.addEventListener("click", function (evt) {
        $('#createoredit-email-template-modal').modal('hide');
        createOEditEmailTemplateForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });


    if (("action" in response) && (response.action == "details")) {
        saveEmailTemplateButton.innerHTML = "Save Changes";
        createOEditEmailTemplateComponentModalHeaderTitle.innerHTML = "Details";
    } else {
        saveEmailTemplateButton.innerHTML = "Create";
        createOEditEmailTemplateComponentModalHeaderTitle.innerHTML = "Create product type";
    }
}