const path = require('path');

// Change directory to backend and start the server
const backendPath = path.join(__dirname, 'backend');
process.chdir(backendPath);
require(path.join(backendPath, 'server.js'));