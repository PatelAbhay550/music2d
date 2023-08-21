gsap.to("body", {
    backgroundColor: '#1f1f1f',
    duration: 2,
    height: '100%',
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
});

const audio = document.querySelector("#audio");
const music = document.querySelector(".fa-play");
const timeline = document.querySelector('.timeline');
const timelineFill = document.querySelector('.timeline-fill');
const leftSpan = document.querySelector('.leftspan span');
const rightSpan = document.querySelector('.rightspan span');
const replay = document.querySelector("#replay");

let isDragging = false;

music.addEventListener("click", () => {
    music.classList.toggle("fa-play");
    music.classList.toggle("fa-pause");

    if (music.classList.contains("fa-play")) {
        audio.pause();
    } else {
        audio.play();
    }
});

timeline.addEventListener('mousedown', (event) => {
    isDragging = true;
    const timelineWidth = timeline.clientWidth;

    const mouseMoveHandler = (event) => {
        if (isDragging) {
            const offsetX = event.clientX - timeline.getBoundingClientRect().left;
            const percentage = (offsetX / timelineWidth) * 100;
            timelineFill.style.width = `${percentage}%`;

            const audioDuration = audio.duration;
            const audioPosition = (percentage / 100) * audioDuration;
            audio.currentTime = audioPosition;

            leftSpan.textContent = formatTime(audioPosition);
        }
    };

    const mouseUpHandler = () => {
        isDragging = true;
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
    event.preventDefault(); // Prevent text selection during dragging
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const audioDuration = audio.duration;
    const percentage = (currentTime / audioDuration) * 100;
    timelineFill.style.width = `${percentage}%`;

    leftSpan.textContent = formatTime(currentTime);
    rightSpan.textContent = formatTime(audioDuration);
});

replay.addEventListener("click", () => {
    music.classList.add("fa-play");
    music.classList.remove("fa-pause");
    audio.currentTime = 0;
    audio.pause();
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}
