<script>
    import { enhance } from "$app/forms";

    let { form } = $props();

</script>

<h1>Cadastro de animais</h1>

<br>
<a href="/dashboard">Voltar ao início</a>
<br><br>

{#if form?.erro}
    <p style="color: red;">Erro: {form.erro}</p>
{/if}
{#if form?.sucesso}
    <p style="color: green;">{form.mensagem}</p>
{/if}

<br><br>
<form method="POST" use:enhance>
    <label>
        Nome
        <input type="text" name="nome" required>
    </label>
    <br><br>
    <label>
        Registro
        <input type="text" name="registro" required>
    </label>
    <br><br>
    <label>
        Data de nascimento
        <input type="date" name="dataNasc" required>
    </label>
    <br><br>

    <button type="submit">Cadastrar</button>
</form>