const Express = require('express');
const dotenv = require('dotenv');
const { expressConfig } = require('./config/express');
const { runDB } = require('./config/mongoose');
const { routerConfig } = require('./config/router');

dotenv.config();
const app = Express();
const port = process.env.PORT || 3000;

async function startServer() {
    await runDB();
    expressConfig(app);
    routerConfig(app);

    app.listen(port, () => { 
        console.log(`Server is running on port ${port}`);
    })
}

startServer();
