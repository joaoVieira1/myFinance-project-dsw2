fetch("http://localhost:8080/api-transactions-dsw2/transactions/balance")
  .then(res => res.json())
  .then(data => {
    const saldo = data.saldoAtual;
    const receitas = data.receitasPorCategoria;
    const despesas = data.despesasPorCategoria;

    document.getElementById("saldo").textContent = formatar(saldo);

    criarGraficoPizza("graficoReceitas", receitas, "Receitas por Categoria");
    criarGraficoPizza("graficoDespesas", despesas, "Despesas por Categoria");

    const totalReceitas = somarValores(receitas);
    const totalDespesas = somarValores(despesas);
    criarGraficoComparativo(totalReceitas, totalDespesas);
  })
  .catch(error => {
    console.error("Erro ao buscar balanço:", error);
  });

function formatar(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function somarValores(obj) {
  return Object.values(obj).reduce((acc, val) => acc + val, 0);
}

function gerarCores(qtd) {
  const cores = [
    "#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0",
    "#9966FF", "#FF9F40", "#00C49F", "#D291BC"
  ];
  return cores.slice(0, qtd);
}

function criarGraficoPizza(idCanvas, dados, titulo) {
  const labels = Object.keys(dados);
  const valores = Object.values(dados);
  const ctx = document.getElementById(idCanvas).getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [{
        data: valores,
        backgroundColor: gerarCores(labels.length)
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom'
        },
        title: {
          display: false
        }
      }
    }
  });
}

function criarGraficoComparativo(totalReceitas, totalDespesas) {
  const ctx = document.getElementById("graficoComparativo").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Receitas", "Despesas"],
      datasets: [{
        label: "Valor (R$)",
        data: [totalReceitas, totalDespesas],
        backgroundColor: ["#198754", "#dc3545"]
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        title: {
          display: false
        }
      },
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}
