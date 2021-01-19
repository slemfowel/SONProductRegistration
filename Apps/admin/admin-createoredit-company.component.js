CreateOrEditCompanyComponent = function (response) {

    $('#createoredit-company-modal').modal({ show: true });

    // initialize view
    var createOEditCompanyComponentView = document.getElementById("createoredit-company-modal-view");
    createOEditCompanyComponentView.innerHTML = response;

    // activate material design features
    var matObject = activateMaterialDesign(createOEditCompanyComponentView);

    setTimeout(function () {
        // DatePicker
        $("#date-of-incorporation-date-picker").datepicker({
            dateFormat: 'dd-mm-yy'
        });
        var startDate = new Date();
        startDate.setUTCDate(startDate.getDate());
        $("#date-of-incorporation-date-picker").datepicker("setDate", startDate);
    }, 1000);


    var createOEditCompanyForm = createOEditCompanyComponentView.querySelector("form[id=\"createoredit-company-form\"]");

    var saveCompanyButton = document.getElementById("save-company-button");
    saveCompanyButton.addEventListener("click", function (evt) {
        $('#createoredit-company-modal').modal('hide');
        createOEditCompanyForm.submit();
        pageLoader.show();
        // var inputFields = createOEditCompanyComponentView.querySelectorAll("input[type]");
        // Array.prototype.forEach.call(inputFields, function(field, index) {
        //     console.log(field.value);
        // })
        evt.cancelBubble = true;
        evt.preventDefault();
    });
}
