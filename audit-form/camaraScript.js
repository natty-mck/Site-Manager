const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('vid');

function camaraPreview() {
    document.getElementById("camaraPreview").style.display = "block";

    // Request access to the camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        // Set the video element's source object to the stream
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      })

    document.getElementById("camaraPreview").scrollIntoView({ behavior: 'smooth' });
    document.body.style.overflowY = "hidden"
      
}

function takePhoto() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
}


function closePhoto() {
    document.getElementById("camaraPreview").style.display = "none";
    document.body.style.overflowY = "auto"
}