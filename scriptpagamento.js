document.addEventListener("DOMContentLoaded", () => {
    // Elementos Pix
    const pixButton = document.getElementById("pixButton");
    const qrCodeModal = document.getElementById("qrCodeModal");
    const closeModalPix = document.getElementById("closeModalPix");
    const qrCodeCanvas = document.getElementById("qrCodeCanvas");
    const calculateFretePix = document.getElementById("calculateFretePix");
    const freteResultPix = document.getElementById("freteResultPix");

    // Elementos Boleto
    const boletoButton = document.getElementById("boletoButton");
    const boletoModal = document.getElementById("boletoModal");
    const closeModalBoleto = document.getElementById("closeModalBoleto");
    const boletoCode = document.getElementById("boletoCode");
    const downloadBoletoButton = document.getElementById("downloadBoleto");

    // Elementos Cartão de Crédito
    const creditoButton = document.getElementById("creditoButton");
    const creditoModal = document.getElementById("creditoModal");
    const closeModalCredito = document.getElementById("closeModalCredito");
    const creditoForm = document.getElementById("creditoForm");
    const freteResultCredito = document.getElementById("freteResultCredito");

    // Função para gerar QR Code
    const generateQRCode = async () => {
        const apiUrl = "https://api.qrserver.com/v1/create-qr-code/";
        const pixData = `pix:${Math.random().toString(36).substr(2, 10)}`; // Dados únicos
        const qrCodeURL = `${apiUrl}?size=200x200&data=${encodeURIComponent(pixData)}`;

        const ctx = qrCodeCanvas.getContext("2d");
        const qrImage = new Image();

        qrImage.onload = () => {
            qrCodeCanvas.width = qrImage.width;
            qrCodeCanvas.height = qrImage.height;
            ctx.drawImage(qrImage, 0, 0);
        };
        qrImage.src = qrCodeURL;
    };

    // Função para calcular o frete
    const calcularFrete = (cep) => {
        const valorFrete = Math.floor(Math.random() * 20) + 10; // Simula R$10 a R$30
        return `O valor do frete para o CEP ${cep} é R$${valorFrete},00.`;
    };

    // Botão "Calcular Frete" no modal Pix
    calculateFretePix.addEventListener("click", () => {
        const cep = prompt("Digite seu CEP:");
        if (cep && cep.length === 8) {
            freteResultPix.textContent = calcularFrete(cep);
        } else {
            freteResultPix.textContent = "CEP inválido. Por favor, insira 8 números.";
        }
    });

    // Função para gerar boleto
    const gerarBoleto = () => {
        const codigoBoleto = `34191.${Math.random().toString().slice(2, 7)}.${Math.random()
            .toString()
            .slice(2, 10)}.10000.${Math.random().toString().slice(2, 5)}00000`;

        boletoCode.textContent = `Código do boleto: ${codigoBoleto}`;
        boletoModal.classList.remove("hidden");

        // Evento para baixar o boleto
        downloadBoletoButton.addEventListener("click", () => {
            const blob = new Blob([`Boleto gerado: ${codigoBoleto}`], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "boleto.txt";
            link.click();
        });
    };

    // Função para processar pagamento com cartão
    const processarCartao = (event) => {
        event.preventDefault();
        const cardNumber = document.getElementById("cardNumber").value;
        const cardExpiry = document.getElementById("cardExpiry").value;
        const cardCVV = document.getElementById("cardCVV").value;

        if (cardNumber.length === 16 && cardExpiry.length === 5 && cardCVV.length === 3) {
            alert("Pagamento com cartão de crédito realizado com sucesso!");
            creditoModal.classList.add("hidden");

            // Solicitar CEP para cálculo do frete
            const cep = prompt("Digite seu CEP para calcular o frete:");
            if (cep && cep.length === 8) {
                const frete = calcularFrete(cep);
                freteResultCredito.textContent = frete; // Exibe o frete na página
                alert(frete); // Exibe também em um alerta
            } else {
                freteResultCredito.textContent = "CEP inválido. Por favor, insira 8 números.";
                alert("CEP inválido. Por favor, insira 8 números.");
            }
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    };

    // Eventos para abrir os modais de pagamento
    pixButton.addEventListener("click", () => {
        qrCodeModal.classList.remove("hidden");
        generateQRCode();
    });

    boletoButton.addEventListener("click", gerarBoleto);

    creditoButton.addEventListener("click", () => {
        creditoModal.classList.remove("hidden");
    });

    // Fechar modais
    closeModalPix.addEventListener("click", () => qrCodeModal.classList.add("hidden"));
    closeModalBoleto.addEventListener("click", () => boletoModal.classList.add("hidden"));
    closeModalCredito.addEventListener("click", () => creditoModal.classList.add("hidden"));

    // Submissão do formulário de cartão
    creditoForm.addEventListener("submit", processarCartao);
});