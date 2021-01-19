CreateOrEditRoleComponent = function (response) {

    $('#createoredit-role-modal').modal({ show: true });

    // initialize view
    var createOEditRoleComponentView = document.getElementById("createoredit-role-modal-view");
    createOEditRoleComponentView.innerHTML = response;

    // activate material design features
    var matObject = activateMaterialDesign(createOEditRoleComponentView);

    var createOEditRoleForm = createOEditRoleComponentView.querySelector("form[id=\"createoredit-role-form\"]");

    var saveRoleButton = document.getElementById("save-role-details-button");
    saveRoleButton.addEventListener("click", function (evt) {
        $('#createoredit-role-modal').modal('hide');
        createOEditRoleForm.submit();
        pageLoader.show();
        evt.cancelBubble = true;
        evt.preventDefault();
    });
}