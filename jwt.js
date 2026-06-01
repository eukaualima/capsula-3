const jwt = require('jsonwebtoken');

async function simularJWT()
{
    const SEGREDO_DO_SERVIDOR = '$2b$10$ed0onMb6NfPtjUKmS2VopeXsEcW9IMSZKS7pBQsmyOqqzTjXasS/K';

    console.log('🎫 Simulação JWT');

    console.log('1. Usuário fez login com sucesso; token gerado.');

    const payload = {
        id: 1,
        cargo: 'admin',
        logado_em: new Date(),
        username: 'kaualima'
    };

    const token = jwt.sign(payload, SEGREDO_DO_SERVIDOR, { expiresIn: '1h' });

    console.log(`2. Token do usuário gerado e identificável no sistema`);
    console.log(`-> ${token}`);

    try
    {
        const dadosDecodificados = jwt.verify(token, SEGREDO_DO_SERVIDOR);

        console.log('3. Usuário tentou acessar uma área restrita.');

        console.log(`Dados decodificados:`);

        console.log(dadosDecodificados);


    }
    catch (erro)
    {
        console.log('Acesso negado! Token inválido ou expirado.');
    }

    console.log('4. Tentativa de "ataque" ao sistema com token inválido');

    const tokenAdulterado = token.slice(0, -2) + "xx";

    try
    {
        const dadosDecodificados = jwt.verify(tokenAdulterado, SEGREDO_DO_SERVIDOR);

        console.log('Acesso permitido!');
    }
    catch (erro)
    {
        console.log('Acesso negado! Token inválido ou expirado.');
    }
}

simularJWT();

