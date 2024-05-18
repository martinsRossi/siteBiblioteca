document.addEventListener('DOMContentLoaded', function () {
    // Endpoint da API
    const apiUrl = 'http://localhost:3000/livros';

    // Função para carregar os livros
    function carregarLivros() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const livrosBody = document.getElementById('livros');
                livrosBody.innerHTML = '';

                data.forEach(livro => {
                    const disponibilidade = livro.disponivel ? 'Sim' : 'Não';
                    const row = `
                        <tr>
                            <td>${livro.nome}</td>
                            <td>${livro.autor}</td>
                            <td>${disponibilidade}</td>
                            <td>
                                <button class="btn btn-danger btn-devolver" data-id="${livro.id}">Devolver Livro</button>
                                <button class="btn btn-success btn-retirar" data-id="${livro.id}">Retirar Livro</button>
                            </td>
                        </tr>
                    `;
                    livrosBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Erro ao carregar os livros:', error));
    }

    // Carregar livros quando a página carregar
    carregarLivros();

    // Adicionar livro
    document.getElementById('formAdicionarLivro').addEventListener('submit', function (event) {
        event.preventDefault();
        const nomeLivro = document.getElementById('nomeLivro').value;
        const autor = document.getElementById('autor').value;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome: nomeLivro,
                autor: autor,
                disponivel: true
            }),
        })
        .then(response => response.json())
        .then(() => {
            $('#modalAdicionarLivro').modal('hide');
            carregarLivros();
        })
        .catch(error => console.error('Erro ao adicionar o livro:', error));
    });

    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-devolver')) {
            const livroId = event.target.getAttribute('data-id');
            devolverLivro(livroId);
        }

        if (event.target.classList.contains('btn-retirar')) {
            const livroId = event.target.getAttribute('data-id');
            retirarLivro(livroId);
        }
    });


    function devolverLivro(livroId){
        fetch(`${apiUrl}/${livroId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                disponivel: true
            }),
        })
        .then(() => carregarLivros())
        .catch(error => console.error('Erro ao devolver o livro:', error));
    }

    function retirarLivro(livroId) {
        fetch(`${apiUrl}/${livroId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                disponivel: false
            }),
        })
        .then(() => carregarLivros())
        .catch(error => console.error('Erro ao retirar o livro:', error));
    }

});