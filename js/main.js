document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.dynamic-island');
    let isVisible = false;
    
    function updateNavbar() {
        const inHero = window.scrollY < window.innerHeight - 100;
        if (inHero && isVisible) {
            navbar.classList.remove('expand');
            isVisible = false;
        } else if (!inHero && !isVisible) {
            navbar.classList.add('expand');
            isVisible = true;
        }
    }
    window.addEventListener('scroll', updateNavbar);
    updateNavbar();

    const video = document.getElementById('customVideo');
    const playOverlay = document.getElementById('playOverlay');
    const bigPlayBtn = document.getElementById('bigPlayBtn');
    const videoOverlay = document.getElementById('videoOverlay');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const rewindBtn = document.getElementById('rewindBtn');
    const forwardBtn = document.getElementById('forwardBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const pipBtn = document.getElementById('pipBtn');
    const timelineContainer = document.querySelector('.timeline-container');
    const timelineProgress = document.getElementById('timelineProgress');
    const timelineBuffer = document.getElementById('timelineBuffer');
    const timeTooltip = document.getElementById('timeTooltip');
    const currentTimeEl = document.getElementById('currentTime');
    const totalTimeEl = document.getElementById('totalTime');

    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    function playVideo() {
        video.play();
        playOverlay.classList.add('hidden');
        videoOverlay.classList.add('active');
        video.parentElement.classList.add('playing');
    }

    function pauseVideo() {
        video.pause();
        video.parentElement.classList.remove('playing');
        playOverlay.classList.remove('hidden');
    }

    bigPlayBtn.addEventListener('click', playVideo);
    playOverlay.addEventListener('click', (e) => {
        if (e.target === playOverlay) playVideo();
    });

    playPauseBtn.addEventListener('click', () => {
        video.paused ? playVideo() : pauseVideo();
    });

    rewindBtn.addEventListener('click', () => {
        video.currentTime = Math.max(0, video.currentTime - 10);
    });

    forwardBtn.addEventListener('click', () => {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
    });

    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        timelineProgress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(video.currentTime);
    });

    video.addEventListener('progress', () => {
        if (video.buffered.length > 0) {
            const bufferedEnd = video.buffered.end(video.buffered.length - 1);
            const percent = (bufferedEnd / video.duration) * 100;
            timelineBuffer.style.width = `${percent}%`;
        }
    });

    video.addEventListener('loadedmetadata', () => {
        totalTimeEl.textContent = formatTime(video.duration);
    });

    video.addEventListener('ended', () => {
        pauseVideo();
    });

    let isDragging = false;

    timelineContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        seekVideo(e);
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) seekVideo(e);
        const rect = timelineContainer.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right) {
            const percent = (e.clientX - rect.left) / rect.width;
            timeTooltip.textContent = formatTime(percent * video.duration);
            timeTooltip.style.left = `${e.clientX - rect.left}px`;
            timeTooltip.style.opacity = '1';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    timelineContainer.addEventListener('mouseleave', () => {
        timeTooltip.style.opacity = '0';
    });

    function seekVideo(e) {
        const rect = timelineContainer.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        video.currentTime = percent * video.duration;
    }

    volumeSlider.addEventListener('input', (e) => {
        video.volume = e.target.value;
        if (video.muted) {
            video.muted = false;
            video.parentElement.classList.remove('muted');
        }
    });

    volumeBtn.addEventListener('click', () => {
        video.muted = !video.muted;
        video.parentElement.classList.toggle('muted', video.muted);
        volumeSlider.value = video.muted ? 0 : video.volume;
    });

    fullscreenBtn.addEventListener('click', async () => {
        if (document.fullscreenElement) {
            await document.exitFullscreen();
            video.parentElement.classList.remove('fullscreen');
        } else {
            await video.parentElement.requestFullscreen();
            video.parentElement.classList.add('fullscreen');
        }
    });

    pipBtn.addEventListener('click', async () => {
        if (document.pictureInPictureElement) {
            await document.exitPictureInPicture();
        } else if (document.pictureInPictureEnabled) {
            await video.requestPictureInPicture();
        }
    });

    video.addEventListener('dblclick', (e) => {
        const rect = video.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 3) {
            video.currentTime = Math.max(0, video.currentTime - 10);
        } else if (x > (rect.width * 2) / 3) {
            video.currentTime = Math.min(video.duration, video.currentTime + 10);
        } else {
            video.paused ? playVideo() : pauseVideo();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                video.paused ? playVideo() : pauseVideo();
                break;
            case 'ArrowLeft':
                video.currentTime = Math.max(0, video.currentTime - 5);
                break;
            case 'ArrowRight':
                video.currentTime = Math.min(video.duration, video.currentTime + 5);
                break;
            case 'ArrowUp':
                e.preventDefault();
                video.volume = Math.min(1, video.volume + 0.1);
                volumeSlider.value = video.volume;
                break;
            case 'ArrowDown':
                e.preventDefault();
                video.volume = Math.max(0, video.volume - 0.1);
                volumeSlider.value = video.volume;
                break;
            case 'm':
                video.muted = !video.muted;
                video.parentElement.classList.toggle('muted', video.muted);
                break;
            case 'f':
                fullscreenBtn.click();
                break;
        }
    });
});