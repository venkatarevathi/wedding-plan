require('dotenv').config();
require('./backend/server.js'); const backendPath = path.join(__dirname, 'backend');
require(path.join(backendPath, 'server.js'));