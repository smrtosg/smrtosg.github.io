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
        labels: ["2020", "2021", "2022", "2023", "2024"],
        datasets: [{
            label: "HBL",
            data: [1082000, 2045000, 3075000, 3675000, 4951000],
            borderColor: 'rgb(255, 187, 0)',
            fill: true,
            backgroundColor: 'rgba(207, 61, 61,0.05)',
            borderWidth: 3
        },

        {
            label: "CGL",
            data: [3363000, 2027000, 3020000, 3200000, 4450000],
            borderColor: 'rgb(0, 154, 68)',
            fill: true,
            backgroundColor: 'rgba(0, 154, 68,0.05)',
            borderWidth: 3
        },

        {
            label: "AEL",
            data: [2365000, 3420000, 3802000, 3721000, 4750000],
            borderColor: 'rgb(39, 39, 157)',
            fill: true,
            backgroundColor: 'rgba(39, 39, 157,0.05)',
            borderWidth: 3
        },

        {
            label: "NWL",
            data: [1733000, 1826000, 1840000, 1209000, 3210000],
            borderColor: 'rgb(14, 103, 44)',
            fill: true,
            backgroundColor: 'rgba(14, 103, 44,0.05)',
            borderWidth: 3
        },

        // {
        //     label: "WTL",
        //     data: [,,,,4503000],
        //     borderColor: 'rgb(33, 116, 217)',
        //     fill: true,
        //     backgroundColor: 'rgba(14, 103, 44,0.05)',
        //     borderWidth: 3
        // },

        {
            label: "YSLRT",
            data: [1131000, 2224000, 2452000, 2482000, 4530000],
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

// Check localStorage for dark mode preference
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
    updateChartOptions(linesmrt, true);
}

const toggleButton = document.getElementById('dark-mode-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    updateChartOptions(linesmrt, isDarkMode);
    // Save the preference in localStorage
    if (isDarkMode) {
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        localStorage.setItem('dark-mode', 'disabled');
    }
});