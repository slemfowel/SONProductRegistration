window.addEventListener("DOMContentLoaded", function (evt) {
    AdminCompanyDashboardComponent = function (evt) {
        try {
            if (document.getElementById("admin-company-dashboard-component")) {

                var dashboardComponent = document.getElementById("admin-company-dashboard-component");

                var randomScalingFactor = function () {
                    var factor = Math.round(Math.random() * 100);
                    return factor;
                };

                // activate material design features
                var matObject = activateMaterialDesign(dashboardComponent);

                // DataTime Picker
                $("#start-date-picker").datepicker({
                    dateFormat: 'dd-mm-yy'
                });
                var startDate = new Date();
                startDate.setUTCDate(startDate.getDate() - 7);
                $("#start-date-picker").datepicker("setDate", startDate);
                $("#end-date-picker").datepicker({
                    dateFormat: 'dd-mm-yy'
                });
                $("#end-date-picker").datepicker("setDate", new Date());

                var startDateTimePicker = document.getElementById("start-date-picker");
                if (startDateTimePicker.hasAttribute("date-value") && startDateTimePicker.getAttribute("date-value") != "") {
                    var startDate = new Date(startDateTimePicker.getAttribute("date-value"));
                    $("#start-date-picker").datepicker("setDate", startDate);
                }

                var endDateTimePicker = document.getElementById("end-date-picker");
                if (endDateTimePicker.hasAttribute("date-value") && endDateTimePicker.getAttribute("date-value") != "") {
                    var endDate = new Date(endDateTimePicker.getAttribute("date-value"));
                    $("#end-date-picker").datepicker("setDate", endDate);
                }

                var incomeGeneratedCanvas = document.getElementById('income-generated-analytics-chart').getContext('2d');
                var incomeGeneratedChart = new Chart(incomeGeneratedCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: 'Expected Income (Demand Note) (₦)',
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
                            label: 'Actual Income (e-Receipt) (₦)',
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

                var incomeGeneratedPieChartCanvas = document.getElementById('income-generated-pie-chart').getContext('2d');
                var incomeGeneratedPieChart = new Chart(incomeGeneratedPieChartCanvas, {
                    type: 'doughnut',
                    data: {
                        labels: [
                            'Red',
                            'Orange',
                            'Yellow',
                            'Green',
                            'Blue'
                        ],
                        datasets: [{
                            data: [
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                                randomScalingFactor(),
                            ],
                            backgroundColor: [
                                'rgba(255, 159, 64, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)'
                            ],
                            label: 'Dataset 1'
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });

                var poductAnalyticsCanvas = document.getElementById('poduct-analytics-chart').getContext('2d');
                var poductAnalyticsChart = new Chart(poductAnalyticsCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [{
                            label: '# of Votes',
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
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        },
                            //{
                            //    label: '# of Votes',
                            //    data: [
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor()
                            //    ],
                            //    backgroundColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderWidth: 1
                            //}
                        ]
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

                var certificatesIssuedChartCanvas = document.getElementById('certificates-issued-chart').getContext('2d');
                var certificatesIssuedChart = new Chart(certificatesIssuedChartCanvas, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
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
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }
                            //,{
                            //    label: '# of Votes',
                            //    data: [
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor()
                            //    ],
                            //    backgroundColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderWidth: 1
                            //}
                        ]
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

                var poductAnalyticsCanvas1 = document.getElementById('poduct-analytics-chart-1').getContext('2d');
                var poductAnalyticsCharts1 = new Chart(poductAnalyticsCanvas1, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
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
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }
                            //,{
                            //    label: '# of Votes',
                            //    data: [
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor()
                            //    ],
                            //    backgroundColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderWidth: 1
                            //}
                        ]
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

                var poductAnalyticsCanvas2 = document.getElementById('poduct-analytics-chart-2').getContext('2d');
                var poductAnalyticsCharts2 = new Chart(poductAnalyticsCanvas2, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: '# of Votes',
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
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }
                            //,{
                            //    label: '# of Votes',
                            //    data: [
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor()
                            //    ],
                            //    backgroundColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderWidth: 1
                            //}
                        ]
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

                var poductAnalyticsCanvas3 = document.getElementById('poduct-analytics-chart-3').getContext('2d');
                var poductAnalyticsCharts3 = new Chart(poductAnalyticsCanvas3, {
                    type: 'bar',
                    data: {
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                label: '# of Votes',
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
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)'
                                ],
                                borderWidth: 1
                            }
                            //,{
                            //    label: '# of Votes',
                            //    data: [
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor(),
                            //        randomScalingFactor()
                            //    ],
                            //    backgroundColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderColor: [
                            //        'rgba(255, 159, 64, 1)',
                            //        'rgba(153, 102, 255, 1)',
                            //        'rgba(75, 192, 192, 1)',
                            //        'rgba(255, 206, 86, 1)',
                            //        'rgba(54, 162, 235, 1)',
                            //        'rgba(255, 99, 132, 1)'
                            //    ],
                            //    borderWidth: 1
                            //}
                        ]
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
                    incomeGeneratedChart.update();
                    incomeGeneratedPieChart.update();
                    certificatesIssuedChart.update();

                    poductAnalyticsChart.update();
                    poductAnalyticsCharts1.update();
                    poductAnalyticsCharts2.update();
                }, 100);

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
        } catch (e) {
            throw e;
        }
    };
    AdminCompanyDashboardComponent();
});