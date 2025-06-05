import express from 'express';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Database } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Configuração do Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// Configuração da sessão
app.use(session({
  secret: 'sistema-eventos-secret',
  resave: false,
  saveUninitialized: true
}));

// Inicialização do banco de dados
const db = new Database();
await db.init();

// Rotas
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.post('/cadastro', async (req, res) => {
  const { email, nome, senha, cidade } = req.body;
  try {
    const usuario = await db.criarUsuario(email, nome, senha, cidade);
    req.session.usuario = usuario;
    res.redirect('/eventos');
  } catch (error) {
    res.render('cadastro', { erro: 'Email já cadastrado' });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await db.autenticarUsuario(email, senha);
  if (usuario) {
    req.session.usuario = usuario;
    res.redirect('/eventos');
  } else {
    res.render('login', { erro: 'Email ou senha inválidos' });
  }
});

app.get('/eventos', async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }
  const eventos = await db.listarEventos();
  res.render('eventos', { 
    eventos,
    usuario: req.session.usuario
  });
});

app.post('/eventos', async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }
  const { nome, endereco, categoria, data, hora, descricao } = req.body;
  const dataHora = new Date(`${data}T${hora}`);
  await db.criarEvento(nome, endereco, categoria, dataHora, descricao);
  res.redirect('/eventos');
});

app.post('/participar/:id', async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }
  await db.adicionarParticipante(req.params.id, req.session.usuario.email);
  res.redirect('/eventos');
});

app.post('/cancelar/:id', async (req, res) => {
  if (!req.session.usuario) {
    return res.redirect('/');
  }
  await db.removerParticipante(req.params.id, req.session.usuario.email);
  res.redirect('/eventos');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});