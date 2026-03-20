# Como Adicionar Links de Vendas nos Cursos (FÁCIL)

## 1. Abra data-cursos.js
```
c:/Users/Be Studios/Landing-page/data-cursos.js
```

## 2. Encontre seu curso e substitua `url: '#'` pela URL de vendas

**ANTES:**
```js
{
  id: 4,
  titulo: 'Custos e Formação de Preço de Vendas',
  categoria: 'Administração e Negócios',
  img: 'img/capas/logo-custodeprecodevendas.jpeg',
  descricao: 'Aprenda a calcular custos...',
  url: '#'  ← MUDE AQUI
},
```

**DEPOIS:**
```js
{
  id: 4,
  titulo: 'Custos e Formação de Preço de Vendas',
  categoria: 'Administração e Negócios',
  img: 'img/capas/logo-custodeprecodevendas.jpeg',
  descricao: 'Aprenda a calcular custos...',
  url: 'https://SEU-LINK-HOTMART.com'  ← LINK DA VENDA
},
```

## 3. Salve e teste
- Abra `cursos.html`
- Clique "Ver detalhes →" no curso
- Vai para página de vendas!

## ✅ Cursos já com link:
- Carreira... → Hotmart
- LGPD → Hotmart  
- CompraNet → Hotmart

**18 cursos prontos! Adicione só o `url:` de cada um.**

