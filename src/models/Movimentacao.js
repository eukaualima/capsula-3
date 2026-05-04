export default class Movimentacao
{
    #id;
    #animalId;
    #eventoId;
    #colocacao;
    #categoria;

    constructor(id, animalId, eventoId, colocacao, categoria)
    {
        this.#id = id;
        this.animalId = animalId;   
        this.eventoId = eventoId;   
        this.colocacao = colocacao; 
        this.categoria = categoria; 
    }

    getId() { return this.#id; }
    getAnimalId() { return this.#animalId; }
    getEventoId() { return this.#eventoId; }
    getColocacao() { return this.#colocacao; }
    getCategoria() { return this.#categoria; }

    setId(valor) { this.#id = valor; }

    setAnimalId(valor) 
    { 
        if (!valor || isNaN(valor)) throw new Error("ID do animal inválido.");

        this.#animalId = Number(valor); 
    }

    setEventoId(valor) 
    { 
        if (!valor || isNaN(valor)) throw new Error("ID do evento inválido.");

        this.#eventoId = Number(valor); 
    }

    setColocacao(valor) 
    { 
        const pos = Number(valor);

        if (isNaN(pos) || pos <= 0 || pos > 999) 
        {
            throw new Error("A colocação deve ser um número válido entre 1 e 999.");
        }
        this.#colocacao = pos; 
    }

    setCategoria(valor) 
    { 
        const categoriasValidas = ['INICIANTE', 'AMADOR', 'PROFISSIONAL'];

        const catNormalizada = valor ? valor.toUpperCase().trim() : '';

        if (!categoriasValidas.includes(catNormalizada)) 
        {
            throw new Error(`Categoria inválida. Aceitas: ${categoriasValidas.join(', ')}`);
        }

        this.#categoria = catNormalizada; 
    }

    toJSON() 
    {
        return { id: this.#id, animalId: this.#animalId, eventoId: this.#eventoId, colocacao: this.#colocacao, categoria: this.#categoria };
    }
}