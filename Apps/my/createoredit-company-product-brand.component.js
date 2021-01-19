CreateOrEditCompanyProductBrandComponent = function (response) {

    // initialize view
    var addProductBrandButton = document.getElementById("add-product-brand-button");
    var createOrEditBrandProductDetailsForm = document.getElementById("createoredit-brand-product-details-form");
    var createOrEditProductBrandForm = document.getElementById("createoredit-product-brand-form");
    var createOrEditCompanyProductBrandComponent = createOrEditProductBrandForm.parentNode;

    var typeOfBusinessCombo = document.getElementById("business-type-combo");
    typeOfBusinessCombo.addEventListener("change", function (evt) {
        var brandProductDocumentUploader = document.getElementById("create-or-edit-brand-product-documents-uploader");
        var uploadItems = eval(brandProductDocumentUploader.getAttribute("upload-items"));
        var typeOfBusinessDocuments = ['Power of Attorney', 'Certificate of Free Sale', 'Trade Mark Certificate', 'Manufacturing/Franchise Agreement', 'Trade Mark Certificate'];
        var typeOfBusinessDocument = typeOfBusinessDocuments[this.options[this.selectedIndex].value];
        uploadItems.push(typeOfBusinessDocument);
        brandProductDocumentUploader.setAttribute("upload-items", JSON.stringify(uploadItems));
    });

    // activate material design features
    var matObject = activateMaterialDesign(createOrEditBrandProductDetailsForm);

    var stepProgress = matObject.matStepProgressEventHandler("create-or-edit-brand-mat-step-progress");

    // product photo uploader
    var brandProductPhotoUploadButton = matObject.matUploadButtonEventHandler("create-or-edit-brand-product-photo-uploader");
    brandProductPhotoUploadButton.on("success", function (response) {
        //console.log(response);
        var data = {
            DocumentID: response.documentId,
            OwnerID: response.documentId,
            Description: response.documentId
        };
        $.post(baseUrl + "/document/updatechanges", data, function (response) {
            console.log(response);

        });
    });

    // show product photo popover info
    brandProductPhotoUploadButton.showPopOver();


    // document uploader
    var brandProductDocumentsUploadButton = matObject.matUploadButtonEventHandler("create-or-edit-brand-product-documents-uploader");
    brandProductDocumentsUploadButton.on("success", function (response) {
        //console.log(response);
        var DocumentOwnerID = createOrEditCompanyProductBrandComponent.getAttribute("document-owner-id");
        var data = {
            DocumentID: response.documentId,
            OwnerID: DocumentOwnerID,
            Description: response.description
        };
        $.post(baseUrl + "/document/updatechanges", data, function (response) {
            //console.log(response);
        });
    });




    createOrEditProductBrandForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

    var saveDetailsButton = document.getElementById("save-details-button");
    saveDetailsButton.addEventListener("click", function (evt) {
        stepProgress.next();

        // scroll next view to top
        createOrEditProductBrandForm.scrollIntoView();

        // hide upload photo popover info
        brandProductPhotoUploadButton.hidePopOver();

        // show documents to upload popover info
        brandProductDocumentsUploadButton.showPopOver();


        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var backToDetailsButton = document.getElementById("back-to-details-button");
    backToDetailsButton.addEventListener("click", function (evt) {
        stepProgress.previous();

        // scroll next view to top
        createOrEditProductBrandForm.scrollIntoView();

        // show upload photo popover info
        brandProductPhotoUploadButton.showPopOver();

        // hide documents to upload popover info
        brandProductDocumentsUploadButton.hidePopOver();

        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var saveUploadsButton = document.getElementById("save-uploads-button");
    saveUploadsButton.addEventListener("click", function (evt) {
        stepProgress.next();

        // scroll next view to top
        createOrEditProductBrandForm.scrollIntoView();

        // hide documents to upload popover info
        brandProductDocumentsUploadButton.hidePopOver();

        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var backToUploadsButton = document.getElementById("back-to-uploads-button");
    backToUploadsButton.addEventListener("click", function (evt) {
        stepProgress.previous();

        // scroll next view to top
        createOrEditProductBrandForm.scrollIntoView();

        // show documents to upload popover info
        brandProductDocumentsUploadButton.showPopOver();

        evt.cancelBubble = true;
        evt.preventDefault();
    });

    var saveBrandButton = document.getElementById("save-brand-button");
    saveBrandButton.addEventListener("click", function (evt) {
        createOrEditProductBrandForm.submit();
        pageLoader.show();

        evt.cancelBubble = true;
        evt.preventDefault();
    });

    createOrEditProductBrandForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
    });

}