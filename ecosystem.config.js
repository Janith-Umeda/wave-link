const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

module.exports = {
    apps: [{
        name: "wave-link",
        script: "./node_modules/.bin/next",
        args: "start",
        instances: 2,
        exec_mode: "cluster",
        env_prod: {
            APP_CONFIG: process.env.APP_CONFIG,
            GA_ID: process.env.GA_ID,
            NODE_ENV: 'production'
        }
    }]
}