CreateOrEditInspectionScheduleComponent = function (response) {

    $('#createoredit-product-inspection-schedule-modal').modal({ show: true });

    // initialize view
    var createOEditInspectionScheduleComponentView = document.getElementById("createoredit-product-inspection-schedule-modal-view");
    createOEditInspectionScheduleComponentView.innerHTML = response;

    var createoreditProductInspectionScheduleComponent = document.getElementById("createoredit-product-inspection-schedule-component");


    // DataTime Picker
    $("#expected-inspection-date-picker").datepicker({
        dateFormat: 'dd-mm-yy'
    });
    var expectedInspectionDate = new Date();
    expectedInspectionDate.setUTCDate(expectedInspectionDate.getDate() + 7);
    $("#expected-inspection-date-picker").datepicker("setDate", expectedInspectionDate);

    // activate material design features
    var matObject = activateMaterialDesign(createOEditInspectionScheduleComponentView);

    // toastr event handler
    var matToastr = matObject.matToastrEventHandler();

    var saveProductInspectionScheduleDetailsForm = createOEditInspectionScheduleComponentView.querySelector("form[id=\"createoredit-product-inspection-schedule-form\"]");

    var saveProductInspectionScheduleDetailsButton = document.getElementById("save-product-inspection-schedule-details-button");
    if (saveProductInspectionScheduleDetailsButton) {
        saveProductInspectionScheduleDetailsButton.addEventListener("click", function (evt) {
            try {
                $('#createoredit-product-inspection-schedule-modal').modal('hide');
                pageLoader.show();

                var returnUrl = this.getAttribute("data-return-url");
                var productId = this.getAttribute("data-product-id");

                var expectedInspectionDatePicker = document.getElementById("expected-inspection-date-picker");
                var expectedInspectionDateObject = expectedInspectionDatePicker.value.toString();
                var dateValueArray = expectedInspectionDateObject.split("-");
                var expectedInspectionDate = dateValueArray[2] + "-" + dateValueArray[1] + "-" + dateValueArray[0];

                var data = {
                    CompanyProductID: createoreditProductInspectionScheduleComponent.getAttribute("data-product-id"),
                    InspectorID: (document.getElementById("InspectorID")).value,
                    DateOfInspection: expectedInspectionDate
                };

                console.log(returnUrl);
                $.post(baseUrl + "/admin/ScheduleForInspection", data, function (response) {
                    pageLoader.hide();
                    document.location.href = returnUrl;
                });
            } catch (e) {
                // toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                pageLoader.hide();
                $('#createoredit-product-inspection-schedule-modal').modal('show');
            }

            evt.cancelBubble = true;
            evt.preventDefault();
        });
    }
}