/* Global Variables */
let userEntry = "";

/* api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key} API link*/
/* api key = c3ed2f2ae9671c3671b587f5fbd620b9 */
// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateEntryHolderContent);

/* Function to POST data */
const postData = async(url, responseObj = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseObj)
    });
    try {
        const newData = await response.json();
        console.log(JSON.stringify(newData));
    } catch (error) {
        console.log('Post error', error);
    }
}

/* Function to GET Project Data and update on UI*/
const updateUI = async(url) => {
    const response = await fetch(url);
    try {
        const responseData = await response.json();
        document.getElementById('entryHolder').innerHTML = `<strong>${responseData.date}</strong>
        <br>
        <em>${responseData.feelings}
        </em>
        <br>
        <img src=${responseData.image}></img>
        `;

        //"img.jpg" onerror="alert('Hacked!')"
        console.log(`<strong>${responseData.date}</strong>
        <br>
        <img src=${responseData.image}></img>
        <br><em>${responseData.feelings}
        </em>`);
    } catch (error) {
        console.log('Get error', error);
    }
}

/* Function called by event listener */
function generateEntryHolderContent(event) {
    let image = document.getElementById('image').value;
    userEntry = document.getElementById('feelings').value;
    postData('http://localhost:8000/postdata', {
        date: newDate,
        feelings: userEntry,
        image: image
    }).then(function() {
        updateUI('http://localhost:8000/getdata')
    });
}