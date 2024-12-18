"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import axios from 'axios';
import dbnow from "@/utils/db"; // Assuming db is a configured Prisma or Knex client
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal.jsx";
import { LoaderCircle } from "lucide-react";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";

function AddNewInterview() {
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    console.log(jobPosition, jobDesc, jobExperience);

    const InputPrompt =
      "Job Position="+jobPosition+", Job Description:" +jobDesc+", Years of Experience:" +jobExperience+",  Depends on this information please give me "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+ "Interview question with Answered in Json Format, Give Question and Answered as field in JSON";

    try {
      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response.text()
        .replace("json", "")
        .replace("", "");

        fetchUsers();



    //  console.log(JSON.parse(MockJsonResp));
     // setJsonResponse(MockJsonResp);
     // console.log(MockJsonResp);

      if (MockJsonResp) {
        console.log('tried earlier db');
        runRawQuery();
        const data = await dbnow.executeQuery('SELECT * FROM mockInterview'); // Raw SQL query
    console.log(data);
        testDbConnection();

        console.log('trying to submit');
        const res = submitInterviewDetails(
          "", 
          MockJsonResp, 
          jobPosition, jobDesc, jobExperience,
          user?.primaryEmailAddress?.emailAddress,
          moment().format('YYYY-MM-DD'), 
          uuidv4()
      );
      console.log(res);
      } else {
        console.error("ERROR: No response from AI");
      }
    } catch (error) {
      console.error("Error occurred while processing the request:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const users = await db.select().from(usersTable); // Assuming `usersTable` is defined in your schema
    console.log(users);
  };

  const testDbConnection = async () => {
    try {
      // Test if the connection works by running a simple query.
      const result = await db.select().from('your_table_name').limit(1);  // Change 'your_table_name' to a table that exists in your schema
  
      console.log('Database connection successful:', result);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  };

  const runRawQuery = async () => {
    try {
      // Corrected: Use dbFunctions to access executeQuery
      const result = await dbFunctions.executeQuery(sql`SELECT * FROM mockInterview`);
      console.log('Raw Query Result:', result);
    } catch (error) {
      console.error('Error executing raw query:', error);
    }
  };

  const submitInterviewDetails = async (name, jsonMockResp, jobPosition, jobDesc, jobExperience, createdBy, createdAt, mockId) => {
    try {
        // Create the interview data object
        const interviewData = {
            name,
            jsonMockResp,
            jobPosition,
            jobDesc,
            jobExperience,
            createdBy,
            createdAt,
            mockId
        };

        // Send POST request to the backend with interview data
        const response = await axios.post('http://careerforitserver-production.up.railway.app/code/submit', interviewData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Handle the response from the backend
        console.log('Response from server:', response.data);
        return response.data;
    } catch (error) {
        // Handle any error that occurred during the request
        console.error('Error submitting interview details:', error);
        return 'Error submitting details';
    }
};

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDailog(true)}
      >
        <h2 className="text-lg text-center">+ Add new</h2>
      </div>
      <Dialog open={openDailog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <div className="font-bold text-2xl">
                Tell us more about your job Interviewing
              </div>
            </DialogTitle>
            <form onSubmit={onSubmit}>
              <DialogDescription>
                <div>
                  <h2>
                    Add details about your job position/role, job description
                    and years of experience
                  </h2>
                </div>
                <div className="mt-7 my-3">
                  <label>Job Role/Job Position</label>
                  <Input
                    placeholder="Ex. Full Stack Developer"
                    required
                    onChange={(event) => setJobPosition(event.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Job Description/ Tech Stack (In Short)</label>
                  <Textarea
                    placeholder="Ex. React, Angular, NodeJs, MySql"
                    required
                    onChange={(event) => setJobDesc(event.target.value)}
                  />
                </div>
                <div className="my-3">
                  <label>Years of experience</label>
                  <Input
                    placeholder="Ex.5"
                    type="number"
                    max="100"
                    required
                    onChange={(event) => setJobExperience(event.target.value)}
                  />
                </div>
                <div className="flex gap-5 justify-end">
                  <Button type="button" onClick={() => setOpenDailog(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </DialogDescription>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;