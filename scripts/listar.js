let paginaAtual = 1;

function carregarTransacoes(pagina = 1) {
  fetch(`http://localhost:8080/api-transactions-dsw2/transactions?page=${pagina}&size=10`)
    .then(response => {
      if (!response.ok) throw new Error("Erro ao buscar transações");
      return response.json();
    })
    .then(data => {
      const tabela = document.getElementById("tabela-transacoes");
      console.log("RESPOSTA DA API:", data);
      tabela.innerHTML = "";

      data.forEach(transacao => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transacao.id}</td>
          <td>${transacao.description}</td>
          <td>${transacao.value.toFixed(2)}</td>
          <td class="text-center">
            <span class="badge ${transacao.type === 'RECEITA' ? 'bg-success' : 'bg-danger'}">
                ${transacao.type}
            </span>
          </td>
          <td>${transacao.category}</td>
          <td>${transacao.date}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" onclick="atualizar(${transacao.id})">Atualizar</button>
            <button class="btn btn-sm btn-danger" onclick="deletar(${transacao.id})">Deletar</button>
          </td>
        `;
        tabela.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Erro:", error);
      document.getElementById("mensagem").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
    });
}

function atualizar(id) {
  alert("Atualizar transação ID: " + id);
  
}

function deletar(id) {
  if (!confirm("Deseja realmente deletar a transação ID " + id + "?")) return;

  fetch(`http://localhost:8080/api-transactions-dsw2/transactions/${id}`, {
    method: "DELETE"
  })
    .then(res => {
      if (res.ok) {
        alert("Transação deletada com sucesso!");
        carregarTransacoes(paginaAtual); 
      } else {
        throw new Error("Erro ao deletar transação");
      }
    })
    .catch(error => alert(error.message));
}

document.getElementById("btnProximo").addEventListener("click", () => {
  paginaAtual++;
  carregarTransacoes(paginaAtual);
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    carregarTransacoes(paginaAtual);
  }
});

carregarTransacoes(paginaAtual);
