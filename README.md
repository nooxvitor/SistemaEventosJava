# Sistema de Eventos em Java – Projeto Acadêmico

Projeto desenvolvido para a disciplina de Programação Orientada a Objetos, durante o primeiro semestre do curso de Ciência da Computação. O sistema tem como objetivo principal o gerenciamento de eventos locais, possibilitando cadastro de usuários, criação e organização de eventos, além do controle de participação dos usuários.

---

## 📌 Objetivo

Praticar os conceitos fundamentais da programação orientada a objetos, manipulação de coleções, entrada e saída de dados, e uso da API `java.time` para tratamento de datas e horários. O projeto também foca em persistência simples por meio de arquivos de texto.

---

## 🚀 Funcionalidades

- **Cadastro de Usuários:** Nome, e-mail e cidade para localização geográfica  
- **Cadastro de Eventos:** Nome, endereço, categoria, data e hora (usando `LocalDateTime`), e descrição detalhada  
- **Gerenciamento de Participação:** Usuários podem se inscrever e cancelar sua participação em eventos  
- **Listagem Organizada:** Eventos exibidos em ordem cronológica para melhor visualização  
- **Verificação de Status dos Eventos:** Diferenciação clara entre eventos passados, em andamento e futuros  
- **Persistência de Dados:** Salvamento e carregamento automático dos eventos a partir de arquivo de texto (`events.data`)  

---

## 🛠️ Tecnologias e Conceitos Utilizados

- Linguagem: **Java 8+**  
- API de Data/Hora: **java.time.LocalDateTime**  
- Manipulação de arquivos para persistência simples  
- Estrutura orientada a objetos: classes, métodos, encapsulamento e coleções (`ArrayList`)  
- Tratamento básico de exceções e entrada de dados pelo console  

---

## 🎯 Como executar

1. Faça o clone do repositório:  
   ```bash
   git clone https://github.com/nooxvitor/SistemaEventosJava.git

   Abra o projeto em sua IDE Java

Compile e execute a classe principal Main.java

Utilize o menu interativo para navegar pelas opções do sistema e testar suas funcionalidades

## 📚 Possíveis melhorias
Implementação de interface gráfica (GUI) para melhorar a usabilidade

Integração com banco de dados para armazenamento mais robusto

Aplicação do padrão MVC para organização do código

Envio de notificações para os usuários sobre eventos futuros

Validação mais completa dos dados de entrada

## 🤝 Considerações finais
Este projeto serve como base para aprofundar os conhecimentos em programação orientada a objetos e manipulação de dados em Java. Está aberto a melhorias e expansões, sendo um excelente ponto de partida para projetos futuros na área.
