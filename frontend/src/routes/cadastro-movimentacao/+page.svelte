<script>
    import { enhance } from "$app/forms";

    let { form, data } = $props();

</script>

<h1>Cadastro de movimentações</h1>

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
        Animal
        <select name="animalId" required>
            <option value="">Selecione um animal</option>
            {#each data.animais as animal}
                <option value={animal.id}>{animal.registro} | {animal.nome}</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label>
        Evento
        <select name="eventoId" required>
            <option value="">Selecione um evento</option>
            {#each data.eventos as evento}
                <option value={evento.id}>{evento.nome}</option>
            {/each}
        </select>
    </label>
    <br><br>
    <label>
        Colocação
        <input type="number" name="colocacao" min="1" max="999" required>
    </label>
    <br><br>

    <label>
        Categoria
        <select name="categoria" required>
            <option value="">Selecione uma categoria</option>
            <option value="INICIANTE">Iniciante</option>
            <option value="AMADOR">Amador</option>
            <option value="PROFISSIONAL">Profissional</option>
        </select>
    </label>
    <br><br>

    <button type="submit">Cadastrar</button>
</form>