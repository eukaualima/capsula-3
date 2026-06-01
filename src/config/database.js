import mysql from 'mysql2/promise.js';
import 'dotenv/config';

const pool = mysql.createPool(
{
    host: 'localhost',
    user: 'root',
    database: 'movimentacao_animais',
    password: '123456',
    port: 3306
});

export default pool;