import express from "express";
import bodyParser from "body-parser" ;
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://rickandmortyapi.com/api/character";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let content;

app.get("/", async (req,res) => {
    var n = Math.floor(Math.random() * 826)
     const result = await axios.get(API_URL + `/${n}`);
     
    
     //console.log(result.data.results[0]);
     res.render("index.ejs", { 
         content : result.data,
         location : result.data.location.name
     });
});


//  app.post("/", async (req, res) => {
//      const charStatus = req.body.status;
//      try {
//         const answer = await axios.get(API_URL + `?status=${charStatus}`);
//         console.log(answer.data);
//         res.render("index.ejs", { 
//             content : answer.data,
//             location : answer.data.location
//          });
//      } catch (error) {
//         console.log(error.message);
//      }
//  })

app.post("/", async (req, res) => {
    const charID = req.body.id;
    try {
        const answer = await axios.get(API_URL + `/${charID}`);
        console.log(answer.data);
        res.render("index.ejs", { 
            content : answer.data,
            location : answer.data.location.name
        });
    } catch (error) {
        console.log(error.message);
        
    }
})


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});