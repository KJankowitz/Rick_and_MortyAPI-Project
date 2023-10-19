import express from "express";
import bodyParser from "body-parser" ;
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://rickandmortyapi.com/api/character";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    var n = Math.floor(Math.random() * 826)
     const result = await axios.get(API_URL + `/${n}`);
     
    
     //console.log(result.data.results[0]);
     res.render("index.ejs", { 
         content : result.data,
         location : result.data.location.name
     });
});


app.post("/results", async (req, res) => {
    try {
      console.log(req.body);
      const name = req.body.name;
      const status = req.body.status;
      const gender = req.body.gender;
      
      const response = await axios.get( API_URL + 
        `?name=${name}&status=${status}&gender=${gender}`
      );
      const result = response.data.results;
      var n = Math.floor(Math.random() * result.length)
      console.log(result[n]);
      res.render("index.ejs", {
        content: result[n],
        location: result[n].location.name
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: "No characters match your criteria.",
      });
    }
  });

// app.post("/", async (req, res) => {
//     const charID = req.body.id;
//     try {
//         const answer = await axios.get(API_URL + `/${charID}`);
//         console.log(answer.data);
//         res.render("index.ejs", { 
//             content : answer.data,
//             location : answer.data.location.name
//         });
//     } catch (error) {
//         console.log(error.message);
        
//     }
// })


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});