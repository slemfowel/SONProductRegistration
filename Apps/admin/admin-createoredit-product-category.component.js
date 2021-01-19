CreateOrEditProductCategoryComponent = function (response) {
    $('#createoredit-product-category-modal').modal({ show: true });

    var createOEditProductCategoryComponentModal = document.getElementById("createoredit-product-category-modal");
    var createOEditProductCategoryComponentModalHeaderTitle = createOEditProductCategoryComponentModal.querySelector("*[class=\"modal-title\"]");

    // initialize view
    var createOrEditProductCategoryComponentView = document.getElementById("createoredit-product-category-modal-view");
    if ("data" in response) {
        createOrEditProductCategoryComponentView.innerHTML = response.data;
    }

    // activate material design features
    var matObject = activateMaterialDesign(createOrEditProductCategoryComponentView);

    var createOrEditProductCategoryForm = createOrEditProductCategoryComponentView.querySelector("form[id=\"createoredit-product-category-form\"]");

    var saveProductCategoryButton = document.getElementById("save-product-category-button");
    saveProductCategoryButton.addEventListener("click", function (evt) {
        $('#createoredit-product-category-modal').modal('hide');
        createOrEditProductCategoryForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });
    
    if (("action" in response) && (response.action == "details")) {
        saveProductCategoryButton.innerHTML = "Save Changes";
        createOEditProductCategoryComponentModalHeaderTitle.innerHTML = "Details";
    } else {
        saveProductCategoryButton.innerHTML = "Create";
        createOEditProductCategoryComponentModalHeaderTitle.innerHTML = "Create product type";
    }
}