export default class Usuario
{
    #id;
    #nome;
    #email;
    #senha;
    #perfil;

    constructor(id, nome, email, senha, perfil = 'usuario')
    {
        this.#id = id;
        this.setNome(nome);
        this.setEmail(email);
        this.setSenha(senha);
        this.setPerfil(perfil); 
    }

    getId() { return this.#id; }
    getNome() { return this.#nome; }
    getEmail() { return this.#email; }
    getSenha() { return this.#senha; }
    getPerfil() { return this.#perfil; }

    setId(valor) { this.#id = valor; }

    setNome(valor) 
    { 
        if (!valor || valor.trim().length < 3) 
        {
            throw new Error("O nome deve conter pelo menos 3 caracteres.");
        }

        this.#nome = valor.trim().replace(/\b\w/g, c => c.toUpperCase()); 
    }

    setEmail(valor) 
    { 
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(valor)) 
        {
            throw new Error("Formato de e-mail inválido.");
        }

        this.#email = valor.toLowerCase().trim(); 
    }

    setSenha(valor) 
    { 
        if (!valor || valor.length < 6) 
        {
            throw new Error("A senha deve ter no mínimo 6 caracteres para sua segurança.");
        }

        this.#senha = valor; 
    }

    setPerfil(valor) 
    { 
        if (valor !== 'admin' && valor !== 'usuario') throw new Error("Perfil inválido.");

        this.#perfil = valor; 
    }

    toJSON()
    {
        return {
            id: this.#id,
            nome: this.#nome,
            email: this.#email,
            perfil: this.#perfil
        };
    }
}