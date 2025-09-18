document.addEventListener('DOMContentLoaded', function () {
    let allData = [];
    let chartInstances = {};

    function getMonthFilePaths(period) {
        const urlParams = new URLSearchParams(window.location.search);
        const dataDir = urlParams.get('user') || 'dashboard data'; // Default to 'dashboard data' if no user is specified
        console.log('Dashboard is using data directory:', dataDir); // Final verification log
        const paths = [];
        const today = new Date();
        let months;

        switch (period) {
            case '1month':
                months = 1;
                break;
            case '3months':
                months = 3;
                break;
            case '6months':
                months = 6;
                break;
            case '1year':
                months = 12;
                break;
            default:
                months = 3;
        }

        for (let i = 0; i < months; i++) {
            const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            paths.push(`${dataDir}/${year}/${month}.csv`);
        }
        return paths;
    }

    function fetchData(period) {
        const filePaths = getMonthFilePaths(period);
        const promises = filePaths.map(path => {
            return new Promise((resolve, reject) => {
                Papa.parse(path, {
                    download: true,
                    header: true,
                    dynamicTyping: true,
                    complete: results => resolve(results.data),
                    error: err => {
                        console.warn(`Could not load or parse ${path}. Error: ${err.message}`);
                        resolve([]); // Resolve with empty array on error
                    }
                });
            });
        });

        Promise.all(promises).then(results => {
            allData = [].concat(...results).filter(row => row.Date); // Flatten and filter out empty rows
            allData.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            updateDashboard(allData, period);
        });
    }

    function updateDashboard(data, period) {
        updateStats(data);
        const aggregatedData = aggregateDataForCharts(data, period);
        createOrUpdateChart('revenueChart', aggregatedData, createRevenueChart);
        createOrUpdateChart('visitsChart', aggregatedData, createVisitsChart);
        createOrUpdateChart('categoryChart', data, createCategoryChart);
        createOrUpdateChart('combinedChart', aggregatedData, createCombinedChart);
    }

    function aggregateDataForCharts(data, period) {
        if (period !== '6months' && period !== '1year') {
            // Aggregate daily for 1m and 3m to sum up entries on the same day
            const dailyData = {};
            data.forEach(row => {
                const day = row.Date;
                if (!dailyData[day]) {
                    dailyData[day] = { Date: day, MoneySpent: 0, Bookings: 0 };
                }
                dailyData[day].MoneySpent += row.MoneySpent || 0;
                dailyData[day].Bookings += 1;
            });
            return Object.values(dailyData).sort((a, b) => new Date(a.Date) - new Date(b.Date));
        } else {
            // Aggregate monthly for 6m and 1y
            const monthlyData = {};
            data.forEach(row => {
                const month = row.Date.substring(0, 7); // YYYY-MM
                if (!monthlyData[month]) {
                    monthlyData[month] = { Date: month, MoneySpent: 0, Bookings: 0 };
                }
                monthlyData[month].MoneySpent += row.MoneySpent || 0;
                monthlyData[month].Bookings += 1;
            });
            return Object.values(monthlyData).sort((a, b) => new Date(a.Date) - new Date(b.Date));
        }
    }

    function updateStats(data) {
        const totalRevenue = data.reduce((sum, row) => sum + (row.MoneySpent || 0), 0);
        const totalBookings = data.length;
        const newCustomers = new Set(data.map(row => row.Email)).size;
        
        // Growth rate calculation can be more complex, so we'll use a placeholder for now
        const growthRate = 5; // Placeholder growth rate

        document.getElementById('total-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
        document.getElementById('total-bookings').textContent = totalBookings.toLocaleString();
        document.getElementById('new-customers').textContent = newCustomers.toLocaleString();
        document.getElementById('growth-rate').textContent = `+${growthRate.toFixed(1)}%`;
    }

    function createOrUpdateChart(canvasId, data, chartFunction) {
        if (chartInstances[canvasId]) {
            chartInstances[canvasId].destroy();
        }
        chartInstances[canvasId] = chartFunction(data);
    }

    function createRevenueChart(data) {
        const ctx = document.getElementById('revenueChart').getContext('2d');
        const labels = data.map(row => row.Date);
        const revenueData = data.map(row => row.MoneySpent);

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Revenue',
                    data: revenueData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { x: { ticks: { maxTicksLimit: 10 } } },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        position: 'nearest',
                    }
                }
            }
        });
    }

    function createVisitsChart(data) {
        const ctx = document.getElementById('visitsChart').getContext('2d');
        const labels = data.map(row => row.Date);
        const bookingsData = data.map(row => row.Bookings);

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Bookings',
                    data: bookingsData,
                    backgroundColor: '#60a5fa',
                    borderColor: '#3b82f6',
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { x: { ticks: { maxTicksLimit: 10 } } },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        position: 'nearest',
                    }
                }
            }
        });
    }

    function createCategoryChart(data) {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        const productData = data.reduce((acc, row) => {
            if (row.Product && typeof row.Product === 'string') {
                const products = row.Product.split('|');
                products.forEach(product => {
                    const trimmedProduct = product.trim();
                    if (trimmedProduct) {
                        acc[trimmedProduct] = (acc[trimmedProduct] || 0) + 1;
                    }
                });
            }
            return acc;
        }, {});

        const labels = Object.keys(productData);
        const values = Object.values(productData);

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    function createCombinedChart(data) {
        const ctx = document.getElementById('combinedChart').getContext('2d');
        const labels = data.map(row => row.Date);
        const revenueData = data.map(row => row.MoneySpent);
        const bookingsData = data.map(row => row.Bookings);

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    type: 'bar',
                    label: 'Revenue',
                    data: revenueData,
                    backgroundColor: '#93c5fd',
                    borderColor: '#60a5fa',
                    yAxisID: 'y',
                }, {
                    type: 'line',
                    label: 'Bookings',
                    data: bookingsData,
                    borderColor: '#3b82f6',
                    yAxisID: 'y1',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                plugins: {
                    tooltip: {
                        position: 'nearest',
                    }
                },
                scales: {
                    x: { ticks: { maxTicksLimit: 10 } },
                    y: { type: 'linear', position: 'left' },
                    y1: { type: 'linear', position: 'right', grid: { drawOnChartArea: false } }
                }
            }
        });
    }

    function setupEventListeners() {
        const filters = ['revenueFilter', 'visitsFilter', 'categoryFilter', 'combinedFilter'];
        filters.forEach(filterId => {
            document.getElementById(filterId).addEventListener('click', (e) => {
                if (e.target.dataset.period) {
                    document.querySelectorAll(`#${filterId} .filter-btn`).forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    updateSingleChart(filterId, e.target.dataset.period);
                }
            });
        });
    }

    function updateSingleChart(filterId, period) {
        const urlParams = new URLSearchParams(window.location.search);
        const dataDir = urlParams.get('user') || 'dashboard data';
        const filePaths = getMonthFilePaths(period);
        const promises = filePaths.map(path => {
            return new Promise((resolve, reject) => {
                Papa.parse(path, {
                    download: true,
                    header: true,
                    dynamicTyping: true,
                    complete: results => resolve(results.data),
                    error: err => {
                        console.warn(`Could not load or parse ${path}. Error: ${err.message}`);
                        resolve([]);
                    }
                });
            });
        });

        Promise.all(promises).then(results => {
            const data = [].concat(...results).filter(row => row.Date);
            data.sort((a, b) => new Date(a.Date) - new Date(b.Date));
            
            const aggregatedData = aggregateDataForCharts(data, period);

            const chartMap = {
                revenueFilter: { id: 'revenueChart', func: createRevenueChart, useAggregated: true },
                visitsFilter: { id: 'visitsChart', func: createVisitsChart, useAggregated: true },
                categoryFilter: { id: 'categoryChart', func: createCategoryChart, useAggregated: false },
                combinedFilter: { id: 'combinedChart', func: createCombinedChart, useAggregated: true }
            };

            const chartConfig = chartMap[filterId];
            if (chartConfig) {
                const chartData = chartConfig.useAggregated ? aggregatedData : data;
                createOrUpdateChart(chartConfig.id, chartData, chartConfig.func);
            }
        });
    }

    fetchData('3months');
    setupEventListeners();
});
