CreateOrEditProductTypeComponent = function (response) {
    $('#createoredit-product-type-modal').modal({ show: true });

    var createOEditProductTypeComponentModal = document.getElementById("createoredit-product-type-modal");
    var createOEditProductTypeComponentModalHeaderTitle = createOEditProductTypeComponentModal.querySelector("*[class=\"modal-title\"]");

    
    // initialize view
    var createOEditProductTypeComponentView = document.getElementById("createoredit-product-type-modal-view");
    if ("data" in response) {
        createOEditProductTypeComponentView.innerHTML = response.data;
    }

    // activate material design features
    var matObject = activateMaterialDesign(createOEditProductTypeComponentView);

    var createOEditProductTypeForm = createOEditProductTypeComponentView.querySelector("form[id=\"createoredit-product-type-form\"]");

    var saveProductTypeButton = document.getElementById("save-product-type-button");
    saveProductTypeButton.addEventListener("click", function (evt) {
        $('#createoredit-product-type-modal').modal('hide');
        createOEditProductTypeForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });


    if (("action" in response) && (response.action == "details")) {
        saveProductTypeButton.innerHTML = "Save Changes";
        createOEditProductTypeComponentModalHeaderTitle.innerHTML = "Details";
    } else {
        saveProductTypeButton.innerHTML = "Create";
        createOEditProductTypeComponentModalHeaderTitle.innerHTML = "Create product type";
    }
}