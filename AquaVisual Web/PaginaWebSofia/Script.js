document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del carrusel principal ---
    const slider = document.getElementById('slider');
    const btnLeft = document.querySelector('.btn-left');
    const btnRight = document.querySelector('.btn-right');
    const sliderSections = document.querySelectorAll('.slider-section');

    if (slider && btnLeft && btnRight && sliderSections.length > 0) {
        let currentSlide = 0;
        const totalSlides = sliderSections.length;

        const updateSliderPosition = () => {
            const offset = -currentSlide * 100;
            slider.style.transform = `translateX(${offset}%)`;
        };

        btnRight.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSliderPosition();
        });

        btnLeft.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSliderPosition();
        });

        updateSliderPosition();
    } else {
        console.warn("[Carrusel Principal] No se encontraron todos los elementos necesarios.");
    }

    // --- Lógica del carrusel AquaVisual (slider horizontal de 3 imágenes) ---
    const aquavisualSliderTrack = document.querySelector('.aquavisual-image-slider .slider-track-aquavisual');

    if (aquavisualSliderTrack) {
        const aquavisualImages = aquavisualSliderTrack.querySelectorAll('img');
        const totalAquaVisualSlides = aquavisualImages.length;

        let currentAquaVisualSlide = 0;

        const updateAquaVisualSlider = () => {
            const offset = -currentAquaVisualSlide * 33.33; // Asume 3 imágenes visibles al 100%
            aquavisualSliderTrack.style.transform = `translateX(${offset}%)`;
        };

        const nextAquaVisualSlide = () => {
            currentAquaVisualSlide = (currentAquaVisualSlide + 1) % totalAquaVisualSlides;
            updateAquaVisualSlider();
        };

        setInterval(nextAquaVisualSlide, 3000);
        updateAquaVisualSlider();
    } else {
        console.error("[AquaVisual] No se encontró el elemento del carrusel.");
    }

    // --- Lógica del carrusel Blopper (mostrar una imagen a la vez, transición suave) ---
    const blopperSliderTrack = document.querySelector('.aquavisual-image-blopper .blopper-track-aquavisual');

    if (blopperSliderTrack) {
        const blopperImages = blopperSliderTrack.querySelectorAll('img');
        let currentBlopperSlide = 0;

        function showBlopperImage(index) {
            blopperImages.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
        }

        // Mostrar la primera imagen al cargar
        showBlopperImage(currentBlopperSlide);

        // Cambiar cada 3 segundos
        setInterval(() => {
            currentBlopperSlide = (currentBlopperSlide + 1) % blopperImages.length;
            showBlopperImage(currentBlopperSlide);
        }, 3000);
    } else {
        console.warn("[Blopper] No se encontró el contenedor del carrusel.");
    }

    // --- Lógica del mapa estático interactivo ---
    const hotspots = document.querySelectorAll('.map-hotspot');
    const tooltip = document.getElementById('locality-tooltip');
    const mapContainer = document.querySelector('.map-container');

    if (hotspots.length > 0 && tooltip && mapContainer) {
        hotspots.forEach(hotspot => {
            hotspot.addEventListener('mouseover', () => {
                const infoText = hotspot.dataset.info;

                if (infoText) {
                    tooltip.textContent = infoText;
                    tooltip.classList.add('active');

                    const hotspotRect = hotspot.getBoundingClientRect();
                    const mapRect = mapContainer.getBoundingClientRect();

                    let tooltipX = (hotspotRect.left - mapRect.left) + hotspotRect.width + 8;
                    let tooltipY = (hotspotRect.top - mapRect.top) + (hotspotRect.height / 2) - (tooltip.offsetHeight / 2);

                    tooltip.style.left = `${tooltipX}px`;
                    tooltip.style.top = `${tooltipY}px`;

                    const tooltipWidth = tooltip.offsetWidth;
                    const tooltipHeight = tooltip.offsetHeight;

                    const availableRight = window.innerWidth - hotspotRect.right;
                    const availableLeft = hotspotRect.left;
                    const availableTop = hotspotRect.top;
                    const availableBottom = window.innerHeight - hotspotRect.bottom;

                    if (availableRight < tooltipWidth + 10 && availableLeft >= tooltipWidth + 10) {
                        tooltipX = (hotspotRect.left - mapRect.left) - tooltipWidth - 8;
                        tooltip.style.left = `${tooltipX}px`;
                    }

                    if (
                        (availableRight < tooltipWidth + 10 && availableLeft < tooltipWidth + 10) ||
                        window.innerWidth < 500
                    ) {
                        if (availableTop >= tooltipHeight + 10) {
                            tooltipX = (hotspotRect.left - mapRect.left) + (hotspotRect.width / 2) - (tooltipWidth / 2);
                            tooltipY = (hotspotRect.top - mapRect.top) - tooltipHeight - 8;
                        } else {
                            tooltipX = (hotspotRect.left - mapRect.left) + (hotspotRect.width / 2) - (tooltipWidth / 2);
                            tooltipY = (hotspotRect.bottom - mapRect.top) + 8;
                        }

                        tooltip.style.left = `${tooltipX}px`;
                        tooltip.style.top = `${tooltipY}px`;
                    }

                    if (tooltipX < 0) tooltip.style.left = `5px`;
                    if ((tooltipX + tooltipWidth) > mapContainer.offsetWidth) {
                        tooltip.style.left = `${mapContainer.offsetWidth - tooltipWidth - 5}px`;
                    }

                    if (tooltipY < 0) tooltip.style.top = `5px`;
                    if ((tooltipY + tooltipHeight) > mapContainer.offsetHeight) {
                        tooltip.style.top = `${mapContainer.offsetHeight - tooltipHeight - 5}px`;
                    }
                }
            });

            hotspot.addEventListener('mouseout', () => {
                tooltip.classList.remove('active');
            });
        });
    } else {
        console.warn("[Mapa Interactivo] No se encontraron todos los elementos necesarios.");
    }
});
