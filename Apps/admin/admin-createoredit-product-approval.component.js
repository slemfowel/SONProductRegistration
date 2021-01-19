CreateOrEditProductApprovalComponent = function (response) {

    $('#createoredit-product-approval-modal').modal({ show: true });

    // initialize view
    var createOEditUserComponentView = document.getElementById("createoredit-product-approval-modal-view");
    createOEditUserComponentView.innerHTML = response;

    var createOrEditProductApprovalModal = document.getElementById("createoredit-product-approval-modal");
    var createOrEditProductApprovalModalHeader = createOrEditProductApprovalModal.querySelector("h5[class=\"modal-title\"]");
    createOrEditProductApprovalModalHeader.innerHTML = "Reason for Approval";

    var createOrEditProductApprovalComponent = document.getElementById("createoredit-product-approval-component");

    // activate material design features
    var matToastr = activateMaterialDesign(createOEditUserComponentView).matToastrEventHandler();

    var saveProductApprovalDetailsForm = createOEditUserComponentView.querySelector("form[id=\"createoredit-product-approval-form\"]");

    var saveProductApprovalDetailsButton = document.getElementById("save-product-approval-details-button");
    saveProductApprovalDetailsButton.addEventListener("click", function (evt) {
        try {
            var returnUrl = this.getAttribute("data-return-url");
            var productId = this.getAttribute("data-product-id");

            $('#createoredit-product-approval-modal').modal('hide');
            pageLoader.show();
            $.get(baseUrl + "/admin/approve-generate-demand-note/" + productId, function (response) {
                pageLoader.hide();
                document.location.href = returnUrl;
            });
        } catch (e) {
            // toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
            pageLoader.hide();
            $('#createoredit-product-approval-modal').modal('show');
        }

        evt.cancelBubble = true;
        evt.preventDefault();
    });
}