public class Zed extends Campeao {
    public Zed(String nome) { super(nome); }

    @Override
    public String getDescricao() {
        return "Mestre das Sombras: A meditação é sua aliada. Descansar recupera energia drasticamente.";
    }

    @Override
    public String getPrevisaoTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        return "+" + Math.round(5 * mult) + " Fome / -" + Math.round(4 * mult) + " Fel / +" + Math.round(5 * mult) + " Cans (" + String.format("%.1f", mult) + "x)";
    }

    @Override
    public String getPrevisaoAcoes() {
        return "🍖 -35 Fome / +10 Cans | 🎾 +25 Fel / +15 Cans | 💤 -45 Cans / +15 Fome";
    }

    @Override
    public String falar() { return "A sombra é minha aliada."; }

    @Override
    public String usarHabilidadeEspecial() {
        this.cansaco -= 15;
        this.nivelFelicidade += 10;
        limitarAtributos();
        return nome + " usou Marca da Morte! (-15 Cansaço, +10 Felicidade).";
    }

    @Override
    public String descansar() {
        this.cansaco -= 45;
        this.nivelDeFome += 15;
        limitarAtributos();
        return nome + " meditou nas sombras (-45 Cans, +15 Fome).";
    }

    @Override
    public String passarTempo() {
        double mult = 1 + Math.floor(this.idade / 10.0) * 0.4;
        this.nivelDeFome += (int) Math.round(5 * mult);
        this.nivelFelicidade -= (int) Math.round(4 * mult);
        this.cansaco += (int) Math.round(5 * mult);
        this.idade += 2;
        limitarAtributos();
        return "O tempo passou... " + nome + " tem " + idade + " anos.";
    }
}