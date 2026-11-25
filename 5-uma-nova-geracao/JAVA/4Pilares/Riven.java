public class Riven extends Campeao {
    public Riven(String nome) { super(nome); }

    @Override
    public String getDescricao() {
        return "Exilada: Quase não sente fome, mas a tristeza do passado destrói a felicidade rápido.";
    }

    @Override
    public String getPrevisaoTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        return "+" + Math.round(3 * mult) + " Fome / -" + Math.round(7 * mult) + " Fel / +" + Math.round(6 * mult) + " Cans (" + String.format("%.1f", mult) + "x)";
    }

    @Override
    public String getPrevisaoAcoes() {
        return "🍖 -35 Fome / +10 Cans | 🎾 +35 Fel / +15 Cans | 💤 -30 Cans / +15 Fome";
    }

    @Override
    public String falar() { return "Um espadachim vive pelo aço."; }

    @Override
    public String usarHabilidadeEspecial() {
        this.nivelFelicidade += 20;
        this.cansaco += 10;
        limitarAtributos();
        return nome + " usou Asas Quebradas! (+20 Felicidade, +10 Cansaço).";
    }

    @Override
    public String brincar() {
        this.nivelFelicidade += 35;
        this.cansaco += 15;
        limitarAtributos();
        return nome + " treinou golpes (+35 Fel, +15 Cans).";
    }

    @Override
    public String descansar() {
        this.cansaco -= 30;
        this.nivelDeFome += 15;
        limitarAtributos();
        return nome + " descansou (-30 Cans, +15 Fome).";
    }

    @Override
    public String passarTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        this.nivelDeFome += (int) Math.round(3 * mult);
        this.nivelFelicidade -= (int) Math.round(7 * mult);
        this.cansaco += (int) Math.round(6 * mult);
        this.idade += 2;
        limitarAtributos();
        return "O tempo passou... " + nome + " tem " + idade + " anos.";
    }
}