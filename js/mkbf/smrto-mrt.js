const darkThemeOptions = {
    scales: {
        x: {
            ticks: {
                color: '#ffffff' // X-axis labels color
            },
            grid: {
                color: '#444444' // X-axis grid lines color
            }
        },
        y: {
            ticks: {
                color: '#ffffff' // Y-axis labels color
            },
            grid: {
                color: '#444444' // Y-axis grid lines color
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                color: '#ffffff' // Legend labels color
            }
        },
        tooltip: {
            backgroundColor: '#333333', // Tooltip background color
            titleColor: '#ffffff', // Tooltip title color
            bodyColor: '#ffffff' // Tooltip body color
        }
    }
};

const smrtMRT = document.getElementById('mkbf-smrt-mrt').getContext('2d');
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: true
        }
    }
};

const linesmrt = new Chart(smrtMRT, {
    type: 'line', // or 'bar', 'pie', etc.
    data: {
        labels: ["2021", "2022", "2023", "2024", "Jan - Jul 2025"],
        datasets: [{
            label: "HBL",
            data: [2045000, 3075000, 3675000, 4951000, 6050000],
            borderColor: 'rgb(255, 187, 0)',
            fill: true,
            backgroundColor: 'rgba(207, 61, 61,0.05)',
            borderWidth: 3
        },

        {
            label: "CGL",
            data: [2027000, 3020000, 3200000, 4450000, 6570000],
            borderColor: 'rgb(0, 154, 68)',
            fill: true,
            backgroundColor: 'rgba(0, 154, 68,0.05)',
            borderWidth: 3
        },

        {
            label: "AEL",
            data: [3420000, 3802000, 3721000, 4750000, 8060000],
            borderColor: 'rgb(39, 39, 157)',
            fill: true,
            backgroundColor: 'rgba(39, 39, 157,0.05)',
            borderWidth: 3
        },

        {
            label: "NWL",
            data: [1826000, 1840000, 1209000, 3210000, 7250000],
            borderColor: 'rgb(14, 103, 44)',
            fill: true,
            backgroundColor: 'rgba(14, 103, 44,0.05)',
            borderWidth: 3
        },

        {
            label: "WTL",
            data: [,,,4503000, 7980000],
            borderColor: 'rgb(33, 116, 217)',
            fill: true,
            backgroundColor: 'rgba(14, 103, 44,0.05)',
            borderWidth: 3
        },

        {
            label: "YSLRT",
            data: [2224000, 2452000, 2482000, 4530000, 7050000],
            borderColor: 'rgb(112, 133, 115)',
            fill: true,
            backgroundColor: 'rgba(112, 133, 115,0.05)',
            borderWidth: 3
        }]//



    },
    options: chartOptions
});

function updateChartOptions(chart, isDarkMode) {
    const options = isDarkMode ? darkThemeOptions : {
        scales: {
            x: {
                ticks: {
                    color: '#000000' // X-axis labels color
                },
                grid: {
                    color: '#e0e0e0' // X-axis grid lines color
                }
            },
            y: {
                ticks: {
                    color: '#000000' // Y-axis labels color
                },
                grid: {
                    color: '#e0e0e0' // Y-axis grid lines color
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#000000' // Legend labels color
                }
            },
            tooltip: {
                backgroundColor: '#ffffff', // Tooltip background color
                titleColor: '#000000', // Tooltip title color
                bodyColor: '#000000' // Tooltip body color
            }
        }
    };
    chart.options = {
        ...chart.options,
        ...options
    };
    chart.update();
}

