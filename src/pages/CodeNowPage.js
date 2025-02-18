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
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Set default "Hello World" code based on the selected language
    const defaultCode = {
      c: `#include <stdio.h>\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
      py: `print("Hello, World!")`,
      java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}`
    };
    setCode(defaultCode[lang]);
  }, [lang]);

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

    const fetchSubmission = async () => {
      try {
        const data = await QuestionService.showCode(id);
        console.log(data);
        if(data){
          setSubmissions(data);
        }
      } catch (error) {
        setError("Failed to load submissions");
      } finally {
        setLoading(false);
      }
    }

    fetchSubmission();
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
  {/* <h1>
    Previous submissions
  </h1> */}
  {submissions.map((element, index) => (
    <div 
      key={index} 
      style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', borderBottom: '1px solid #ddd', padding: '10px 0' }}
    >
      
      <h3> {element.lang}</h3>
      <h3> {element.code}</h3>
      <h3> {element.result || "No Result"}</h3>
    </div>
  ))}
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
