// MGNREGA Tracker - Karnataka
// Main Application Logic
// Build For Bharat Fellowship 2026

// Application State
let currentLang = 'en';
let selectedDistrict = null;
let currentPage = 'selector';
let charts = {
    employment: null,
    expenditure: null
};

// Translation Helper
function t(key) {
    return translations[currentLang][key] || key;
}

// Number Formatting
function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

// Main Render Function
function renderApp() {
    const app = document.getElementById('app');

    if (currentPage === 'selector') {
        app.innerHTML = renderDistrictSelector();
    } else {
        app.innerHTML = renderDashboard();
        // Render charts after DOM is ready
        setTimeout(() => {
            renderCharts();
        }, 100);
    }
}

// Render District Selector Page
function renderDistrictSelector() {
    const districts = Object.keys(districtData);

    return `
        <div style="min-height: 100vh; display: flex; flex-direction: column;">
            <!-- Header -->
            <header>
                <div class="header-container">
                    <div>
                        <h1 class="app-title">${t('appTitle')}</h1>
                        <p class="app-subtitle">${t('appSubtitle')}</p>
                    </div>
                    <select onchange="switchLanguage(this.value)" class="language-select">
                        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                        <option value="kn" ${currentLang === 'kn' ? 'selected' : ''}>ಕನ್ನಡ</option>
                    </select>
                </div>
            </header>

            <!-- Main Content -->
            <main class="landing-wrapper">
                <div class="landing-card">
                    <h2 class="welcome-title">${t('welcome')}</h2>

                    <button onclick="autoDetectLocation()" class="btn btn-primary" style="margin-bottom: 1.5rem;">
                        📍 ${t('autoDetect')}
                    </button>

                    <div class="divider">OR</div>

                    <div class="form-group">
                        <label class="form-label">${t('selectDistrict')}</label>
                        <select id="districtSelect" class="form-select">
                            <option value="">-- ${t('selectDistrict')} --</option>
                            ${districts.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>

                    <button onclick="viewDashboard()" class="btn btn-success">
                        ${t('viewDashboard')}
                    </button>
                </div>
            </main>

            <!-- Footer -->
            <footer>
                <p class="footer-text">${t('footer')}</p>
            </footer>
        </div>
    `;
}

// Render Dashboard Page
function renderDashboard() {
    const data = districtData[selectedDistrict];

    return `
        <div style="min-height: 100vh; display: flex; flex-direction: column;">
            <!-- Header -->
            <header>
                <div class="header-container dashboard-header">
                    <div>
                        <h1 class="app-title">${selectedDistrict}</h1>
                        <p class="app-subtitle">${t('appSubtitle')}</p>
                    </div>
                    <div class="header-actions">
                        <select onchange="switchLanguage(this.value)" class="language-select">
                            <option value="en" ${currentLang === 'en' ? 'selected' : ''}>English</option>
                            <option value="kn" ${currentLang === 'kn' ? 'selected' : ''}>ಕನ್ನಡ</option>
                        </select>
                        <button onclick="changeDistrict()" class="btn btn-success btn-small">
                            ${t('changeDistrict')}
                        </button>
                    </div>
                </div>
            </header>

            <!-- Main Content -->
            <main class="container" style="flex: 1; padding-top: 2rem; padding-bottom: 2rem;">
                <!-- Metrics Grid -->
                <div class="metrics-grid">
                    ${renderMetricCard('👥', t('totalWorkers'), formatNumber(data.workers), 'blue')}
                    ${renderMetricCard('💼', t('jobCards'), formatNumber(data.jobCards), 'green')}
                    ${renderMetricCard('📈', t('personDays'), formatNumber(data.personDays), 'purple')}
                    ${renderMetricCard('💰', t('totalExpenditure'), '₹' + data.expenditure + ' Cr', 'orange')}
                </div>

                <!-- Charts -->
                <div class="charts-grid">
                    <div class="chart-card">
                        <h3 class="chart-title">${t('employmentTrend')}</h3>
                        <canvas id="employmentChart"></canvas>
                    </div>
                    <div class="chart-card">
                        <h3 class="chart-title">${t('expenditureTrend')}</h3>
                        <canvas id="expenditureChart"></canvas>
                    </div>
                </div>

                <!-- Detailed Statistics -->
                <div class="stats-card">
                    <h3 class="stats-title">${t('detailedStats')}</h3>
                    <div class="stats-grid">
                        ${renderStatItem(t('scPersonDays'), formatNumber(data.scPersonDays))}
                        ${renderStatItem(t('stPersonDays'), formatNumber(data.stPersonDays))}
                        ${renderStatItem(t('womenPersonDays'), formatNumber(data.womenPersonDays))}
                        ${renderStatItem(t('worksCompleted'), formatNumber(data.worksCompleted))}
                        ${renderStatItem(t('activeJobSeekers'), formatNumber(data.activeJobSeekers))}
                        ${renderStatItem(t('avgDaysPerHH'), data.avgDaysPerHH)}
                    </div>
                </div>
            </main>

            <!-- Footer -->
            <footer>
                <p class="footer-text">${t('footer')}</p>
            </footer>
        </div>
    `;
}

// Render Metric Card
function renderMetricCard(icon, title, value, color) {
    return `
        <div class="metric-card ${color}">
            <div class="metric-icon">${icon}</div>
            <div class="metric-title">${title}</div>
            <div class="metric-value">${value}</div>
        </div>
    `;
}

// Render Stat Item
function renderStatItem(label, value) {
    return `
        <div class="stat-item">
            <p class="stat-label">${label}</p>
            <p class="stat-value">${value}</p>
        </div>
    `;
}

// Render Charts
function renderCharts() {
    const data = districtData[selectedDistrict];
    const months = t('months');

    // Destroy existing charts if they exist
    if (charts.employment) {
        charts.employment.destroy();
    }
    if (charts.expenditure) {
        charts.expenditure.destroy();
    }

    // Employment Chart
    const empCtx = document.getElementById('employmentChart');
    if (empCtx) {
        charts.employment = new Chart(empCtx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: t('personDays'),
                    data: data.monthlyEmployment,
                    borderColor: 'rgb(59, 130, 246)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Expenditure Chart
    const expCtx = document.getElementById('expenditureChart');
    if (expCtx) {
        charts.expenditure = new Chart(expCtx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: t('totalExpenditure'),
                    data: data.monthlyExpenditure,
                    backgroundColor: 'rgb(34, 197, 94)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Event Handlers
function switchLanguage(lang) {
    currentLang = lang;
    renderApp();
}

function autoDetectLocation() {
    alert('Location detected: Bangalore Urban');
    selectedDistrict = 'Bangalore Urban';
    const select = document.getElementById('districtSelect');
    if (select) {
        select.value = selectedDistrict;
    }
}

function viewDashboard() {
    const select = document.getElementById('districtSelect');
    if (select && select.value) {
        selectedDistrict = select.value;
        currentPage = 'dashboard';
        renderApp();
    } else {
        alert('Please select a district');
    }
}

function changeDistrict() {
    currentPage = 'selector';
    selectedDistrict = null;
    renderApp();
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    renderApp();
});

// Initialize immediately if DOM already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}
