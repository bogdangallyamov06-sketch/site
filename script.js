// 1. ПЕЧАТАЮЩИЙСЯ ЗАГОЛОВОК (Typewriter)
document.addEventListener('DOMContentLoaded', function() {
    const titleElement = document.getElementById('typewriterTitle');
    const fullText = "Куда отправимся этим летом? ✈️";
    let i = 0;
    
    function typeWriter() {
        if (i < fullText.length) {
            titleElement.innerHTML += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    
    // Небольшая задержка перед началом анимации
    setTimeout(typeWriter, 300);
    
    // 2. ТАБЫ (переключение категорий)
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    function switchTab(tabId) {
        // Скрыть все контенты
        tabContents.forEach(content => {
            content.classList.remove('active-content');
        });
        // Показать выбранный
        const activeTabContent = document.getElementById(tabId);
        if (activeTabContent) {
            activeTabContent.classList.add('active-content');
        }
        // Обновить активный класс у кнопок
        tabBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
            }
        });
    }
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // 3. ПРОГРЕСС-БАР И СЛАЙДЕР ЗНАЧЕНИЙ
    const slider = document.getElementById('readinessSlider');
    const progressBar = document.getElementById('progressBar');
    const sliderValueSpan = document.getElementById('sliderValue');
    
    function updateProgress(value) {
        const percent = value;
        progressBar.style.width = percent + '%';
        sliderValueSpan.textContent = percent + '%';
        // Дополнительный эффект: изменение цвета прогресса от оранжевого к ярко-зелёному
        if (percent > 70) {
            progressBar.style.background = "linear-gradient(90deg, #10b981, #059669)";
        } else if (percent > 30) {
            progressBar.style.background = "linear-gradient(90deg, #f59e0b, #f97316)";
        } else {
            progressBar.style.background = "linear-gradient(90deg, #f97316, #ea580c)";
        }
    }
    
    if (slider && progressBar) {
        // начальное значение
        updateProgress(0);
        
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            updateProgress(val);
        });
    }
    
    // 4. КАСТОМНЫЙ ЧЕКБОКС + сообщение
    const checkbox = document.getElementById('subscribeCheckbox');
    const messageBox = document.getElementById('subscribeMessage');
    
    if (checkbox) {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                messageBox.textContent = '✅ Спасибо! Лучшие туристические предложения придут к вам на почту.';
                messageBox.style.color = '#1e7e34';
            } else {
                messageBox.textContent = '❌ Вы отписались от рассылки. Всегда можно вернуться!';
                messageBox.style.color = '#b91c1c';
                setTimeout(() => {
                    if (!checkbox.checked) messageBox.textContent = '';
                }, 3000);
            }
            // Автоматически скрыть сообщение через 4 секунды для позитивного варианта
            if (e.target.checked) {
                setTimeout(() => {
                    if (checkbox.checked) messageBox.textContent = '';
                }, 4000);
            }
        });
    }
    
    // 5. НЕБОЛЬШОЙ ДОП: запоминаем готовность из слайдера при обновлении (не обязательно, но приятно)
    const savedProgress = localStorage.getItem('travelReadiness');
    if (savedProgress !== null && slider) {
        slider.value = savedProgress;
        updateProgress(savedProgress);
    }
    if (slider) {
        slider.addEventListener('change', (e) => {
            localStorage.setItem('travelReadiness', e.target.value);
        });
    }
});