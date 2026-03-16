const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Разрешаем серверу читать данные из формы
app.use(express.json());
// Отдаем наш HTML файл при заходе на сайт
app.use(express.static(path.join(__dirname)));

// Наша импровизированная база данных (Mock DB)
let ordersDatabase = [];

// API Endpoint (Backend route) для приема заказа
app.post('/api/order', (req, res) => {
    const newOrder = req.body;

    // Добавляем время и ID заказа
    newOrder.id = Math.floor(Math.random() * 10000);
    newOrder.timestamp = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
    newOrder.status = "В обработке (Aura02)";

    // Сохраняем в "Базу данных"
    ordersDatabase.push(newOrder);

    console.log("Новый заказ получен:", newOrder);

    // Возвращаем успешный ответ фронтенду
    res.json({
        success: true,
        message: "Заказ успешно оформлен!",
        orderData: newOrder
    });
});

// API Endpoint для проверки всех заказов (для демо комиссии)
app.get('/api/orders', (req, res) => {
    res.json(ordersDatabase);
});

app.listen(port, () => {
    console.log(`NarxozEat сервер запущен на порту ${port}`);
});