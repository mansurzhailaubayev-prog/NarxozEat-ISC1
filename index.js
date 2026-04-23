const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
// Указываем, что статические файлы (html) лежат в той же папке
app.use(express.static(__dirname));

// Имитация базы данных
let orders = [];
let clubMembers = []; // База для критерия Membership Signup

// Маршрут для Заказов (Order Food)
app.post('/api/order', (req, res) => {
    const order = {
        ...req.body,
        id: Math.floor(Math.random() * 10000),
        type: 'ORDER',
        timestamp: new Date().toLocaleString()
    };
    orders.push(order);
    console.log("Новый заказ:", order);
    res.json({ success: true, message: "Order placed successfully!", id: order.id });
});

// Маршрут для Клуба (Membership Signup - КРИТЕРИЙ ISC-1)
app.post('/api/membership', (req, res) => {
    const member = {
        ...req.body,
        id: Math.floor(Math.random() * 8000),
        type: 'CLUB_MEMBER',
        joinDate: new Date().toLocaleString()
    };
    clubMembers.push(member);
    console.log("Новый участник клуба (курьер):", member);
    res.json({ success: true, message: "Welcome to the Courier Club!", id: member.id });
});

// Маршрут для Демонстрации (показать комиссии сохраненные данные)
app.get('/api/admin/data', (req, res) => {
    res.json({
        total_orders: orders,
        registered_members: clubMembers
    });
});

app.listen(port, () => {
    console.log(`Сервер NarxozEat запущен: http://localhost:${port}`);
    console.log(`Файл сервера: index.js`);
});
