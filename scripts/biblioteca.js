document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = "http://localhost:3000/livros"
    
    function carregarLivros() {
        fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const livrosBody = document.getElementById("livros");
            livrosBody.innerHTML = '';
            
            data.forEach(livro => {
                const disponibilidade = livro.disponivel ? 'Sim' : 'Não';
                
                // HTML
                const row = `
                    <tr>
                        <td>${livro.nome}</td>
                        <td>${livro.autor}</td>
                        <td>${disponibilidade}</td>
                        <td>
                            <button class="btn btn-danger btn-devolver" data-id="${livro.id}">
                            Devolver Livro
                            </button>

                            <button class="btn btn-success btn-retirar" data-id="${livro.id}">
                            Retirar Livro
                            </button>
                        </td>
                    </tr>
                `;

                livrosBody.innerHTML += row;


            });
            
        })
        .catch(error => console.log("Erro ao carregar os livros ", error));
    }
    
    carregarLivros()
})