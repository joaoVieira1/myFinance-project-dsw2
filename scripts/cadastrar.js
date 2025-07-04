document.getElementById("formTransacao").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const data = {
      description: document.getElementById("description").value,
      value: parseFloat(document.getElementById("value").value),
      type: document.getElementById("type").value,
      category: document.getElementById("category").value,
      date: document.getElementById("date").value
    };
  
    fetch("http://localhost:8080/api-transactions-dsw2/transactions/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => {
        const msg = document.getElementById("mensagem");
        if (res.status === 201) {
          msg.innerHTML = `<div class="alert alert-success">Transação cadastrada com sucesso!</div>`;
          document.getElementById("formTransacao").reset();
        } else if (res.status === 400) {
          msg.innerHTML = `<div class="alert alert-warning">Dados inválidos. Verifique os campos.</div>`;
        } else {
          msg.innerHTML = `<div class="alert alert-danger">Erro inesperado. Tente novamente.</div>`;
        }
      })
      .catch(error => {
        console.error("Erro:", error);
        document.getElementById("mensagem").innerHTML =
          `<div class="alert alert-danger">Erro na requisição: ${error.message}</div>`;
      });
  });