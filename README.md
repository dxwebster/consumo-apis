# Consumo de APIs

Esse é um estudo do consumo de APIs Rest, com duas soluções diferentes, o Axios e o Fetch.

##  Utilizando o Axios
O Axios é uma lib que pode ser instalada na sua aplicação React, e vai permitir que sua aplicação consuma os dados de uma API.
Para instalar o axios, basta instalar o seguinte comando: `yarn add axios`.

Para utiliza-lo você deve criar um arquivo 'api.js' que vai conter a conexão com a api, informando a porta que ela está rodando.

```js
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com",
});

export default api;
``` 

Depois, no arquivo principal, você importa a api e trabalha utilizando as rotas. Aqui no caso, utilizaremos a rota get, para buscar informações.
Importante saber quais informações sua api está te fornecendo.

O Axios já armazena automaticamente as informações em uma chave 'data', então basta pegar o 'response.data' e armazenar no estado.
No caso abaixo, estamos consumindo as informações vinda de um reposiório do github.


```js
import React, { useEffect, useState } from 'react';

import api from './services/api';

function App() {
  const [repository, setRepository] = useState('');

  useEffect(() => {
    async function getContent() {
      try {
        const response = await api.get(`repos/facebook/react`);
        const responseData = response.data
        setRepository(responseData) 

        console.log(response.data.owner)

      } catch (error) {
        console.error(error)
      }
    }
    getContent();
  }, [])

   return (
      <div className="app">
         <main>
            <section>
            <h1> Listando informações de um Repositório do Github</h1>
            <p>Consumindo API do github utilizando o Axios</p>

            <li>Nome do Repositório: {repository.full_name}</li>
            <li>Descrição: {repository.description}</li>
            <li>Login: {repository.login}</li>
            <li>Open Issues: {repository.open_issues}</li>
            <li>Login: {repository.owner && repository.owner.login}</li>
          </section>
         </main>
      </div>
   );
}

export default App;

```
##  Utilizando o Fetch

O fetch é outra solução para consumo de apis. Ele é um método que existe nos navegadores que consegue fazer essa comunicação com a api.
Para fazer essa conexão, basta chamar a url da api no método: `await fetch('urlDaAPI')`. O fetch é uma promise, ou seja, é assíncrona, então precisa vir sempre acompanhada do await dentro de uma função async.

Abaixo temos o consumo da API que possui algumas informações relacionada ao universo Star Wars. É importante saber quais os dados que a  API fornece para podermos trabalhar com eles. Aqui, vamos fazer um botão que ao clicar, vai renderizar informações dos filmes mas de forma aleatória. Então vamos iniciar a função assim que a página carregar, para já ter uma informação disponível na tela, colocando ela em um 'useEffect' vazio. E vamos também incluir essa função no onClick do botão. 

Para pegar a responsta do fetch, precisamos criar a variável data (diferente do axios que já cria sozinho). Então vamos armazenar numa variável 'response', a conexão do fetch com a api, e na variável 'data' o response.json(), que nos traz o objeto com nossos dados. Depois, basta pegar essa 'data' e armazenar no estado.

```js

import React, { useEffect, useState } from 'react';

function App() {
  const [movieData, setMovieData] = useState('');
  
  useEffect(() => {
    newMovie();
  }, []) 


  async function newMovie(){
    try {
      const movieNumber = Math.floor(Math.random() * 6) + 1
      const url = `https://swapi.dev/api/films/${movieNumber}`

      const response = await fetch(url)
      const data = await response.json(); 

      setMovieData(data)

    } catch (error) {
      console.error(error)
      const message = document.querySelector('main')
      message.innerHTML = `<p class='error'>Desculpe, não foi possível carregar os dados.</p>`
    }
  }

    return (
      <div className="app">

        <main>
        <section>
               <h1> Lista de movies do Star Wars</h1>
               <p>Consumindo API do github utilizando o Fetch</p>

               <li>Nome do Filme: {movieData.title}</li>
               <li>Episódio: {movieData.episode_id}</li>
               <li>Diretor: {movieData.director}</li>
               <li>Data de Lançamento: {movieData.release_date}</li>
            </section>

            <button type="submit" onClick={newMovie}> Pesquisar </button>
          
        </main>

      </div>
    );

}

export default App;
``` 