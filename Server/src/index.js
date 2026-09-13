const Express = require('express');
const dotenv = require('dotenv');
const { expressConfig } = require('./config/express');

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

async function startServer() {
    expressConfig(app);

    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

startServer();
