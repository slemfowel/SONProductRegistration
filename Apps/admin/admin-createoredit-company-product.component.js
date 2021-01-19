CreateOrEditCompanyProductComponent = function (response) {

    // var createOEditProductComponent = document.getElementById("createoredit-product-component");
    // if (createOEditProductComponent) {

    bindProductCategoryTypesDatagridview = function (productCategoryTypesDatagridviewRows) {
        Array.prototype.forEach.call(productCategoryTypesDatagridviewRows, function (row) {
            row.addEventListener("mousedown", function (evt) {
                Array.prototype.forEach.call(productCategoryTypesDatagridviewRows, function (row) {
                    var checkBox = row.querySelector("input[type=\"checkbox\"]");
                    checkBox.checked = false;
                });

                var checkBox = row.querySelector("input[type=\"checkbox\"]");
                checkBox.click();
            });
        });
    }

    $('#createoredit-product-modal').modal({ show: true });

    // initialize view
    var createOEditProductComponentView = document.getElementById("createoredit-product-modal-view");
    createOEditProductComponentView.innerHTML = response;

    var createOEditProductRegistrationForm = createOEditProductComponentView.querySelector("form[id=\"createoredit-product-registration-form\"]");

    var productCategoriesCombo = document.getElementById("Product-category-combo");
    productCategoriesCombo.addEventListener("change", function (evt) {
        $.ajax({
            type: "GET",
            url: baseUrl + "/producttypes/getproducttypesbycategoryid/" + this.options[this.selectedIndex].value,
            success: function (response) {
                var productTypeGridContainer = document.getElementById('product-type-grid-container');
                productTypeGridContainer.innerHTML = response;

                var productCategoryTypesDatagridviewRows = productTypeGridContainer.querySelectorAll("tr[aria-datagrid-row]");
                bindProductCategoryTypesDatagridview(productCategoryTypesDatagridviewRows);
            },
            error: function () {
                alert("Content load failed.");
            }
        });
    });

    var productCategoryTypesDatagridview = document.getElementById("product-category-type-datagridview");
    var productCategoryTypesDatagridviewRows = productCategoryTypesDatagridview.querySelectorAll("tr[aria-datagrid-row]");
    bindProductCategoryTypesDatagridview(productCategoryTypesDatagridviewRows);

    var saveProductRegistrationButton = document.getElementById("save-product-registration-button");
    saveProductRegistrationButton.addEventListener("click", function (evt) {
        $('#createoredit-product-modal').modal('hide');
        createOEditProductRegistrationForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    createOEditProductRegistrationForm.addEventListener('submit', function (evt) {
        alert("Hello People");
        evt.preventDefault();
    });
    // }
}
