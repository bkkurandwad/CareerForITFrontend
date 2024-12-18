const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Job Position: Full Stack Developer, Job Description: React, Nodejs MySql, Years of Experience: 6, Depends on this information\nplease give me 5 Interview question with Answered in Json Format, Give Question and Answered as field in JSON\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"Question\": \"Describe your experience with React.js, focusing on specific projects where you utilized its features and overcame challenges.\",\n    \"Answer\": \"In my previous role, I led the development of a single-page application (SPA) using React for a client's e-commerce platform.  I implemented features like dynamic product listings, a user-friendly shopping cart, and a secure checkout process using React Router for navigation and Redux for state management.  One challenge was optimizing performance for a large product catalog.  To address this, I implemented lazy loading of components and utilized React.memo for performance optimization.  I also have experience with React Hooks and Context API, which I used extensively to improve code organization and reusability.\"\n  },\n  {\n    \"Question\": \"Explain your Node.js experience.  What are some of your preferred Node.js frameworks or libraries and why?\",\n    \"Answer\": \"I have extensive experience building RESTful APIs with Node.js and Express.js.  Express.js's simplicity and ease of use make it ideal for rapid prototyping and development. I've also worked with NestJS in a previous project, leveraging its modularity and dependency injection features for building a more scalable and maintainable backend system.  For database interactions, I'm proficient with Mongoose ODM for MongoDB and Sequelize for relational databases like MySQL.  My preference depends on the project's requirements – for larger projects with a need for strong structure, NestJS is often my go-to; for smaller, faster projects, Express.js provides the right level of flexibility.\"\n  },\n  {\n    \"Question\": \"How would you handle a database transaction in MySQL to ensure data integrity, especially in a scenario involving multiple related updates?\",\n    \"Answer\": \"To maintain data integrity in MySQL during multiple related updates, I would utilize transactions.  This ensures that either all updates are committed successfully or none are, preventing inconsistent data states.  I would wrap the entire sequence of update statements within a `BEGIN TRANSACTION`, `COMMIT` block. If any error occurs during the process, I'd use a `ROLLBACK` statement to revert any changes made.  This ensures atomicity, consistency, isolation, and durability (ACID properties) of the database operation.\"\n  },\n  {\n    \"Question\": \"Describe a time you had to debug a complex issue in a full-stack application. What was your approach and what did you learn?\",\n    \"Answer\": \"In a past project, we encountered a race condition in our Node.js backend that resulted in inconsistent data in the database.  The issue was intermittent and difficult to reproduce. To debug, I first thoroughly reviewed the logs, then utilized a debugging tool to step through the code execution.  After identifying the problematic section, I used various logging techniques and added more comprehensive error handling to pinpoint the exact cause. This involved analyzing asynchronous operations and understanding the timing of database interactions.  I learned the importance of thorough testing and using proper logging and debugging tools to systematically approach and resolve complex issues.  The solution involved implementing appropriate locking mechanisms to prevent concurrent access to the critical sections of the code.\"\n  },\n  {\n    \"Question\": \"How do you stay up-to-date with the latest trends and technologies in the full-stack development world?\",\n    \"Answer\": \"I actively engage in continuous learning.  I regularly read industry blogs and publications such as Medium, Dev.to, and Hacker News to stay informed about new releases and best practices.  I participate in online communities like Stack Overflow and Reddit's r/javascript and r/node to learn from others' experiences and contribute to discussions.  I also dedicate time to personal projects to experiment with new technologies and frameworks and occasionally attend online workshops and webinars to deepen my understanding of specific topics.\"\n  }\n]\n```\n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  console.log(result.response.text());
}
export const chatSession = model.startChat({
  generationConfig});
run();