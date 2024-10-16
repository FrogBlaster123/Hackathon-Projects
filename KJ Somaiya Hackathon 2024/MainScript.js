document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    updateRainAnalysis();
    updateLeaderboard();
    setupEventListeners();
});

function setupEventListeners() {
    // Search functionality
    const searchButton = document.getElementById('searchButton');
    const citySearch = document.getElementById('citySearch');
    
    searchButton.addEventListener('click', function() {
        updateCity(citySearch.value);
    });

    citySearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            updateCity(citySearch.value);
        }
    });

    // Leaderboard interactivity
    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.addEventListener('click', function(e) {
        const row = e.target.closest('tr');
        if (row) {
            const rank = row.cells[0].textContent;
            const name = row.cells[1].textContent;
            const points = row.cells[2].textContent;
            alert(`Selected user:\nRank: ${rank}\nName: ${name}\nPoints: ${points}`);
        }
    });
}

function updateCity(city) {
    // In a real app, this would fetch data from a weather API
    document.getElementById('cityName').textContent = city;
    updateRainAnalysis();
    // You would also update other weather information here
}

function updateRainAnalysis() {
    const regions = ['North', 'South', 'East', 'West'];
    const rainAnalysis = document.getElementById('rainAnalysis');
    rainAnalysis.innerHTML = ''; // Clear existing content

    regions.forEach(region => {
        const percentage = Math.floor(Math.random() * 100);
        const regionElement = document.createElement('div');
        regionElement.className = 'region';
        regionElement.innerHTML = `
            <span>${region}</span>
            <div class="bar" style="width: ${percentage}%;"></div>
        `;
        rainAnalysis.appendChild(regionElement);
    });
}

function updateLeaderboard() {
    const leaderboardData = [
        { rank: 1, name: "Vedant Lotankar", points: 1500 },
        { rank: 2, name: "Atharva Dhemare", points: 1450 },
        { rank: 3, name: "Sai Pasupathy", points: 1400 },
        { rank: 4, name: "Kaustubh Kantekar", points: 1350 },
        { rank: 5, name: "Mrigank Singh", points: 1300 }
    ];

    const leaderboardBody = document.getElementById('leaderboardBody');
    leaderboardBody.innerHTML = ''; // Clear existing content

    leaderboardData.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.rank}</td>
            <td>${user.name}</td>
            <td>${user.points}</td>
        `;
        leaderboardBody.appendChild(row);
    });
}

// Simulating real-time updates
setInterval(() => {
    const userPoints = document.getElementById('userPoints');
    const currentPoints = parseInt(userPoints.textContent);
    const newPoints = currentPoints + Math.floor(Math.random() * 10) - 5; // Random change between -5 and +5
    userPoints.textContent = Math.max(0, newPoints); // Ensure points don't go below 0
}, 5000); // Update every 5 seconds