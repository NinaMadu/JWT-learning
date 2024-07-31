const express = require('express');
const user = require('./routers/user.route');
const student = require('./routers/student.route');
const auth = require('./milddleware/auth.js');

const app = express();

app.use(express.json());

app.use('/api/user', user);
app.use('/api/student', auth, student);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Listening to', port);
})