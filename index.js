import express from "express";
import bodyParser from "body-parser" ;
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://rickandmortyapi.com/api/character";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req,res) => {
    res.render("index.ejs"), {
        content: "waiting for data"
    }
    });
    // const result = await axios.get(API_URL);
    
    // //console.log(result.data.results[0]);
    // res.render("index.ejs", { 
    //     content : result.data.results[Math.floor(Math.random() * result.length)],
    //     location : result.data.results[Math.floor(Math.random() * result.length)].location.name
    // });
//});


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