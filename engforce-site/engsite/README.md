# EngForce — Site de Engenharia Mecânica

Site institucional para escritório de engenharia mecânica, automação, eletrônica e simulação.

## Estrutura de Arquivos

```
engsite/
├── index.html          ← Página principal
├── css/
│   └── style.css       ← Estilos (dark theme, responsivo)
├── js/
│   └── main.js         ← Interatividade (nav, scroll, animações, form)
├── images/             ← Pasta para fotos dos projetos (adicione aqui)
├── vercel.json         ← Configuração de deploy para Vercel
├── .gitignore
└── README.md
```

---

## 🚀 Como subir no ar (Vercel via GitHub + Codespace)

### 1. Inicializar o repositório Git (Codespace ou terminal local)

```bash
git init
git add .
git commit -m "feat: site engforce inicial"
```

### 2. Criar repositório no GitHub

Acesse [github.com/new](https://github.com/new), crie um repositório (ex: `engforce-site`) e siga as instruções para conectar:

```bash
git remote add origin https://github.com/SEU_USUARIO/engforce-site.git
git branch -M main
git push -u origin main
```

### 3. Conectar ao domínio na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repositório `engforce-site` do GitHub
3. Em **Framework Preset**, selecione **Other** (é um site estático)
4. Clique em **Deploy** ✅
5. Vá em **Settings → Domains** e adicione seu domínio personalizado

---

## ✏️ Personalização rápida

| O que mudar | Onde fica |
|---|---|
| Nome da empresa | `index.html` — busque por `EngForce` |
| Telefone / e-mail | `index.html` — seção `#contato` |
| Estatísticas (50+, 8+) | `index.html` — seção `.hero-stats` e `.about` |
| Serviços | `index.html` — seção `#servicos` |
| Projetos do portfólio | `index.html` — seção `#projetos` |
| Cor principal (laranja) | `css/style.css` — variável `--orange` |
| Fontes | `index.html` — link Google Fonts + `css/style.css` `--font-*` |

---

## 📸 Adicionando imagens reais

Coloque suas fotos de projetos na pasta `images/` e substitua os blocos `<div class="proj-visual ...">` por:

```html
<div class="proj-visual">
  <img src="images/nome-do-projeto.jpg" alt="Descrição" style="width:100%;height:100%;object-fit:cover;">
</div>
```

---

## 📦 Deploy a cada atualização (Codespace)

```bash
git add .
git commit -m "update: descrição da mudança"
git push
```

A Vercel faz o deploy automático a cada `push` para a branch `main`. ✅

---

## 🛠 Próximos passos sugeridos

- [ ] Trocar nome de placeholder por seu nome/empresa real
- [ ] Adicionar fotos reais dos projetos na pasta `images/`
- [ ] Configurar formulário de contato com [Formspree](https://formspree.io) ou [EmailJS](https://emailjs.com)
- [ ] Adicionar Google Analytics ou Plausible para métricas
- [ ] Criar página `/projetos` com portfólio completo

---

**São Luís, MA — Brasil**
