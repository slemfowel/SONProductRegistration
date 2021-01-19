window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyLoginComponent = function (evt) {
        if (document.getElementById("company-login-component")) {
            var companyLoginComponent = document.getElementById("company-login-component");
            //var verifyTINButton = document.getElementById("verify-tin-button");
            //verifyTINButton.addEventListener("click", function (evt) {
            //    pageLoader.show();
            //});

            // activate material design features
            var matObject = activateMaterialDesign(companyLoginComponent);
            matObject.matInputFieldEventHandler("email-mat-input-field", {
                keyup: function (args) {
                    console.log(args);
                }
            });
            matObject.matInputFieldEventHandler("password-mat-input-field", {
                keyup: function (args) {

                }
            });
        }
    }
    CompanyLoginComponent();
});