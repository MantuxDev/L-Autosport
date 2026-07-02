
    const track   = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const CARD_GAP   = 24;
    let currentIndex = 0;
    let autoplayTimer;

    function getCardWidth() {
        return track.children[0].getBoundingClientRect().width;
    }

    function getVisibleCount() {
        const viewportW = track.parentElement.getBoundingClientRect().width;
        return Math.floor(viewportW / (getCardWidth() + CARD_GAP));
    }

    function getMaxIndex() {
        return track.children.length - getVisibleCount();
    }

    function slideTo(index) {
        const maxIndex = getMaxIndex();

        // loop: se supera il massimo torna a 0, se va sotto 0 va al massimo
        if (index > maxIndex) index = 0;
        if (index < 0)        index = maxIndex;

        currentIndex = index;

        const offset = currentIndex * (getCardWidth() + CARD_GAP);
        track.style.transform = `translateX(-${offset}px)`;

        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            slideTo(currentIndex + 1);
        }, 5000);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    prevBtn.addEventListener('click', () => { slideTo(currentIndex - 1); resetAutoplay(); });
    nextBtn.addEventListener('click', () => { slideTo(currentIndex + 1); resetAutoplay(); });

    window.addEventListener('resize', () => slideTo(0));

    // pausa autoplay quando il mouse è sopra il carosello
    track.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    track.addEventListener('mouseleave', startAutoplay);

    slideTo(0);
    startAutoplay();