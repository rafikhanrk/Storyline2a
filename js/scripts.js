document.addEventListener("DOMContentLoaded", function () {
    const scroller = scrollama();

    const scrollyMap = L.map('scrolly-map').setView([47.6062, -122.3321], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(scrollyMap);

    scroller
        .setup({
            step: ".step",
            offset: 0.5,
            debug: true
        })
        .onStepEnter(response => {
            const stepIndex = response.index;

            switch (stepIndex) {
                case 0:
                    scrollyMap.setView([47.5095, -122.3505], 14); // White Center
                    break;
                case 1:
                    scrollyMap.setView([47.5171, -122.2684], 14); // Rainier Beach
                    break;
                case 2:
                    scrollyMap.setView([47.4785, -122.2907], 14); // Tukwila
                    break;
            }
            scrollyMap.once('moveend', () => {
                scrollyMap.invalidateSize();
            });
        });

    // JSVectormap initialization
    var map = new jsVectorMap({
        selector: "#map",
        map: "world",
        markers: [
            { name: "White Center", coords: [47.5095, -122.3505], refugees: 1000 },
            { name: "Rainier Beach", coords: [47.5171, -122.2684], refugees: 800 },
            { name: "Tukwila", coords: [47.4785, -122.2907], refugees: 1200 }
        ],
        markerStyle: {
            initial: {
                fill: '#FF6347'
            }
        },
        series: {
            markers: [{
                attribute: 'r',
                scale: [5, 15],
                values: [1000, 800, 1200]
            }]
        },
        onMarkerTipShow: function (e, label, index) {
            label.html(
                '<b>' + map.markers[index].config.name + '</b><br>' +
                'Refugees: ' + map.markers[index].config.refugees
            );
        }
    });

    // Chart.js initialization
    var ctx1 = document.getElementById('resultsChart1').getContext('2d');
    var resultsChart1 = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Statistic 1', 'Statistic 2', 'Statistic 3'],
            datasets: [{
                label: 'Results 1',
                data: [12, 19, 3],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctx2 = document.getElementById('resultsChart2').getContext('2d');
    var resultsChart2 = new Chart(ctx2, {
        type: 'line',
        data: {
            labels: ['Year 1', 'Year 2', 'Year 3'],
            datasets: [{
                label: 'Results 2',
                data: [3, 10, 5],
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    var ctx3 = document.getElementById('resultsChart3').getContext('2d');
    var resultsChart3 = new Chart(ctx3, {
        type: 'pie',
        data: {
            labels: ['Segment 1', 'Segment 2', 'Segment 3'],
            datasets: [{
                label: 'Results 3',
                data: [5, 15, 7],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
