import React from "react";
const MockPage = () => {
    return(
        <div style={{marginTop:'0px'}}>
        <iframe
            src="http://localhost:3000"
            style={{
                width: "100%",
                height: "100vh",
                border: "none" // Optional, to remove iframe borders
            }}
        >
        </iframe>
        </div>
    );
};
export default MockPage;