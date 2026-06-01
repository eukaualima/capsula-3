export default class Evento
{
    #id;
    #nome;

    constructor(id, nome)
    {
        this.#id = id;
        this.nome = nome; 
    }

    getId() { return this.#id; }
    getNome() { return this.#nome; }

    setId(valor) 
    { 
        this.#id = valor; 
    }

    setNome(valor) 
    { 
        // if (!valor || valor.trim() === "") 
        // {
        //     throw new Error("O nome do evento não pode ser vazio.");
        // }

        this.#nome = valor.trim(); 
    }

    toJSON()
    {
        return { id: this.#id, nome: this.#nome };
    }
}