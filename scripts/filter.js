class ProjectsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.btn--filter');
        this.projectCards = document.querySelectorAll('.project__card');
        
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleFilterClick(button);
            });
        });
    }
    
    handleFilterClick(clickedButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
        
        const filter = clickedButton.dataset.filter;
        this.filterProjects(filter);
    }
    
    filterProjects(filter) {
        this.projectCards.forEach(card => {
            if (filter === 'all') {
                card.classList.remove('hidden');
            } else {
                const categories = card.dataset.category.split(' ');
                if (categories.includes(filter)) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectsFilter();
});