/**
 * Flow Assistant Engine - Enterprise Ultra-Resilient
 * Desenvolvido por: Yago Ricardo (https://github.com/kamuidyr)
 * Otimização Avançada: Remoção de Equipamento, Varredura Contínua, Persistência no LocalStorage e REMOÇÃO DE E-MAIL.
 */

(function () {
  'use strict';

  let cacheLocalDados = null;
  let cpfAtendimentoCorrente = null;

  // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
  const engineObserver = new MutationObserver(() => {
    
    // Identifica e valida o cliente em foco no painel
    const cpfDetectado = capturarCpfDoPainel();
    if (cpfDetectado && cpfDetectado !== 'XXXX' && cpfDetectado !== cpfAtendimentoCorrente) {
      cpfAtendimentoCorrente = cpfDetectado;
    }

    // SCRAPING PREVENTIVO CONTÍNUO: Coleta dados em tempo real enquanto a página estiver aberta
    const scrapingInstante = executarVarreduraProfunda();
    if (scrapingInstante && scrapingInstante.cpf !== 'XXXX') {
      cacheLocalDados = scrapingInstante;
    }

    // INTERCEPÇÃO DO BOTÃO DE ENCERRAMENTO
    const botoesDoSistema = document.querySelectorAll('button');
    botoesDoSistema.forEach(botao => {
      const textoInterno = (botao.innerText || botao.textContent || '').toUpperCase();
      if (textoInterno.includes('ENCERRAR ATENDIMENTO') && !botao.dataset.flowTracked) {
        botao.dataset.flowTracked = 'true';
        
        // Garante a consolidação imediata do cache de dados antes da transição do modal
        const assegurarDadosGatilho = () => {
          const dadosFinais = executarVarreduraProfunda();
          if (dadosFinais && dadosFinais.cpf !== 'XXXX') {
            cacheLocalDados = dadosFinais;
          }
        };
        botao.addEventListener('mousedown', assegurarDadosGatilho, true);
        botao.addEventListener('click', assegurarDadosGatilho, true);
      }
    });

    // MONITORAMENTO E PERSISTÊNCIA COMPLETA NO TEXTAREA DO MODAL
    const caixaTextoModal = document.querySelector('textarea, [textarea], .modal textarea, [class*="modal"] textarea, [class*="Modal"] textarea');
    
    if (caixaTextoModal && cpfAtendimentoCorrente && cpfAtendimentoCorrente !== 'XXXX') {
      
      // PERSISTÊNCIA LOCALSTORAGE (ANTI-PERDA ABSOLUTA): Resgata o histórico caso saia da página ou dê F5
      const rascunhoHistorico = localStorage.getItem(`flow_v2_draft_${cpfAtendimentoCorrente}`);
      if (rascunhoHistorico && !caixaTextoModal.dataset.flowRestored && (caixaTextoModal.value === '' || !caixaTextoModal.value)) {
        caixaTextoModal.value = rascunhoHistorico;
        caixaTextoModal.dataset.flowRestored = 'true';
        caixaTextoModal.dataset.flowInjected = 'true';
        atualizarEstadosDoFramework(caixaTextoModal);
      }

      // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
      if (!caixaTextoModal.dataset.flowPersistTracked) {
        caixaTextoModal.dataset.flowPersistTracked = 'true';
        caixaTextoModal.addEventListener('input', (e) => {
          localStorage.setItem(`flow_v2_draft_${cpfAtendimentoCorrente}`, e.target.value);
        });
      }
    }

    // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
    if (caixaTextoModal && cacheLocalDados && caixaTextoModal.dataset.flowInjected !== 'true' && (caixaTextoModal.value === '' || !caixaTextoModal.value)) {
      processarInjecaoDoRelatorio(caixaTextoModal, cacheLocalDados);
    }
  });

  // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
  engineObserver.observe(document.body, { childList: true, subtree: true });

  /**
   * CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
   */
  function extrairNoTextualDOM(termoChave) {
    const elementosAlvo = document.querySelectorAll('span, div, td, p, li, label, strong, b');
    for (let el of elementosAlvo) {
      if (el.children.length === 0 || (el.children.length > 0 && el.innerText && !el.innerText.includes('\n'))) {
        const payloadTexto = (el.innerText || el.textContent || '').trim().toUpperCase();
        if (payloadTexto.includes(termoChave.toUpperCase())) {
          return el;
        }
      }
    }
    return null;
  }

  /**
   * Algoritmo de Captura de Proximidade Espacial
   */
  function capturarValorDoCampo(termoChave) {
    const elementoEncontrado = extrairNoTextualDOM(termoChave);
    if (!elementoEncontrado) return 'XXXX';

    // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
    if (elementoEncontrado.nextElementSibling && elementoEncontrado.nextElementSibling.textContent.trim().length > 1) {
      return elementoEncontrado.nextElementSibling.textContent.trim();
    }
    
    // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
    if (elementoEncontrado.parentElement) {
      const conteudoPai = elementoEncontrado.parentElement.innerText || elementoEncontrado.parentElement.textContent || '';
      const expressaoLimpeza = new RegExp(termoChave, 'gi');
      const resultadoLimpo = conteudoPai.replace(expressaoLimpeza, '').replace(/[:\-–—]/g, '').trim();
      if (resultadoLimpo.length > 1) return resultadoLimpo;
    }

    return 'XXXX';
  }

  function capturarCpfDoPainel() {
    const buscaEstrutural = capturarValorDoCampo('CPF');
    if (buscaEstrutural !== 'XXXX' && /\d/.test(buscaEstrutural)) return buscaEstrutural;

    // Varredura por Regex nativa na página inteira
    const correspondenciaRegex = document.body.innerText.match(/\d{3}\.\d{3}\.\d{3}-\d{2}/);
    return correspondenciaRegex ? correspondenciaRegex[0] : null;
  }

  /**
   * MÓDULO RASPADOR ENTERPRISE (Removido Equipamento e E-mail)
   */
  function executarVarreduraProfunda() {
    const estruturaDados = {
      protocolo: 'XXXX', cpf: 'XXXX', plano: 'XXXX', modeloOnu: 'XXXX', 
      olt: 'XXXX', bairro: 'XXXX', cep: 'XXXX', cidade: 'XXXX', 
      potenciaOnu: 'XXXX', telefone: 'XXXX'
    };

    try {
      // Isolamento Numérico do Protocolo de Atendimento
      const elementoProtocolo = extrairNoTextualDOM('PROTOCOLO');
      if (elementoProtocolo) {
        const stringBruta = elementoProtocolo.innerText || elementoProtocolo.textContent || '';
        const matchProtocolo = stringBruta.match(/\d{10,}/);
        if (matchProtocolo) estruturaDados.protocolo = matchProtocolo[0];
      }

      estruturaDados.cpf = capturarCpfDoPainel() || 'XXXX';
      estruturaDados.plano = capturarValorDoCampo('Plano');
      estruturaDados.modeloOnu = capturarValorDoCampo('Modelo ONU') !== 'XXXX' ? capturarValorDoCampo('Modelo ONU') : capturarValorDoCampo('Modelo da ONU');
      estruturaDados.olt = capturarValorDoCampo('OLT');
      estruturaDados.bairro = capturarValorDoCampo('Bairro');
      estruturaDados.cep = capturarValorDoCampo('CEP');
      estruturaDados.cidade = capturarValorDoCampo('Cidade');
      estruturaDados.potenciaOnu = capturarValorDoCampo('Potência ONU') !== 'XXXX' ? capturarValorDoCampo('Potência ONU') : capturarValorDoCampo('Sinal da ONU');
      estruturaDados.telefone = capturarValorDoCampo('Telefone') !== 'XXXX' ? capturarValorDoCampo('Telefone') : capturarValorDoCampo('Celular');

      //CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
      if (estruturaDados.telefone === 'XXXX') {
        const regexTelefone = document.body.innerText.match(/(?:\(?\d{2}\)?\s?)?9?\d{4}[-\s]?\d{4}/);
        if (regexTelefone) estruturaDados.telefone = regexTelefone[0];
      }
      if (estruturaDados.cep === 'XXXX') {
        const regexCep = document.body.innerText.match(/\d{5}-\d{3}/);
        if (regexCep) estruturaDados.cep = regexCep[0];
      }

    } catch (falha) {
      // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
    }

    // Higienização e Sanitização das Propriedades
    Object.keys(estruturaDados).forEach(chave => {
      if (!estruturaDados[chave] || estruturaDados[chave] === '' || estruturaDados[chave].length < 2 || estruturaDados[chave].includes('[object')) {
        estruturaDados[chave] = 'XXXX';
      }
    });

    return estruturaDados;
  }

  /**
   * CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
   */
  function processarInjecaoDoRelatorio(textareaElemento, dados) {
    let relatorioProcedimento = '';
    const potenciaNormalizada = dados.potenciaOnu.toUpperCase();

    if (potenciaNormalizada.includes('MASSIVA')) {
      relatorioProcedimento = 'FOI VERIFICADO E CLIENTE ESTA ENFRENTANDO PROBLEMA MASSIVO EM SUA REGIÃO FOI INFORMADO AO CLIENTE QUE PROBLEMA JA ESTA SERNDO RESOLVIDO QUE E APÉNAS AGUARDAR QUE SERA SOLUCIONADO';
    } else if (potenciaNormalizada.includes('LOS') || potenciaNormalizada.includes('LOSS')) {
      relatorioProcedimento = 'FOI VERIFICADO E CLIENTE POSSUI LOSS INDIVIDUAL E NECESSARIO TECNICO NO LOCAL PRA FAZER REPARO DA FIBRA DO CLIENTE PRA QUE ELE POSSA VOLTAR A TER CONEXÃO';
    }

    // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
    const templateFinal = `PROTOCOLO: ${dados.protocolo}
CPF: ${dados.cpf}
TELEFONE: ${dados.telefone}
PLANO: ${dados.plano}
MODELO ONU: ${dados.modeloOnu}
OLT: ${dados.olt}
BAIRRO: ${dados.bairro}
CEP: ${dados.cep}
CIDADE: ${dados.cidade}

--------------------------------------------------
PROCEDIMENTO REALIZADO:
${relatorioProcedimento}`;

    try {
      textareaElemento.value = templateFinal;
      textareaElemento.setAttribute('value', templateFinal);
      textareaElemento.dataset.flowInjected = 'true';

      // CODIGO FEITO POR YAGO RICARDO E EU MEMO COPIA COMEDIA
      if (cpfAtendimentoCorrente && cpfAtendimentoCorrente !== 'XXXX') {
        localStorage.setItem(`flow_v2_draft_${cpfAtendimentoCorrente}`, templateFinal);
      }

      atualizarEstadosDoFramework(textareaElemento);
    } catch (erro) {
      console.error('[FlowEngine] Erro crítico no fluxo de injeção:', erro);
    }
  }

  /**
   * Sincronização Estrita de Eventos do DOM para SPAs (React/Vue/Angular)
   */
  function atualizarEstadosDoFramework(elemento) {
    const eventosDisparo = ['input', 'change', 'blur'];
    eventosDisparo.forEach(nomeEvento => {
      const eventoInstanciado = new Event(nomeEvento, { bubbles: true, cancelable: true });
      elemento.dispatchEvent(eventoInstanciado);
    });

    // Desvio específico para rastreadores de estado internos do React
    const valueTrackerInterno = elemento._valueTracker;
    if (valueTrackerInterno) {
      valueTrackerInterno.setValue(elemento.value);
    }
  }
})();