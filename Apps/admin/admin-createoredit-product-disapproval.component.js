CreateOrEditProductDisapprovalComponent = function (response) {

    $('#createoredit-product-disapproval-modal').modal({ show: true });

    // initialize view
    var createOEditUserComponentView = document.getElementById("createoredit-product-disapproval-modal-view");
    createOEditUserComponentView.innerHTML = response;

    var createOrEditProductDisapprovalModal = document.getElementById("createoredit-product-disapproval-modal");
    var createOrEditProductDisapprovalModalHeader = createOrEditProductDisapprovalModal.querySelector("h5[class=\"modal-title\"]");
    createOrEditProductDisapprovalModalHeader.innerHTML = "Reason for Disapproval";

    var createOrEditProductDisapprovalComponent = document.getElementById("createoredit-product-disapproval-component");

    // activate material design features
    activateMaterialDesign(createOEditUserComponentView);

    var saveProductDisapprovalDetailsForm = createOEditUserComponentView.querySelector("form[id=\"createoredit-product-disapproval-form\"]");

    var saveProductDisapprovalDetailsButton = document.getElementById("save-product-disapproval-details-button");
    saveProductDisapprovalDetailsButton.addEventListener("click", function (evt) {
        try {
            var returnUrl = this.getAttribute("data-return-url");
            var productId = this.getAttribute("data-product-id");

            $('#createoredit-product-disapproval-modal').modal('hide');
            pageLoader.show();
            $.get(baseUrl + "/admin/disapprove-product-registration/" + productId, function (response) {
                pageLoader.hide();
                document.location.href = returnUrl;
            });
        } catch (e) {
            // toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
            pageLoader.hide();
            $('#createoredit-product-disapproval-modal').modal('show');
        }

        evt.cancelBubble = true;
        evt.preventDefault();
    });
}