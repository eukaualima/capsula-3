<script>
    let { data } = $props();
</script>

<h1>Painel - Controle de Animais</h1>

<nav>
    <a href="/cadastro-animal">Cadastrar novo animal</a>
    <a href="/cadastro-movimentacao">Cadastrar nova movimentação</a>
</nav>

{#if data.erro}
    <p style="color: red;">Erro: {data.erro}</p>
{/if}

<ul>
    {#each data.animais as animal}
        <li>
            <strong>ID:</strong> {animal.id} <br>
            <strong>Nome:</strong> {animal.nome} <br>
            <strong>Registro:</strong> {animal.registro} <br>
            <strong>Data de nascimento:</strong> {animal.dataNasc} <br>
        </li>
    {:else}
        <p>Nenhum animal foi encontrado no sistema.</p>
        <br>
        <a href="/cadastro-animal">Cadastrar novo animal</a>
    {/each}
</ul>