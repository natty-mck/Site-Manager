const canvas = document.querySelector('canvas');
const video = document.getElementById("vid");
const screenshotImage = document.querySelector('img');
function camaraPreview() {
    let camaraPreview = document.getElementById("camaraPreview");
    if (camaraPreview.style.display == "none" || camaraPreview.style.display == "") {
        camaraPreview.style.display = "block";
        startCamara();
    }
    else if (camaraPreview.style.display == "block") {
        camaraPreview.style.display = "none";
    }
}
function startCamara() {
    let but = document.getElementById("but");
    let video = document.getElementById("vid");
    let mediaDevices = navigator.mediaDevices;
    vid.muted = true;
    // Accessing the user camera and video.
    mediaDevices
        .getUserMedia({
            video: true,
        })
        .then((stream) => {
            // Changing the source of video to current stream.
            video.srcObject = stream;
            video.addEventListener("loadedmetadata", () => {
                video.play();
            });
        })
    
}
function capturePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    screenshotImage.src = canvas.toDataURL('image/webp');
    screenshotImage.classList.remove('d-none');
}
function closePhoto() {
    let camaraPreview = document.getElementById("camaraPreview");
    if (camaraPreview.style.display == "block") {
        camaraPreview.style.display = "none";
    }
}