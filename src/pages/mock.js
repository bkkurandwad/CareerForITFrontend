import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

const MockPage = () => {
    const username = Cookies.get("username");
    const mock_interview_url = process.env.REACT_APP_MOCK_INTERVIEW_URL;
    useEffect(() => {
        if (username) {
            const url = `${mock_interview_url}/dashboard/${username}`;
            window.open(url, "_blank"); // Opens in a new tab
        } else {
            console.warn("Username not found in cookies!");
        }
    }, [username]);

    return (
        <div>
            <h2>Redirecting...</h2>
        </div>
    );
};

// const MockPage = () => {
//     const username = Cookies.get("username");
//     console.log(username);
//     return(
//         <div style={{marginTop:'0px'}}>
//         <iframe
//             src={`http://localhost:3000/dashboard/${username}`}
//             style={{
//                 width: "100%",
//                 height: "100vh",
//                 border: "none" // Optional, to remove iframe borders
//             }}
//         >
//         </iframe>
//         </div>
//     );
// };


export default MockPage;