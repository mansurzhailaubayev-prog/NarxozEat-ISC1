const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let users = [];
let orders = [];

app.post('/api/register', (req, res) => {
    const role = req.body.email.toLowerCase().includes('admin') ? 'admin' : 'student';
    const newUser = { id: Date.now(), name: req.body.name, email: req.body.email, role: role };
    users.push(newUser);
    res.send({ success: true, user: newUser });
});

app.post('/api/order', (req, res) => {
    orders.push(req.body);
    res.send({ success: true, position: orders.length });
});

app.get('/api/admin/data', (req, res) => {
    res.send({ users, orders });
});

app.listen(port, () => console.log(`Server started on http://localhost:${port}`));
