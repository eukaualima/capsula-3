<script>
    import { enhance } from "$app/forms";

    let { form } = $props();

</script>

<h1>Acesso ao sistema</h1>

{#if form?.erro}
    <p>Erro ao enviar credenciais: {form.erro}</p>
{/if}

<form method="POST" use:enhance>
    <label>
        E-mail
        <input type="email" name="email" required>
    </label>
    <br><br>
    <label>
        Senha
        <input type="password" name="senha" required>
    </label>
    <br><br>

    <button type="submit">Entrar</button>
</form>