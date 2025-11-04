class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.projectCards = document.querySelectorAll('.project__card');
        this.closeBtn = document.querySelector('.modal--close');
        
        this.init();
    }
    
    init() {
        this.projectCards.forEach(card => {
            console.log(card.dataset.project);
            card.addEventListener('click', () => {
                this.openModal(card);
            });
        });
        
        // Закрытие модального окна
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Закрытие по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    openModal(project) {
        console.log(project)
        if (!project) return;
        
        this.updateModalContent(project);
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // блокируем скролл
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // восстанавливаем скролл
    }
    
    updateModalContent(project) {
        document.getElementById('modalTitle').textContent = project.dataset.title; // заголовок
        
        document.getElementById('modalDescription').textContent = project.dataset.description; // описание

        const techContainer = document.getElementById('modalTechnologies'); // технологии
        techContainer.innerHTML = JSON.parse(project.dataset.technologies)
            .map(tech => `<span class="tech__item">${tech}</span>`)
            .join('');

        // ссылки
        document.getElementById('demoLink').href = project.dataset.demo;
        document.getElementById('githubLink').href = project.dataset.github;
        
        const thumbnailsContainer = document.getElementById('thumbnails'); // фотки
        thumbnailsContainer.innerHTML = JSON.parse(project.dataset.images)
            .map((image, index) => 
                `<img loading="lazy" class="project__image" 
                     src="../images/icons/${image}" 
                     alt="Скриншот ${index + 1}"
                     data-index="${index}">`)
            .join('');

    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});