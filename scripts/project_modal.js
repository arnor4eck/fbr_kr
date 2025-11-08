class ProjectModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.projectCards = document.querySelectorAll('.project__card');
        this.closeBtn = this.modal.querySelector('.modal--close');
        this.prevActiveElement = null;
        
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
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });

        // Ловушка фокуса внутри модалки
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.trapFocus(e);
            }
        });
    }
    
    openModal(project) {
        if (!project) return;
        
        // Сохраняем активный элемент ДО открытия модалки
        this.prevActiveElement = document.activeElement;
        
        this.updateModalContent(project);
        this.modal.style.display = 'block';
        
        // Устанавливаем доступность
        this.setModalAccessibility(true);
        
        // Фокусируемся на кнопке закрытия
        this.closeBtn.focus();
    }
    
    closeModal() {
        this.modal.style.display = 'none';
        
        // Восстанавливаем доступность
        this.setModalAccessibility(false);
        
        // Возвращаем фокус
        if (this.prevActiveElement) {
            this.prevActiveElement.focus();
        }
    }
    
    setModalAccessibility(open) {
        if (open) {
            // Показываем модалку для скринридеров
            this.modal.setAttribute('aria-hidden', 'false');
            this.modal.removeAttribute('inert'); // Убираем inert с модалки!
            
            // Скрываем основной контент, но используем только aria-hidden
            document.querySelectorAll('main, header, footer, .projects-container')
                .forEach(el => {
                    if (!el.classList.contains('skip-link')) {
                        el.setAttribute('aria-hidden', 'true');
                        // Убираем inert чтобы не блокировать клики на модалке
                    }
                });
            
            // Блокируем скролл
            document.body.style.overflow = 'hidden';
        } else {
            // Скрываем модалку
            this.modal.setAttribute('aria-hidden', 'true');
            
            // Показываем основной контент
            document.querySelectorAll('main, header, footer, .projects-container')
                .forEach(el => {
                    el.removeAttribute('aria-hidden');
                });
            
            // Разблокируем скролл
            document.body.style.overflow = 'auto';
        }
    }
    
    trapFocus(e) {
        const focusableElements = this.modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
    
    updateModalContent(project) {
        // Заголовок
        document.getElementById('modalTitle').textContent = project.dataset.title;
        
        // Описание
        document.getElementById('modalDescription').textContent = project.dataset.description;

        // Технологии
        const techContainer = document.getElementById('modalTechnologies');
        techContainer.innerHTML = JSON.parse(project.dataset.technologies)
            .map(tech => `<span class="tech__item">${tech}</span>`)
            .join('');

        // Ссылки
        const demoLink = document.getElementById('demoLink');
        const githubLink = document.getElementById('githubLink');
        
        demoLink.href = project.dataset.demo;
        githubLink.href = project.dataset.github;
        
        // Обновляем aria-label для кнопок ссылок
        demoLink.setAttribute('aria-label', `Посмотреть демо проекта ${project.dataset.title}`);
        githubLink.setAttribute('aria-label', `Открыть исходный код проекта ${project.dataset.title} на GitHub`);
        
        // Галерея
        const thumbnailsContainer = document.getElementById('thumbnails');
        thumbnailsContainer.innerHTML = JSON.parse(project.dataset.images)
            .map((image, index) => 
                `<img loading="lazy" class="project__image" 
                     src="../images/icons/${image}" 
                     alt="Скриншот проекта ${project.dataset.title} - ${index + 1}"
                     data-index="${index}">`)
            .join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectModal();
});