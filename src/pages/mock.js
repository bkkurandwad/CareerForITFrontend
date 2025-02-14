import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

// const MockPage = () => {
//     const username = Cookies.get("username");
//     const mock_interview_url = process.env.REACT_APP_MOCK_INTERVIEW_URL;
//     useEffect(() => {
//         if (username) {
//             const url = `${mock_interview_url}/dashboard/${username}`;
//             window.open(url, "_blank"); // Opens in a new tab
//         } else {
//             console.warn("Username not found in cookies!");
//         }
//     }, [username]);

//     return (
//         <div>
//             <h2>Redirecting...</h2>
//         </div>
//     );
// };

const MockPage = () => {
   // const username = Cookies.get("username");
    const usermail = Cookies.get("username") || 1;
    console.log(usermail);
    const resume_url = "http://localhost:3000";
    const mock_interview_url = process.env.REACT_APP_MOCK_INTERVIEW_URL;
 //   console.log(username);
    // return(
    //     <div style={{marginTop:'0px'}}>
    //     <iframe
    //         src={`${mock_interview_url}/dashboard/${username}`}
    //         style={{${usermail}
    //             width: "100%",
    //             height: "100vh",
    //             border: "none" // Optional, to remove iframe borders
    //         }}
    //     >
    //     </iframe>
    //     </div>
    // );
    useEffect(() => {
              if (usermail) {
                  const url = `${resume_url}/dashboard/${Cookies.get("username") || 1}`;
                  window.open(url, "_blank"); // Opens in a new tab
              } else {
                  console.warn("Username not found in cookies!");
              }
          }, [usermail]);
      
          return (
              <div>
                  <h2>Redirecting...</h2>
              </div>
          );
};


export default MockPage;