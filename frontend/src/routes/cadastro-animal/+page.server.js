import { fail, redirect } from "@sveltejs/kit";

export async function load ({ cookies })
{
    const token = cookies.get('meuToken');

    if (!token)
    {
        throw redirect(303, '/login');
    }

    return {};
}

export const actions = 
{
    default: async ({ request, cookies, fetch}) => 
    {
        const token = cookies.get('meuToken');

        if (!token)
        {
            throw redirect(303, '/login');
        }

        const formData = await request.formData();
        const nome = formData.get('nome');
        const registro = formData.get('registro');
        const dataNasc = formData.get('dataNasc');

        if (!nome || !registro || !dataNasc)
        {
            return fail(400, { erro: 'Todos os campos são obrigatórios.' });
        }

        try
        {
            const resposta = await fetch('http://localhost:3000/api/admin/animais', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nome, registro, dataNasc })
            });

            const dados = await resposta.json();

            if (!resposta.ok)
            {
                return fail(resposta.status, { erro: dados.erro});
            }

            return { sucesso: true, mensagem: 'Animal cadastrado com sucesso!' };
        }
        catch (erro)
        {
            return fail(500, { erro: 'Erro interno no servidor. Tente novamente mais tarde.' });
        }
    }
}