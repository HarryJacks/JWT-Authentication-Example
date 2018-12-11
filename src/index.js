import axios from 'axios';

const getToken = () => {

    axios.post('http://localhost:3000/authenticate', {
        username: 'Harry',
        password: "12345",
        headers: {'Content-Type': 'application/json'}
      })
      .then(function (response) {
        document.getElementById("token").value = response.data.token;

      })
      .catch(function (error) {
        console.log(error);
      });

}

const getInfoUsingToken = () => {
    
    axios.post('http://localhost:3000/api/getInformation', {
            token: document.getElementById("token").value,
            headers: {'Content-Type': 'application/json'}
        })
        .then(function (response) {
            if ( response.data.information ) {
                document.getElementById("info").innerHTML = JSON.stringify(response.data.information);
            }
            if ( response.data.message ) {
                document.getElementById("message").innerHTML = response.data.message;
            }
        })
        .catch(function (error) {
        console.log(error);
        });

}


// Get Token button click
document.getElementById("getToken").addEventListener("click", function(){
    getToken();
});

// Get Info button click
document.getElementById("getInfo").addEventListener("click", function(){
    getInfoUsingToken();
});