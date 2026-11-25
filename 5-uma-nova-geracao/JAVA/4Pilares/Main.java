import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpExchange;
import java.io.*;
import java.net.InetSocketAddress;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

public class Main {
    private static Campeao pet = null;
    private static int acoesRestantes = 2;
    private static List<String> logs = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
        server.createContext("/", Main::handleRequest);
        server.setExecutor(null);
        server.start();

        System.out.println("====================================================");
        System.out.println("Servidor iniciado! Abra no navegador:");
        System.out.println("http://localhost:8080");
        System.out.println("====================================================");
    }

    private static void handleRequest(HttpExchange exchange) throws IOException {
        String path = exchange.getRequestURI().getPath();
        Path webDir = Paths.get("../../web").normalize();
        if (!Files.exists(webDir)) {
            webDir = Paths.get("web").normalize();
        }

        // Servir CSS e imagens estáticas
        if (path.endsWith(".css") || path.endsWith(".png")) {
            Path file = webDir.resolve(path.substring(1));
            if (Files.exists(file)) {
                String contentType = path.endsWith(".css") ? "text/css; charset=UTF-8" : "image/png";
                byte[] bytes = Files.readAllBytes(file);
                exchange.getResponseHeaders().set("Content-Type", contentType);
                exchange.sendResponseHeaders(200, bytes.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(bytes);
                }
                return;
            }
        }

        // Processar cliques dos botões (POST)
        if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
            String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
            Map<String, String> params = parseForm(body);
            processarAcao(params);

            exchange.getResponseHeaders().set("Location", "/");
            exchange.sendResponseHeaders(303, -1);
            return;
        }

        // Renderizar o HTML substituindo os dados do Java
        Path htmlPath = webDir.resolve("BichinhoVirtual.html");
        String html = Files.readString(htmlPath, StandardCharsets.UTF_8);
        html = renderizarHtml(html);

        byte[] responseBytes = html.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
        exchange.sendResponseHeaders(200, responseBytes.length);
        try (OutputStream os = exchange.getResponseBody()) {
            os.write(responseBytes);
        }
    }

    private static void processarAcao(Map<String, String> params) {
        String acao = params.get("acao");
        if (acao == null) return;

        if ("iniciar".equals(acao)) {
            String campeao = params.get("campeao");
            switch (campeao) {
                case "Garen": pet = new Garen("Garen"); break;
                case "Katarina": pet = new Katarina("Katarina"); break;
                case "Zed": pet = new Zed("Zed"); break;
                case "Riven": pet = new Riven("Riven"); break;
            }
            acoesRestantes = 2;
            logs.clear();
            logs.add("Jogo iniciado! " + pet.getNome() + " diz: \"" + pet.falar() + "\"");
            return;
        }

        if ("reiniciar".equals(acao)) {
            pet = null;
            logs.clear();
            return;
        }

        if (pet == null || !pet.isVivo()) return;

        if ("passarTempo".equals(acao)) {
            logs.add(pet.passarTempo());
            acoesRestantes = 2;
        } else if (acoesRestantes > 0) {
            switch (acao) {
                case "alimentar": logs.add(pet.alimentar()); break;
                case "brincar": logs.add(pet.brincar()); break;
                case "descansar": logs.add(pet.descansar()); break;
                case "especial": logs.add(pet.usarHabilidadeEspecial()); break;
            }
            acoesRestantes--;
        }

        if (!pet.isVivo()) {
            logs.add("🚨 " + pet.getMensagemFimDeJogo());
        }
    }

private static String renderizarHtml(String html) {
        if (pet == null) {
            return html
                .replace("{{CLASSE_SELECAO}}", "")
                .replace("{{CLASSE_JOGO}}", "oculto")
                .replace("{{TITULO_TOPO}}", "Escolha seu Campeão");
        }

        boolean vivo = pet.isVivo();
        String nomeLower = pet.getNome().toLowerCase();
        String avatarUrl = pet.getIdade() >= 25
            ? "https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/" + pet.getNome() + ".png"
            : nomeLower + "-chibi.png";

        StringBuilder logHtml = new StringBuilder();
        for (int i = logs.size() - 1; i >= 0; i--) {
            logHtml.append("<p>").append(logs.get(i)).append("</p>");
        }

        return html
            .replace("{{CLASSE_SELECAO}}", "oculto")
            .replace("{{CLASSE_JOGO}}", "visivel-block")
            .replace("{{TITULO_TOPO}}", "Cuide do seu Campeão")
            .replace("{{NOME_PET}}", pet.getNome())
            .replace("{{DESCRICAO_PET}}", pet.getDescricao())
            .replace("{{AVATAR_SRC}}", avatarUrl)
            .replace("{{CLASSE_ADULTO}}", pet.getIdade() >= 25 ? "adulto" : "")
            .replace("{{FOME}}", String.valueOf(pet.getNivelDeFome()))
            .replace("{{FELICIDADE}}", String.valueOf(pet.getNivelFelicidade()))
            .replace("{{CANSACO}}", String.valueOf(pet.getCansaco()))
            .replace("width: 50%; /* {{STYLE_FOME}} */", "width: " + pet.getNivelDeFome() + "%;")
            .replace("width: 50%; /* {{STYLE_FELICIDADE}} */", "width: " + pet.getNivelFelicidade() + "%;")
            .replace("width: 0%; /* {{STYLE_CANSACO}} */", "width: " + pet.getCansaco() + "%;")
            .replace("{{IDADE}}", String.valueOf(pet.getIdade()))
            .replace("{{PREVISAO_TEMPO}}", pet.getPrevisaoTempo())
            .replace("{{PREVISAO_ACOES}}", pet.getPrevisaoAcoes())
            .replace("{{ACOES_RESTANTES}}", String.valueOf(acoesRestantes))
            .replace("{{CLASSE_BTN_ACAO}}", (!vivo || acoesRestantes <= 0) ? "btn-bloqueado" : "")
            .replace("{{CLASSE_BTN_TEMPO}}", !vivo ? "btn-bloqueado" : "")
            .replace("{{LOGS}}", logHtml.toString());
    }
    
    private static Map<String, String> parseForm(String body) {
        Map<String, String> map = new HashMap<>();
        for (String pair : body.split("&")) {
            String[] kv = pair.split("=");
            if (kv.length == 2) {
                map.put(
                    URLDecoder.decode(kv[0], StandardCharsets.UTF_8),
                    URLDecoder.decode(kv[1], StandardCharsets.UTF_8)
                );
            }
        }
        return map;
    }
}