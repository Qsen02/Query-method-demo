const Express = require('express');
const dotenv = require('dotenv');
const { expressConfig } = require('./config/express');
const { runDB } = require('./config/mongoose');

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

async function startServer() {
    await runDB();
    expressConfig(app);

    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

startServer();
