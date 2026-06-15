import { fail, redirect } from "@sveltejs/kit";

export async function load ({ cookies, fetch })
{
    const token = cookies.get('meuToken');

    if (!token)
    {
        throw redirect(303, '/login');
    }

    try
    {
        const respAnimais = await fetch('http://localhost:3000/api/admin/animais', 
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const animais = await respAnimais.json();

        const respEventos = await fetch('http://localhost:3000/api/admin/eventos', 
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const eventos = await respEventos.json();

        return {
            animais: respAnimais.ok ? (Array.isArray(animais) ? animais : []) : [],
            eventos: respEventos.ok ? (Array.isArray(eventos) ? eventos : []) : []
        }
    }
    catch (erro)
    {
        return {
            animais: [],
            eventos: [],
            erro: 'Erro ao carregar eventos e animais. Tente novamente mais tarde.'
        }
    }
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
        const animalId = formData.get('animalId');
        const eventoId = formData.get('eventoId');
        const colocacao = formData.get('colocacao');
        const categoria = formData.get('categoria');

        if (!animalId || !eventoId || !colocacao || !categoria)
        {
            return fail(400, { erro: 'Todos os campos são obrigatórios.' });
        }

        try
        {
            const resposta = await fetch('http://localhost:3000/api/movimentacoes', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ animalId, eventoId, colocacao, categoria })
            });

            const dados = await resposta.json();

            if (!resposta.ok)
            {
                return fail(resposta.status, { erro: dados.erro});
            }

            return { sucesso: true, mensagem: 'Movimentação cadastrada com sucesso!' };
        }
        catch (erro)
        {
            return fail(500, { erro: `Erro interno no servidor. Tente novamente mais tarde.` });
        }
    }
}