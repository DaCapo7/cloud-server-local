const fs = require('fs');
const path = require('path');
const express = require('express');
const url = require('url');
const app = express();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get("/l/*", (req, res) => {
    const p = path.join(__dirname,"Books",decodeURIComponent(req.url.substring(2,req.url.length)))

    if (fs.lstatSync(p).isFile() ){
        
        const re = new RegExp('.*\\\\')
        const dir = re.exec(p)[0]
        
        const files = fs.readdirSync(dir)
        //res.send(JSON.stringify(files))

        res.json({download:true, link:p})
    }else{
        const files = fs.readdirSync(p)
        res.json({download:false, list:files})
    }

    
    
})



app.get('/download', function (req, res) {
   
    const requrl = decodeURIComponent(req.url).substring(12,decodeURIComponent(req.url).length)

    console.log(requrl)
    res.download(requrl)
  });

app.listen(3000, ()=> {
    console.log("listening on 3000")
})