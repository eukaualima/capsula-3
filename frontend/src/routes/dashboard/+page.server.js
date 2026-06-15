import { redirect } from "@sveltejs/kit";

export async function load ({ cookies, fetch })
{
    const token = cookies.get('meuToken');

    if (!token)
    {
        throw redirect(303, '/login');
    }

    const resposta = await fetch('http://localhost:3000/api/admin/animais', 
    {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const dados = await resposta.json();

    if (!resposta.ok)
    {
        return { animais: [], erro: dados.erro };
    }

    return { 
        animais: dados 
    };
}