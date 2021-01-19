CreateOrEditCompanyProductComponent = function (response) {
    bindProductCategoryTypesDatagridview = function (productCategoryTypesDatagridviewRows) {
        Array.prototype.forEach.call(productCategoryTypesDatagridviewRows, function (row) {
            row.addEventListener("mousedown", function (evt) {
                Array.prototype.forEach.call(productCategoryTypesDatagridviewRows, function (row) {
                    var checkBox = row.querySelector("input[type=\"radio\"]");
                    checkBox.checked = false;
                });

                var checkBox = row.querySelector("input[type=\"radio\"]");
                checkBox.click();
            });

            var checkBox = row.querySelector("input[type=\"radio\"]");
            checkBox.addEventListener("mousedown", function (evt) {
                checkBox.checked = true;
            });
        });
        if (productCategoryTypesDatagridviewRows.length > 0) {
            var checkBox = productCategoryTypesDatagridviewRows[0].querySelector("input[type=\"radio\"]");
            checkBox.checked = true;
        }
    }

    $('#createoredit-product-modal').modal({ show: true });

    // initialize view
    var createOEditProductComponentView = document.getElementById("createoredit-product-modal-view");
    createOEditProductComponentView.innerHTML = response;

    // activate material design features
    var matObject = activateMaterialDesign(createOEditProductComponentView);
    matObject.matInputFieldEventHandler("product-name-input-field", {
        keyup: function (args) {
            var isSelected = false;
            Array.prototype.forEach.call(productCategoryTypesDatagridviewRows, function (row) {
                var checkBox = row.querySelector("input[type=\"radio\"]");
                if (checkBox.checked) {
                    isSelected = true;
                }
            });

            if (args.value.length > 0 && isSelected) {
                saveProductRegistrationButton.removeAttribute("disabled");
            } else {
                saveProductRegistrationButton.setAttribute("disabled", "disabled");
            }
        }
    });

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
            error: function (error) {
                console.log(error);
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
}