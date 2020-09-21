const server = require('./api/server.js');

const { PORT } = require('./vars/vars.js');

server.listen(PORT, () => console.log(`*** Server is running on port ${PORT} ***`));