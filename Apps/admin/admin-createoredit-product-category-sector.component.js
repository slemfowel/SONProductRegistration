CreateOrEditProductCategorySectorComponent = function (response) {
    $('#createoredit-product-category-sector-modal').modal({ show: true });

    var createOEditProductCategorySectorComponentModal = document.getElementById("createoredit-product-category-sector-modal");
    var createOEditProductCategorySectorComponentModalHeaderTitle = createOEditProductCategorySectorComponentModal.querySelector("*[class=\"modal-title\"]");

    // initialize view
    var createOrEditProductCategorySectorComponentView = document.getElementById("createoredit-product-category-sector-modal-view");
    if ("data" in response) {
        createOrEditProductCategorySectorComponentView.innerHTML = response.data;
    }

    // activate material design features
    var matObject = activateMaterialDesign(createOrEditProductCategorySectorComponentView);

    var createOrEditProductCategorySectorForm = createOrEditProductCategorySectorComponentView.querySelector("form[id=\"createoredit-product-category-sector-form\"]");

    var saveProductCategorySectorButton = document.getElementById("save-product-category-sector-button");
    saveProductCategorySectorButton.addEventListener("click", function (evt) {
        $('#createoredit-product-category-sector-modal').modal('hide');
        createOrEditProductCategorySectorForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    if (("action" in response) && (response.action == "details")) {
        saveProductCategorySectorButton.innerHTML = "Save Changes";
        createOEditProductCategorySectorComponentModalHeaderTitle.innerHTML = "Details";
    } else {
        saveProductCategorySectorButton.innerHTML = "Create";
        createOEditProductCategorySectorComponentModalHeaderTitle.innerHTML = "Create product type";
    }
}