/** @type {import("drizzle-kit").Config}; */

export default ({
  dialect: "postgresql",
  schema: "./utils/schema.js", 
  
  dbCredentials: {
    url: "postgresql://ai-interview-mocker_owner:TdSQpGm5F6yV@ep-curly-darkness-a5l6azpv.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  },
});
