const bcrypt = require('bcrypt');

async function simularCriptografia ()
{
    const senhaTextoPuro = "123456"; // Entrada de dados do usuário

    console.log(`🔒 Simulação de Criptografia 🔒\n`);
    console.log(`Senha digitada pelo usuário: ${senhaTextoPuro}`);

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    console.log(`1. Salt gerado\n-> ${salt}`);

    const hash = await bcrypt.hash(senhaTextoPuro, salt);
    
    console.log(`2. O que vai ser salvo no banco de dados:`);
    console.log(`-> ${hash}`);

    console.log(`\n------------------------------------------------------\n`);

    console.log(`📌 Simulação do login do usuário`);

    const tentativaCerta = "123456"; // usuário inseriu a senha correta
    const loginAprovado = await bcrypt.compare(tentativaCerta, hash);
    console.log(`3. Usuário digitou: ${tentativaCerta}`);
    console.log(`4. Resultado: ${loginAprovado ? 'Usuário digitou a senha correta!' : 'Usuário ou senha incorretos!'}`);

}

simularCriptografia();