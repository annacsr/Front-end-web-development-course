// Global Variables
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 + '.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&APPID=a3100f0583480022bb444adb69730fdf&units=imperial';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
// Function called by event listener 
function performAction(e) {    
    const zip = document.getElementById('zip').value;
    if(zip <= 0 || zip > 99950 ) {
        alert("Please input a valid zip code!");
    }
    const feelings = document.getElementById('feelings').value;
    getData(baseURL, zip, apiKey).then(function(data) {
        postData('/addFeeling', {date: newDate, temp: data.main.temp, feeling: feelings} ).then(
            updateUI()
        );
    })
}
  
/* Function to GET Web API Data */
const getData = async(url, zip, key) => {

    const response = await fetch(url + zip + key);    
    try {
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

// Function to POST data
// an asyncoronous function that takes two arguments, the URL to make a POST to, and an object holding the data to POST.
const postData = async(url='', data={}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

/* Function to update UI */
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = 'Date: ' + allData.date;
      document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temp;
      document.getElementById('content').innerHTML = 'My feeling: ' + allData.feeling;
  
    } catch(error){
      console.log("error", error);
    }
  }
