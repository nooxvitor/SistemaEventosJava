import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export class Database {
  constructor() {
    this.db = null;
  }

  async init() {
    this.db = await open({
      filename: 'eventos.db',
      driver: sqlite3.Database
    });

    await this.db.exec(`
      CREATE TABLE IF NOT EXISTS usuarios (
        email TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        cidade TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS eventos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        endereco TEXT NOT NULL,
        categoria TEXT NOT NULL,
        horario DATETIME NOT NULL,
        descricao TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS participacoes (
        evento_id INTEGER,
        usuario_email TEXT,
        PRIMARY KEY (evento_id, usuario_email),
        FOREIGN KEY (evento_id) REFERENCES eventos(id),
        FOREIGN KEY (usuario_email) REFERENCES usuarios(email)
      );
    `);
  }

  async criarOuAtualizarUsuario(email, nome, cidade) {
    await this.db.run(
      'INSERT OR REPLACE INTO usuarios (email, nome, cidade) VALUES (?, ?, ?)',
      [email, nome, cidade]
    );
    return { email, nome, cidade };
  }

  async criarEvento(nome, endereco, categoria, horario, descricao) {
    return await this.db.run(
      'INSERT INTO eventos (nome, endereco, categoria, horario, descricao) VALUES (?, ?, ?, ?, ?)',
      [nome, endereco, categoria, horario.toISOString(), descricao]
    );
  }

  async listarEventos() {
    const eventos = await this.db.all('SELECT * FROM eventos ORDER BY horario');
    for (const evento of eventos) {
      const participantes = await this.db.all(
        'SELECT usuario_email FROM participacoes WHERE evento_id = ?',
        [evento.id]
      );
      evento.participantes = participantes.map(p => p.usuario_email);
    }
    return eventos;
  }

  async adicionarParticipante(eventoId, email) {
    await this.db.run(
      'INSERT OR IGNORE INTO participacoes (evento_id, usuario_email) VALUES (?, ?)',
      [eventoId, email]
    );
  }

  async removerParticipante(eventoId, email) {
    await this.db.run(
      'DELETE FROM participacoes WHERE evento_id = ? AND usuario_email = ?',
      [eventoId, email]
    );
  }
}