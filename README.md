# chat-bot-react

# FullStack test software

  <strong>🚵 Ferramentas usadas:</strong>
  <ul>
    <li>Deploy do backend feito com <a href="https://render.com/"  target="_blank" rel="noopener noreferrer">Render</a></li>
    <li>Deploy do frontend feito com <a href="https://vercel.com/"  target="_blank" rel="noopener noreferrer">Vercel</a></li>
    <li>Banco com <a href="https://www.mongodb.com/atlas/database" target="_blank" rel="noopener noreferrer">MongoDB Atlas</a> (AWS).</li>
    <li>Interação com o bot pelo <a href="https://cloud.google.com/dialogflow?hl=pt-br"  target="_blank" rel="noopener noreferrer">DialogFlow</a></li>
  </ul>

  <strong>🚵 Objetivo:</strong>
  <ul>
    <li>Criar uma chatbot fullstack</li>
    <li>Ser capaz de entender os termos:  "Hello," "Goodbye," "Good", "I want"</li>
    <li>ao encontrar o termo "loan" exibe algumas opções como: "Do you want to apply for a loan?", "Loan conditions", "Help"</li>
    <li>Quando encontra o termo "Goodbye" Finaliza a conversa e salva no banco de dados.</li>
    <li>É possível exportar dados da conversa salva via csv</li>
   </ul>

</details>

## Acessar a aplicação:
#### login para acessar o bot 
<ul>
  <li>username: larissa</li>
  <li>password: asd123</li>
</ul>

  #### [ACESSAR WEBSITE](https://chat-bot-react-alpha.vercel.app/)



## Histórico de `Commits`
  * Para ver a evolução do codigo você pode checar o histórico de commits  
  ![Screenshot_9](https://user-images.githubusercontent.com/37710776/229648831-1d560b18-a34f-42bf-91b3-20a44ff2125f.png)
  
  
  
## Como clonar e testar o projeto em sua `maquina`

* Use o comando: `git clone git@github.com:laujuu/chat-bot-react.git`

  1. Entre na pasta do repositório que você acabou de clonar:

* `cd chat-bot-react`

  2. Instale as dependências do backend

* `cd backend`
* `npm install`
  
  3. Instale as dependências do frontend
* `cd frontend`
* `npm install`


## Rodando a API

  1. Certifique-se de estar na pasta da api:

* `cd backend`

  2. Executando a api

* `npm run backend-dev`
  
Pronto, agora a API ja esta rodando



## Rodando o Front End

  1. Em um terminal deixe a API rodando como explicado no passo anterior:

  2. Entre na pasta do front

* `cd client`

  2. instale as dependencias

* `npm install`

 3. Rode o Front End

* `npm run dev`

Pronto agora o front e o back estão funcionando e comunicando entre sí, mas lembre-se, você vai precisar das variáveis de ambiente para funcionar certinho, 
como elas estão configuradas no servidor, teste pelo website disponibilizado no começo do readme.

No mais fique a vontade para explorar ;)
