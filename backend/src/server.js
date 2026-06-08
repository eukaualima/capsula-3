import 'dotenv/config';
import app from './app.js';

const PORTA = process.env.PORT || 3000;
const API_LINK = process.env.API_LINK || 'http://localhost';

function iniciar()
{
    app.listen(PORTA, () =>
    {
        console.log(`🚀 API iniciada com sucesso na porta ${PORTA}.\n📌 Acesse em: ${API_LINK}:${PORTA}`);
    });
}

iniciar();