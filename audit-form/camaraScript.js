const cameraOptions = document.getElementById('camara-select');
const video = document.getElementById('vid');
const canvas = document.getElementById('vidCanvas');
const screenshotImage = document.getElementById('vidImg');
let streamStarted = false;
let camaraPreviewCanvas = document.getElementById("camaraPreview");

function camaraPreview(count) {

    if (camaraPreviewCanvas.style.display == "none" || camaraPreviewCanvas.style.display == "") {
        camaraPreviewCanvas.style.display = "block";
        startCamara();

    }
    else if (camaraPreviewCanvas.style.display == "block") {
        camaraPreviewCanvas.style.display = "none";
    }

}


var camaraRotation = 'user';
var constraints = {
  video: {
    facingMode: {
        exact: camaraRotation
    }
  }
};


const getCameraSelection = async () => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  console.log(1, devices)
  const videoDevices = devices.filter(device => device.kind === 'videoinput');
  const options = videoDevices.map(videoDevice => {
    return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
  });
  cameraOptions.innerHTML = options.join('');
  startCamara()
};
document.addEventListener('DOMContentLoaded', () => {
    const cameraOptions = document.getElementById('camara-select');
    if (cameraOptions) {
      getCameraSelection();
    } else {
      console.error('cameraOptions element not found');
    }
  });
function startCamara() {
    if (streamStarted) {
        video.play();
        return;
    }
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
        const updatedConstraints = {
        ...constraints,
        deviceId: {
            exact: cameraOptions.value
        }
        };
        startStream(updatedConstraints);
    }
}


const startStream = async (constraints) => {
  document.getElementById("camara-warning").style.display = "none"
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  handleStream(stream);
};

function handleStream(stream) {
  video.srcObject = stream;
  streamStarted = true;
};


function capturePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    screenshotImage.src = canvas.toDataURL('image/webp');
    screenshotImage.classList.remove('d-none');


    closePhoto();
    addToPhotos();
}

function RotateCamara() {
    // Toggle the camera rotation mode
    camaraRotation = (camaraRotation === "user") ? "environment" : "user";

    // Define the constraints for the video stream
    let constraints = {
        video: {
            facingMode: camaraRotation // Use the updated camera rotation mode
        }
    };

    // Ensure cameraOptions is defined and has a valid value
    if (cameraOptions.value) {
        let updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value // Specify the exact device ID if available
            }
        };
        startStream(updatedConstraints); // Start the video stream with updated constraints
    } else {
        console.error("cameraOptions is not defined or does not have a valid value.");
    }
}

function closePhoto() {

    if (camaraPreviewCanvas.style.display == "block") {
        camaraPreviewCanvas.style.display = "none";
    }
}

function addToPhotos() {
    let image = screenshotImage.src;
    localStorage.setItem("takenPhotos",  image);
}