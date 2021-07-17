var express = require("express");
var cors = require("cors");
var app = express();
const axios = require("axios");
const path = require("path");
const requireHTTPS = require("./middleware/requireHTTPS");
//in that way we don't have to deal with CORS errors
app.use(cors());
//we call for the data based on the location. We are using axios to fetch 
//those data and we send a request and taking back a response by using express.js

app.get("/api/location/search/:location", async (req, res) => {
  let response;
  try {
    response = await axios.get(
      `https://www.metaweather.com/api/location/search/?query=${req.params.location}`
    );
  } catch (e) {
    res.status(404).send();
  }  
  res.status(200).send(response.data);

});

//In here we call for the consolitated data and using sync await we 
//achine an asychronous call
app.get("/api/location/:woed", async (req, res) => {
  let response;

  try {
    response = await axios.get(
      `https://www.metaweather.com/api/location/${req.params.woed}`
    );
  } catch (e) {
    res.status(404).send();
  }
    res.status(200).send(response.data);

});


//we use that function to make the server to run in a different docker from client
//and fron-end side.
const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.log(`Server listening on port ${PORT}`);
});


