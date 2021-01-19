window.addEventListener("DOMContentLoaded", function (evt) {
    CompanyDashboardComponent = function (evt) {
        if (document.getElementById("company-dashboard-component")) {
            try {

                var randomScalingFactor = function () {
                    var factor = Math.round(Math.random() * 100);
                    return factor;
                };

                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Pending',
                            data: [
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor()
                            ],
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        },
                        {
                            label: 'Approved',
                            data: [
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor()
                            ],
                            backgroundColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
                setTimeout(function () {
                    myChart.update();
                }, 100);
            } catch (e) {
                //
            }


            var dashboardNewRegistrationButton = document.getElementById("dashboard-new-registration-button");
            dashboardNewRegistrationButton.addEventListener("click", function (evt) {
                if (evt.button == 0) {
                    pageLoader.show();
                    try {
                        $.get(baseUrl + "/my/createproductfromdashboard", function (response) {
                            // pageLoader.hide();
                            document.location.href = response.routeURL;
                            console.log(response);
                        });
                    } catch (e) {
                        toastr.error("", "Oops! something went wrong, please try again later.", toastrOption);
                        pageLoader.hide();
                    }
                }
            });
        }
    };
    CompanyDashboardComponent();
});