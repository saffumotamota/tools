// Load header and footer
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'components/header.html');
    loadComponent('footer-placeholder', 'components/footer.html');
    loadTools();
    initializeSearch();
});

// Function to load components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Function to load tools from tools-data.js
function loadTools() {
    if (typeof toolsData === 'undefined') {
        console.error('Tools data not loaded');
        return;
    }

    // Load tools for each category
    Object.keys(toolsData).forEach(category => {
        const containerElement = document.getElementById(category);
        if (!containerElement) return;

        const tools = toolsData[category];
        tools.forEach(tool => {
            const toolCard = createToolCard(tool);
            containerElement.appendChild(toolCard);
        });
    });
}

// Function to create tool card
function createToolCard(tool) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-lg-3 mb-4';

    col.innerHTML = `
        <div class="card tool-card">
            <div class="card-body">
                <h5 class="card-title">${tool.name}</h5>
                <p class="card-text">${tool.description}</p>
                <a href="${tool.path}" class="btn btn-primary">Use Tool</a>
            </div>
        </div>
    `;

    return col;
}

// Initialize search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchTools');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const toolCards = document.querySelectorAll('.tool-card');

        toolCards.forEach(card => {
            const toolName = card.querySelector('.card-title').textContent.toLowerCase();
            const toolDescription = card.querySelector('.card-text').textContent.toLowerCase();
            const isVisible = toolName.includes(searchTerm) || toolDescription.includes(searchTerm);
            
            card.closest('.col-md-4').style.display = isVisible ? 'block' : 'none';
        });
    });
}

// Function to show loading animation
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

// Function to hide loading animation
function hideLoading(element) {
    element.querySelector('.loading')?.remove();
}

// Function to handle tool errors
function handleToolError(element, message) {
    element.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}

// Export functions for use in tool-specific files
window.toolUtils = {
    showLoading,
    hideLoading,
    handleToolError
}; 