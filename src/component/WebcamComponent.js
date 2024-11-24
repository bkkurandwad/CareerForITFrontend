import React, { useEffect, useRef } from 'react';

const WebcamComponent = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Function to start the webcam
    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,  // Request video stream
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;  // Set the video stream to the video element
        }
      } catch (error) {
        console.error('Error accessing webcam: ', error);
      }
    };

    startWebcam();

    // Clean up when the component unmounts
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject;
        const tracks = stream?.getTracks();
        tracks?.forEach(track => track.stop()); // Stop the tracks to release the webcam
      }
    };
  }, []);

  return (
    <div>
      <h2>Webcam Stream</h2>
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />
    </div>
  );
};

export default WebcamComponent;
