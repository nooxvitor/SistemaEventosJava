import java.util.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class SistemaEventos {
    private ArrayList<Evento> eventos = new ArrayList<>();
    private Usuario usuario;
    private Scanner sc = new Scanner(System.in);

    public void executar() {
        System.out.println("Cadastro de usuário:");
        System.out.print("Nome: ");
        String nome = sc.nextLine();
        System.out.print("Email: ");
        String email = sc.nextLine();
        System.out.print("Cidade: ");
        String cidade = sc.nextLine();
        usuario = new Usuario(nome, email, cidade);

        int opcao;
        do {
            System.out.println("\n--- MENU ---");
            System.out.println("1. Cadastrar evento");
            System.out.println("2. Listar eventos");
            System.out.println("3. Participar de evento");
            System.out.println("4. Cancelar participação");
            System.out.println("5. Meus eventos");
            System.out.println("6. Eventos atuais");
            System.out.println("7. Eventos passados");
            System.out.println("0. Sair");
            System.out.print("Escolha: ");
            opcao = Integer.parseInt(sc.nextLine());

            switch (opcao) {
                case 1 -> cadastrarEvento();
                case 2 -> listarEventos();
                case 3 -> participarEvento();
                case 4 -> cancelarParticipacao();
                case 5 -> listarMeusEventos();
                case 6 -> listarOcorrendo();
                case 7 -> listarPassados();
            }
        } while (opcao != 0);
    }

    private void cadastrarEvento() {
        System.out.print("Nome: ");
        String nome = sc.nextLine();
        System.out.print("Endereço: ");
        String endereco = sc.nextLine();
        System.out.print("Categoria (Festa, Show, Esporte...): ");
        String categoria = sc.nextLine();
        System.out.print("Data e hora (dd/MM/yyyy HH:mm): ");
        String dataStr = sc.nextLine();
        LocalDateTime horario = LocalDateTime.parse(dataStr, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));
        System.out.print("Descrição: ");
        String desc = sc.nextLine();

        Evento e = new Evento(nome, endereco, categoria, horario, desc);
        eventos.add(e);
        System.out.println("Evento cadastrado com sucesso.");
    }

    private void listarEventos() {
        eventos.sort(Comparator.comparing(Evento::getHorario));
        for (int i = 0; i < eventos.size(); i++) {
            System.out.println("[" + i + "] " + eventos.get(i));
        }
    }

    private void participarEvento() {
        listarEventos();
        System.out.print("Digite o número do evento: ");
        int idx = Integer.parseInt(sc.nextLine());
        eventos.get(idx).adicionarParticipante(usuario.getEmail());
        System.out.println("Participação confirmada!");
    }

    private void cancelarParticipacao() {
        listarMeusEventos();
        System.out.print("Digite o número do evento: ");
        int idx = Integer.parseInt(sc.nextLine());
        Evento e = eventos.stream().filter(ev -> ev.getParticipantes().contains(usuario.getEmail())).toList().get(idx);
        e.removerParticipante(usuario.getEmail());
        System.out.println("Participação cancelada.");
    }

    private void listarMeusEventos() {
        List<Evento> meus = eventos.stream()
            .filter(e -> e.getParticipantes().contains(usuario.getEmail()))
            .toList();
        for (int i = 0; i < meus.size(); i++) {
            System.out.println("[" + i + "] " + meus.get(i));
        }
    }

    private void listarOcorrendo() {
        for (Evento e : eventos) {
            if (e.estaOcorrendo()) System.out.println(e);
        }
    }

    private void listarPassados() {
        for (Evento e : eventos) {
            if (e.jaAconteceu()) System.out.println(e);
        }
    }

    public void salvarEventos() {
        ArquivoEventos.salvar(eventos);
    }

    public void carregarEventos() {
        eventos = ArquivoEventos.carregar();
    }
}