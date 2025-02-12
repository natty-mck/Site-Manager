const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const video = document.getElementById('vid');
let index = 0;

function camaraPreview(newIndex) {
    index = newIndex;
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

    document.getElementById("camaraPreview").scrollIntoView();
    document.body.style.overflowY = "hidden"
      
}

function takePhoto() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    document.getElementById(index + "takePhoto").innerText = "Photo Taken"
    closePhoto()
}


function closePhoto() {
    document.getElementById("camaraPreview").style.display = "none";
    document.body.style.overflowY = "auto"
}

/*
let currentFacingMode = 'user'; // Start with the front camera
      const video = document.getElementById('video');
      const flipButton = document.getElementById('flipCamera');

      function camaraPreview(facingMode) {
        const constraints = {
          video: {
            facingMode: facingMode
          }
        };

        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            video.srcObject = stream;
          })
          .catch((error) => {
            console.error('Error accessing the camera:', error);
            alert('Error accessing the camera. Please check your permissions.');
          });

        document.getElementById("camaraPreview").scrollIntoView();
        document.body.style.overflowY = "hidden";
      }

      // Add an event listener to the flip button
      flipButton.addEventListener('click', () => {
        currentFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';
        camaraPreview(currentFacingMode);
      });

      // Initial call to show the front camera
*/