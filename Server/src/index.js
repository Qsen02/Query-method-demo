const Express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

async function startServer() { 
    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

startServer();
