// Function to POST data
const postData = async (url = '', data = {}) => {
    console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(data),// body data type must match "Content-Type" header
    });
    try {
        const newData = await response.json();
        // console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
}

// Call function
postData('/addAnimal', {animal: 'tiger'});
console.log(postData);


//How to set up a local environment for asynchronous JS?
// 1. Make sure Node is installed on your computer
// 2. Install Express and other Node packages as explained in this course
// 3. You will need 3 applications open: Code editor, Terminal, Chrome Browser
// 4. Code Editor: Write code in Files (for example server.js and app.js)
// 5. Terminal: Run server.js file using command node server.js
// 6. Browser: Look in the dev tools of chrome browser for feedback (use console.log() to make sure your code is working properly).