
export default class Animal
{
    #id;
    #nome;
    #registro;
    #dataNasc;

    constructor (id, nome, registro, dataNasc) // Em caso de ID nulo, passar null
    {
        this.#id = id;
        this.setNome(nome);
        this.setRegistro(registro);
        this.setDataNasc(dataNasc);
    }

    // Getters
    getId ()
    {
        return this.#id;
    }

    getNome () 
    {
        return this.#nome;
    }

    getRegistro ()
    {
        return this.#registro;
    }

    getDataNasc ()
    {
        return this.#dataNasc;
    }

    // Setters
    setNome (nome)
    {
        if (!nome || nome.trim() === "") throw new Error('O nome do animal não pode ser nulo ou conter somente espaços.');

        this.#nome = nome;
    }

    setRegistro (registro)
    {
        if (!registro || registro.length < 4 || registro.trim() === "") throw new Error('O registro do animal não pode ser nulo ou menor que 4 caracteres.');

        this.#registro = registro;
    }

    setDataNasc (data)
    {
        const dataRecebida = new Date(data);
        const dataAtual = new Date();

        if (isNaN(dataRecebida.getTime())) throw new Error('A data inserida é inválida.');

        if (dataRecebida > dataAtual) throw new Error('A data não pode ser no futuro.');

        this.#dataNasc = data;
    }

    toJSON()
    {
        return { id: this.#id, nome: this.#nome, registro: this.#registro, dataNasc: this.#dataNasc };
    }
}