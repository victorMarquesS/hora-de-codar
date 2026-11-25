public class Garen extends Campeao {
    public Garen(String nome) { super(nome); }

    @Override
    public String getDescricao() {
        return "Demaciano: Sente muita fome com o tempo, mas seu cansaço é controlado.";
    }

    @Override
    public String getPrevisaoTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        return "+" + Math.round(6 * mult) + " Fome / -" + Math.round(4 * mult) + " Fel / +" + Math.round(4 * mult) + " Cans (" + String.format("%.1f", mult) + "x)";
    }

    @Override
    public String getPrevisaoAcoes() {
        return "🍖 -35 Fome / +10 Cans | 🎾 +25 Fel / +15 Cans | 💤 -35 Cans / +15 Fome";
    }

    @Override
    public String falar() { return "Por Demacia!"; }

    @Override
    public String usarHabilidadeEspecial() {
        this.nivelFelicidade += 10;
        limitarAtributos();
        return nome + " usou Julgamento! Girou a espada (+10 Felicidade).";
    }

    @Override
    public String passarTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        this.nivelDeFome += (int) Math.round(6 * mult);
        this.nivelFelicidade -= (int) Math.round(4 * mult);
        this.cansaco += (int) Math.round(4 * mult);
        this.idade += 1;
        limitarAtributos();
        return "O tempo passou... " + nome + " tem " + idade + " anos.";
    }
}