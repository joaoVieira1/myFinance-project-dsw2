const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const form = document.getElementById("formAtualizar");
const mensagem = document.getElementById("mensagem");

if (!id) {
  mensagem.innerHTML = `<div class="alert alert-danger">ID não fornecido na URL.</div>`;
} else {
  fetch(`http://localhost:8080/api-transactions-dsw2/transactions/${id}`)
    .then(res => {
      if (!res.ok) throw new Error("Transação não encontrada.");
      return res.json();
    })
    .then(transacao => {
      document.getElementById("id").value = transacao.id;
      document.getElementById("description").value = transacao.description;
      document.getElementById("value").value = transacao.value;
      document.getElementById("type").value = transacao.type;
      document.getElementById("category").value = transacao.category;
      document.getElementById("date").value = transacao.date;
    })
    .catch(err => {
      mensagem.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const transacaoAtualizada = {
    description: form.description.value,
    value: parseFloat(form.value.value),
    type: form.type.value,
    category: form.category.value,
    date: form.date.value
  };

  fetch(`http://localhost:8080/api-transactions-dsw2/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(transacaoAtualizada)
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao atualizar transação.");
      window.location.href = "listar.html";
    })
    .catch(err => {
      mensagem.innerHTML = `<div class="alert alert-danger">${err.message}</div>`;
    });
});
