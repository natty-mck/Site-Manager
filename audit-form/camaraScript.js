const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('vid');
let index = 0;

function camaraPreview(newIndex) {
    index = newIndex;
    document.getElementById("camaraPreview").style.display = "block";

    const constraints = {
      video: {
        facingMode: "environment"
      }}

    // Request access to the camera
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        // Set the video element's source object to the stream
        video.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the camera:', error);
      })

    document.getElementById("camaraPreview").scrollIntoView();
    document.body.style.overflowY = "hidden"
      
}

function takePhoto() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    document.getElementById(index + "takePhoto").innerText = "Photo Taken"
    closePhoto()
    addTakenPhoto(index) //defined in auditScript  

}


function closePhoto() {
    document.getElementById("camaraPreview").style.display = "none";
    document.body.style.overflowY = "auto"
}


