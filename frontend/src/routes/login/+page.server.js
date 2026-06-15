import { fail, redirect } from "@sveltejs/kit";
import axios from "axios";

export const actions =
{
    default: async ({ request, cookies, fetch}) => {
        const formData = await request.formData();
        const email = formData.get("email");
        const senha = formData.get("senha");

        const resposta = await fetch('http://localhost:3000/api/login', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        });

        const dados = await resposta.json();

        if (!resposta.ok)
        {
            return fail(400, { erro: dados.erro || 'Falha no login.' });
        }

        cookies.set('meuToken', dados.token, { path: '/' });

        throw redirect(303, '/dashboard');
    }
}