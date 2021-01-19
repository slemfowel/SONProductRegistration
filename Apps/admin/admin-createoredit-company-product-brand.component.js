AdminCreateOrEditCompanyProductBrandComponent = function (response) {

    // initialize view
    var addProductBrandButton = document.getElementById("add-product-brand-button");
    var createOrEditProductBrandForm = document.getElementById("createoredit-product-brand-form");

    // activate material design features
    var matObject = activateMaterialDesign(createOrEditProductBrandForm);

    var activateMatStepProgress = matObject.matStepProgressEventHandler("create-or-edit-brand-mat-step-progress");



    createOrEditProductBrandForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    var saveDetailsButton = document.getElementById("save-details-button");
    saveDetailsButton.addEventListener("click", function (evt) {
        activateMatStepProgress.next();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var backToDetailsButton = document.getElementById("back-to-details-button");
    backToDetailsButton.addEventListener("click", function (evt) {
        activateMatStepProgress.previous();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var saveUploadsButton = document.getElementById("save-uploads-button");
    saveUploadsButton.addEventListener("click", function (evt) {
        activateMatStepProgress.next();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var backToUploadsButton = document.getElementById("back-to-uploads-button");
    backToUploadsButton.addEventListener("click", function (evt) {
        activateMatStepProgress.previous();
        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var saveBrandButton = document.getElementById("save-brand-button");
    saveBrandButton.addEventListener("click", function (evt) {
        // activateMatStepProgress.next();
        alert("Yeah");
        console.log("Hello Deal's Day");

        // console.log(createOrEditProductBrandForm);
        // createOrEditProductBrandForm.submit();
        // pageLoader.show();

        evt.cancelBubble = true;
        evt.preventDefault();
    });

    createOrEditProductBrandForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

}
