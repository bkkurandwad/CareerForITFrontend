import React, { useState, useRef, useEffect } from 'react';

const InterviewPage = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcription, setTranscription] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);  // To hold the media stream
  const recognitionRef = useRef(null); // To hold the speech recognition instance
  const synthRef = useRef(null); // To hold speech synthesis instance

  // List of 10 software interview questions
  const questions = [
    'Tell me about yourself.',
    'Why do you want to work here?',
    'What are your strengths and weaknesses?',
    'Can you describe a difficult technical problem you solved?',
    'How do you prioritize tasks in a project?',
    'What programming languages are you most comfortable with?',
    'Tell me about a time you worked on a team.',
    'What do you know about our company?',
    'Where do you see yourself in five years?',
    'What are your salary expectations?'
  ];

  // Function to start the webcam and microphone
  const startInterview = async () => {
    try {
      // Request webcam and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,  // Request video stream
        audio: true   // Request audio stream
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream; // Set the video element to show the stream
      }
      streamRef.current = stream; // Save the stream reference for later stopping
      setIsInterviewActive(true);  // Set interview as active

      // Start speech recognition if available (browser compatibility)
      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;

        recognition.lang = 'en-US';
        recognition.interimResults = true;  // Allow intermediate results
        recognition.continuous = true; // Keep recognizing even with pauses
        recognition.start();

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setTranscription(transcript); // Update transcription with the recognized speech
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        recognition.onend = () => {
          console.log('Speech recognition ended');
          proceedToNextQuestion();
        };
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }

      // Start speaking the first question
      speakQuestion(questions[currentQuestionIndex]);

    } catch (error) {
      console.error('Error accessing webcam and microphone:', error);
    }
  };

  // Function to speak the question using speech synthesis
  const speakQuestion = (question) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(question);
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  // Function to proceed to the next question after getting an answer
  const proceedToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to next question
      setTranscription(''); // Clear previous transcription

      // Speak the next question
      speakQuestion(questions[currentQuestionIndex]);
    } else {
      setIsInterviewActive(false); // End interview after all questions
    }
  };

  // Function to stop the webcam and microphone
  const endInterview = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => track.stop()); // Stop all tracks (video, audio)
      streamRef.current = null;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop(); // Stop speech recognition
    }

    setIsInterviewActive(false); // Set interview as inactive
    setTranscription('');  // Clear transcription text
  };

  useEffect(() => {
    // Cleanup the webcam stream and speech recognition when the component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return (
    <div className="interview">
      <h1>Interview</h1>

      {/* Video element to display the webcam stream */}
      <video ref={videoRef} autoPlay playsInline width="640" height="480" />

      {/* Display transcribed text */}
      <div>
        <h3>Your Answer:</h3>
        <p>{transcription}</p>
      </div>

      {/* Start and End buttons */}
      {!isInterviewActive ? (
        <button onClick={startInterview}>Start Interview</button>
      ) : (
        <button onClick={endInterview}>End Interview</button>
      )}
    </div>
  );
};

export default InterviewPage;
