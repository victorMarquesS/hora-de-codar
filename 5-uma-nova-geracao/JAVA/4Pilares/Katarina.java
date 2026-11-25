public class Katarina extends Campeao {
    public Katarina(String nome) { super(nome); }

    @Override
    public String getDescricao() {
        return "Assassina: Envelhece super rápido (3 anos/ciclo), mas adora brincar.";
    }

    @Override
    public String getPrevisaoTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        return "+" + Math.round(4 * mult) + " Fome / -" + Math.round(4 * mult) + " Fel / +" + Math.round(7 * mult) + " Cans (" + String.format("%.1f", mult) + "x)";
    }

    @Override
    public String getPrevisaoAcoes() {
        return "🍖 -35 Fome / +10 Cans | 🎾 +35 Fel / +15 Cans | 💤 -30 Cans / +15 Fome";
    }

    @Override
    public String falar() { return "A morte é uma arte."; }

    @Override
    public String usarHabilidadeEspecial() {
        this.nivelFelicidade += 15;
        this.cansaco += 5;
        limitarAtributos();
        return nome + " usou Lâmina Sinistra! (+15 Felicidade, +5 Cansaço).";
    }

    @Override
    public String brincar() {
        this.nivelFelicidade += 35;
        this.cansaco += 15;
        limitarAtributos();
        return nome + " brincou com adagas (+35 Fel, +15 Cans).";
    }

    @Override
    public String descansar() {
        this.cansaco -= 30;
        this.nivelDeFome += 15;
        limitarAtributos();
        return nome + " descansou brevemente (-30 Cans, +15 Fome).";
    }

    @Override
    public String passarTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        this.nivelDeFome += (int) Math.round(4 * mult);
        this.nivelFelicidade -= (int) Math.round(4 * mult);
        this.cansaco += (int) Math.round(7 * mult);
        this.idade += 3;
        limitarAtributos();
        return "O tempo voou... " + nome + " tem " + idade + " anos.";
    }
}