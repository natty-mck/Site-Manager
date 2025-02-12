

function camaraPreview() {
    // Select the video element
    const video = document.getElementById('vid');
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

function closePhoto() {
    document.getElementById("camaraPreview").style.display = "none";
    document.body.style.overflowY = "auto"
}