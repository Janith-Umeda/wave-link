const dotenv = require('dotenv');
dotenv.config({ path: ".env" });

module.exports = {
    apps: [{
        name: "wave-link",
        script: "npm start",
        env_prod: {
            APP_CONFIG: process.env.APP_CONFIG,
            GA_ID: process.env.GA_ID,
        }
    }]
}