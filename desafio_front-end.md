#  Painel Administrativo – E-commerce

Estamos desenvolvendo o novo **Painel Administrativo** para o nosso e-commerce.  
O objetivo é fornecer aos gestores uma visão clara do estado da loja e **ferramentas eficientes** para a manutenção do catálogo.

Você será o responsável pela **arquitetura e desenvolvimento do Frontend** desta aplicação.  
Como buscamos um perfil **Pleno/Sênior**, esperamos decisões pensando no longo prazo:

- Código fácil de manter  
- Componentes reutilizáveis  
- Aplicação preparada para crescimento  

---

##  API

- **Documentação:** https://fakeapi.platzi.com

---

## Stack Tecnológica

- **Vue.js 3**
- **Tailwind CSS**
- **Pinia**

---

##  Escopo Funcional (Requisitos de Negócio)

###  Autenticação e Segurança

- Sistema restrito a **administradores**
- Login via **email e senha**
- **Persistência de sessão** (manter login após refresh)
- **Controle de acesso**
  - Rotas internas não podem ser acessadas sem token válido

---

###  Dashboard (Visão Geral)

A tela inicial deve funcionar como uma **central de inteligência** para o gestor.

####  Indicadores Chave (KPIs)
Cards no topo exibindo métricas consolidadas, por exemplo:

- Total de produtos cadastrados
- Total de categorias ativas
- Preço médio dos produtos

####  Visualização Gráfica

- Implementar **ao menos um gráfico**
- Objetivo: facilitar a leitura e análise dos dados

 **Sugestão de negócio**  
Gráfico exibindo:
- Distribuição de produtos por **categoria**, ou
- Distribuição por **faixas de preço**

> A escolha da biblioteca de gráficos fica a seu critério.

####  Listagem Rápida

Uma seção de destaques, por exemplo:

- Top 5 produtos mais caros
- Produtos adicionados recentemente

---

###  Gestão de Produtos (Catálogo)

Esta é a **ferramenta principal do gestor**.  
Performance e usabilidade são essenciais.

####  Listagem

- Tabela de dados consumindo a API
- **Paginação real no servidor**
  - Utilizar `offset` e `limit`
  - Não carregar todos os dados no cliente

####  Filtros

- Título
- Preço
- Categoria

####  CRUD

- Criar produtos
- Editar produtos
- Deletar produtos

---

##  Requisitos Técnicos e Critérios de Avaliação

Mais do que apenas **funcionar**, será avaliado **como** você constrói software.

---

###  Arquitetura e Escalabilidade

- Organização de pastas clara e escalável
- Estrutura preparada para **centenas de arquivos**
- Separação de responsabilidades:
  - Lógica de negócio (API, regras, validações)
  - Camada de visualização (Templates)
- Uso consciente do **Pinia**
  - Estado global × estado local

---

###  Clareza e Qualidade de Código

- Código **autoexplicativo**
- Nomes claros para variáveis e funções
- Evitar:
  - “Go Horse”
  - Números mágicos
- Componentização inteligente:
  - Componentes pequenos
  - Responsabilidade única
  - Alto grau de reuso

---

###  UX e Robustez

- Feedback visual claro:
  - Loadings
  - Mensagens de sucesso
  - Alertas de erro
- Tratamento de erros:
  - A aplicação **não deve quebrar**
  - Nenhuma tela branca em falhas de rede

---

## Diferenciais

Pontos que agregam valor à entrega:

- Layout responsivo (**Mobile First**)
- Documentação clara no `README.md`:
  - Como rodar o projeto
  - Decisões técnicas tomadas

---

## Entrega

- Repositório Git público (**GitHub ou GitLab**)
- Histórico de commits organizado
- Arquivo `README.md` com:
  - Instruções de execução
  - Descrição da solução