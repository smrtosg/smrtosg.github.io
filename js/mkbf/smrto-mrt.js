
const smrtMRT = document.getElementById('mkbf-smrt-mrt').getContext('2d');

const linesmrt = new Chart(smrtMRT, {
    type: 'line',
    data: {
        labels: ["2020", "2021", "2022", "2023", "Oct '23 - Dec '24"],
        datasets: [{
            label: "HBL",
            data: [1082000, 2045000, 3075000, 3675000, 4725000],
            borderColor: 'rgb(255, 187, 0)',
            fill: true,
            backgroundColor: 'rgba(207, 61, 61,0.05)',
            borderWidth: 3
        },

        {
            label: "CGL",
            data: [3363000, 2027000, 3020000, 3200000, 4050000],
            borderColor: 'rgb(0, 154, 68)',
            fill: true,
            backgroundColor: 'rgba(0, 154, 68,0.05)',
            borderWidth: 3
        },

        {
            label: "AEL",
            data: [2365000, 3420000, 3802000, 3721000, 4080000],
            borderColor: 'rgb(39, 39, 157)',
            fill: true,
            backgroundColor: 'rgba(39, 39, 157,0.05)',
            borderWidth: 3
        },

        {
            label: "NWL",
            data: [1733000, 1826000, 1840000, 1209000, 2350000],
            borderColor: 'rgb(14, 103, 44)',
            fill: true,
            backgroundColor: 'rgba(14, 103, 44,0.05)',
            borderWidth: 3
        },

        {
            label: "WTL",
            data: [2322000, 2011000, 2512000, 3005000, 4503000],
            borderColor: 'rgb(33, 116, 217)',
            fill: true,
            backgroundColor: 'rgba(14, 103, 44,0.05)',
            borderWidth: 3
        },

        {
            label: "YSLRT",
            data: [1131000, 2224000, 2452000, 2482000, 4030000],
            borderColor: 'rgb(112, 133, 115)',
            fill: true,
            backgroundColor: 'rgba(112, 133, 115,0.05)',
            borderWidth: 3
        }]//



    },




    options: {
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
            },
        }
    }
});