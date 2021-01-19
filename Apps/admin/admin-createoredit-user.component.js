CreateOrEditUserComponent = function (response) {

    $('#createoredit-user-modal').modal({ show: true });
    var createOEditUserComponentModal = document.getElementById("createoredit-user-modal");
    var createOEditUserComponentModalHeader = createOEditUserComponentModal.querySelector("*[class=\"modal-header\"]");
    var createOEditUserComponentModalHeaderTitle = createOEditUserComponentModalHeader.querySelector("*[class=\"modal-title\"]");
    var createOEditUserComponentModalFooter = createOEditUserComponentModal.querySelector("*[class=\"modal-footer\"]");
    var createOEditUserComponentModalSaveButton = createOEditUserComponentModalFooter.querySelector("*[class=\"modal-title\"]");
    var emailInputField = document.getElementById("Email");

    // initialize view
    var createOEditUserComponentView = document.getElementById("createoredit-user-modal-view");
    if ("data" in response) {
        createOEditUserComponentView.innerHTML = response.data;
    }

    // activate material design features
    var matObject = activateMaterialDesign(createOEditUserComponentView);
    var createOEditUserForm = createOEditUserComponentView.querySelector("form[id=\"createoredit-user-form\"]");

    var saveUserButton = document.getElementById("save-user-details-button");
    saveUserButton.addEventListener("click", function (evt) {
        $('#createoredit-user-modal').modal('hide');
        createOEditUserForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    if (("action" in response) && (response.action == "create")) {
        createOEditUserComponentModalHeaderTitle.innerHTML = "Create New User";
        saveUserButton.innerHTML = "Create";
    } else {
        createOEditUserComponentModalHeaderTitle.innerHTML = "User Details";
        saveUserButton.innerHTML = "Save Changes";
    }
}