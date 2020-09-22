const express = require('express');
const port = process.env.PORT || 3000; 
// preference to upload the code to hereku or, otherwise to localhost port 3000.

const app = express();

app.get('/', (req, res) => {
    res.send("Hi there...");
});

app.listen(port, () => console.log(`Server is running at port ${port}...`));
