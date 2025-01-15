import React, { useState, useRef, useEffect } from 'react';
import '../stylesheets/InterviewPage.css';

const InterviewPage = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcription, setTranscription] = useState('');
  const [responses, setResponses] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);

  const questions = [
    'Tell me about yourself.',
    'Why do you want to work here?',
    'What are your strengths and weaknesses?',
    'Describe a difficult technical problem you solved.',
    'How do you prioritize tasks in a project?',
    'What programming languages are you most comfortable with?',
    'Tell me about a time you worked on a team.',
    'What do you know about our company?',
    'Where do you see yourself in five years?',
    'What are your salary expectations?'
  ];

  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setIsInterviewActive(true);
      speakQuestion(questions[currentQuestionIndex]);

      if ('webkitSpeechRecognition' in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = true;

        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          setTranscription(transcript);
          setIsUserSpeaking(true);
        };

        recognition.onerror = (event) => console.error('Speech recognition error:', event.error);
        recognition.onend = () => setIsUserSpeaking(false);

        recognition.start();
      } else {
        console.error('Speech recognition is not supported in this browser.');
      }
    } catch (error) {
      console.error('Error accessing webcam and microphone:', error);
    }
  };

  const speakQuestion = (question) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.onend = () => setIsSpeaking(false);
      setIsSpeaking(true);
      synth.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  };

  const handleNextQuestion = () => {
    setResponses([...responses, transcription]);
    setTranscription('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      speakQuestion(questions[currentQuestionIndex + 1]);
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
    if (recognitionRef.current) recognitionRef.current.stop();
    setIsInterviewActive(false);
    alert(`Thank you! Your responses: ${JSON.stringify(responses)}`);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  return (
    <div className="interview-container">
      <h1>Interview</h1>
      <div className="left-right-container">
        <div className={`avatar-container ${isSpeaking ? 'speaking' : ''}`}>
          <img src="/pics/AI.webp" alt="Avatar" className="person-avatar" />
        </div>
        <div className={`video-container ${isUserSpeaking ? 'user-speaking' : ''}`}>
          <video ref={videoRef} autoPlay playsInline className="webcam" />
        </div>
      </div>
      <div className="transcription-container">
        <h3>Your Answer:</h3>
        <p>{transcription}</p>
      </div>
      <div className="button-container">
        {!isInterviewActive ? (
          <button className="start-button" onClick={startInterview}>
            Start Interview
          </button>
        ) : (
          <>
            <button className="next-button" onClick={handleNextQuestion}>
              Next Question
            </button>
            <button className="end-button" onClick={endInterview}>
              End Interview
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
