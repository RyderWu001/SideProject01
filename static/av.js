document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('add-button').addEventListener('click', addVideo);
    loadVideos();
});

function addVideo() {
    const url = document.getElementById('video-url').value;
    const type = document.getElementById('video-type').value;
    if (url && type) {
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({ url, type });
        localStorage.setItem('videos', JSON.stringify(videos));
        document.getElementById('video-url').value = '';
        displayVideos();
    } else {
        alert('請輸入有效的影片連結和選擇影片類型');
    }
}

function loadVideos() {
    displayVideos();
}

function displayVideos() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = '';

    videos.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.innerHTML = getVideoEmbedHTML(video, index);
        videoContainer.appendChild(videoItem);
    });
}

function getVideoEmbedHTML(video, index) {
    let embedHTML = '';
    switch (video.type) {
        case 'youtube':
            const youtubeId = extractYoutubeId(video.url);
            embedHTML = youtubeId ? `<iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen></iframe>` : `<a href="${video.url}" target="_blank">無效的 YouTube 連結，點擊這裡觀看</a>`;
            break;
        case 'xvideo':
            const xvideoId = extractXvideoId(video.url);
            embedHTML = xvideoId ? `<iframe src="https://www.xvideos.com/embedframe/${xvideoId}" frameborder="0" allowfullscreen></iframe>` : `<a href="${video.url}" target="_blank">無效的 XVideo 連結，點擊這裡觀看</a>`;
            break;
        case 'jable':
            const jableId = extractJableId(video.url);
            embedHTML = jableId ? `<iframe src="https://jable.tv/v/${jableId}" frameborder="0" allowfullscreen></iframe>` : `<a href="${video.url}" target="_blank">無效的 Jable 連結，點擊這裡觀看</a>`;
            break;
        default:
            embedHTML = `<a href="${video.url}" target="_blank">未知的影片類型，點擊這裡觀看</a>`;
            break;
    }
    return embedHTML + `<button onclick="deleteVideo(${index})">刪除</button>`;
}

function deleteVideo(index) {
    let videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.splice(index, 1);
    localStorage.setItem('videos', JSON.stringify(videos));
    displayVideos();
}

function extractYoutubeId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractXvideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?xvideos\.com\/video([0-9]+)\/.*/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function extractJableId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?jable\.tv\/videos\/([a-zA-Z0-9_-]+)\/.*/;
    const match = url.match(regex);
    return match ? match[1] : null;
}
