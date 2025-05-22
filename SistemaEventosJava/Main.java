import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        SistemaEventos sistema = new SistemaEventos();
        sistema.carregarEventos();
        sistema.executar();
        sistema.salvarEventos();
    }
}