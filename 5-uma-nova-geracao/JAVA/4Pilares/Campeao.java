public abstract class Campeao {
    protected String nome;
    protected int nivelDeFome;
    protected int nivelFelicidade;
    protected int cansaco;
    protected int idade;

    public Campeao(String nome) {
        this.nome = nome;
        this.nivelDeFome = 50;
        this.nivelFelicidade = 50;
        this.cansaco = 0;
        this.idade = 0;
    }

    // GETTERS
    public String getNome() { return nome; }
    public int getNivelDeFome() { return nivelDeFome; }
    public int getNivelFelicidade() { return nivelFelicidade; }
    public int getCansaco() { return cansaco; }
    public int getIdade() { return idade; }

    protected void limitarAtributos() {
        this.nivelDeFome = Math.max(0, Math.min(100, this.nivelDeFome));
        this.nivelFelicidade = Math.max(0, Math.min(100, this.nivelFelicidade));
        this.cansaco = Math.max(0, Math.min(100, this.cansaco));
    }

    // MÉTODOS DE AÇÃO (Base para todos)
    public String alimentar() {
        this.nivelDeFome -= 35;
        this.cansaco += 10;
        limitarAtributos();
        return nome + " se alimentou (-35 Fome), mas a digestão cansa (+10 Cans).";
    }

    public String brincar() {
        this.nivelFelicidade += 25;
        this.cansaco += 15;
        limitarAtributos();
        return nome + " brincou (+25 Fel), mas ficou cansado (+15 Cans).";
    }

    public String descansar() {
        this.cansaco -= 35;
        this.nivelDeFome += 15;
        limitarAtributos();
        return nome + " descansou (-35 Cans), mas acordou faminto (+15 Fome).";
    }

    public String passarTempo() {
        double multiplicador = 1 + Math.floor(this.idade / 10.0) * 0.4;
        this.nivelDeFome += (int) Math.round(5 * multiplicador);
        this.nivelFelicidade -= (int) Math.round(4 * multiplicador);
        this.cansaco += (int) Math.round(5 * multiplicador);
        this.idade += 1;
        limitarAtributos();
        return "O tempo passou... " + nome + " tem " + idade + " anos.";
    }

    public boolean isVivo() {
        return nivelDeFome < 100 && cansaco < 100 && nivelFelicidade > 0 && idade < 50;
    }

    public String getMensagemFimDeJogo() {
        if (nivelDeFome >= 100) return "GAME OVER! " + nome + " morreu de fome na idade " + idade + ".";
        if (cansaco >= 100) return "GAME OVER! " + nome + " morreu de exaustão na idade " + idade + ".";
        if (nivelFelicidade <= 0) return "GAME OVER! " + nome + " morreu de tristeza na idade " + idade + ".";
        if (idade >= 50) return "VITÓRIA! Parabéns! Você cuidou tão bem de " + nome + " que ele chegou aos 50 anos!";
        return "";
    }

    // MÉTODOS ABSTRATOS (Polimorfismo e Abstração)
    public abstract String getDescricao();
    public abstract String getPrevisaoTempo();
    public abstract String getPrevisaoAcoes();
    public abstract String falar();
    public abstract String usarHabilidadeEspecial();
}


