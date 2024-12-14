import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionService from "../services/QuestionService";

const CodeNowPage = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState(''); // State for code input
  const [output, setOutput] = useState(''); // State for code output
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lang, setLang] = useState('c'); // State for selected language

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await QuestionService.getQuestion(id);
        setQuestion(data);
      } catch (error) {
        setError("Failed to load question");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleRunCode = async () => {
    try {
      const result = await QuestionService.runCode(id, code, lang); // Send code to backend
      setOutput(result); // Assuming backend returns { output: "Execution result" }
      console.log(result);
    } catch (error) {
      setOutput("An error occurred while running the code.");
    }
  };

  if (loading) return <div>Loading question...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left side for question */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ddd' }}>
        <h1>Question: {question.fullQuestion}</h1>
        <p>Difficulty: {question.difficulty}</p>
        <p>{question.description}</p>
      </div>

      {/* Right side for code editor and output */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h2>Code Editor</h2>
        
        {/* Dropdown to select language */}
        <label htmlFor="langSelect">Select Language: </label>
        <select
          id="langSelect"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          style={{ marginBottom: '10px' }}
        >
          <option value="c">C/C++</option>
          <option value="py">Python</option>
          <option value="java">Java</option>
        </select>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ width: '100%', height: '60%' }}
          placeholder="Write your code here..."
        />
        <button onClick={handleRunCode} style={{ marginTop: '10px' }}>
          Run Code
        </button>

        {/* Display output */}
        {output && (
          <div style={{ marginTop: '20px' }}>
            <h3>Output:</h3>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeNowPage;
