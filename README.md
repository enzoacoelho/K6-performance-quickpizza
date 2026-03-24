# 📚 Plano de teste de performance - API QuickPizza

**URL Base da API:** `https://quickpizza.grafana.com`

# 🎯 Objetivo

Este projeto automatiza testes de performance utilizando a ferramenta **K6**. A estrutura foi desenhada para separar configurações globais (`base.js`) dos scripts de execução.

---

## 📂 Estrutura do Projeto

O projeto está organizado para separar as configurações globais dos scripts de execução, facilitando a manutenção dos testes.

* **src/**: Pasta raiz do código fonte.
    * **config/**: Contém as configurações de ambiente e opções de carga (VUs, Duração, Thresholds).
        * `base.js`: Centraliza a URL base e os objetos `smokeOptions`, `stressOptions` e `spikeOptions`.
    * **scripts/**: Scripts de teste que executam os cenários de carga.
        * `smoke-test.js`: Teste rápido de validação (2 VUs).
        * `stress-test.js`: Teste de carga progressiva (até 200 VUs).
        * `spike-test.js`: Teste de pico repentino (até 500 VUs).
* **reports/**: Pasta destinada aos relatórios gerados pelo K6 Web Dashboard (HTML e prints).
* **README.md**: Documentação do projeto e instruções de execução.

---

## 🚀 Execução e Análise de Performance

Abaixo seguem os detalhes de configuração, comandos de execução e evidências dos testes de carga realizados na API.

---

## 🧪 1. Executar Smoke Tests 

**Objetivo:** Validar se a API está no ar e respondendo com status code 200 OK.

* **Configuração do teste:**
    * **VUs:** 2
    * **Tempo:** 10 segundos

**Execução via terminal:**
```powershell
k6 run --vus 2 --duration 10s src/scripts/stress-test.js
```

---

## 🧪 2. Executar Stress Test (Teste de Stress)

**Objetivo:** Encontrar o limite de carga da aplicação e o ponto onde o sistema começa a ficar lento ou dar erro.

* **Configuração do teste:**
    * **VUs:** Aumento gradativo.
    * **Estágios:**
        * **Ramp-Up:** de 1 até 200 VUs em 1 minuto.
        * **Pico:** mantém 200 VUs por 5 minutos.
        * **Ramp-Down:** de 200 VUs até 0 em 1 minuto.

**Execução e Geração de Relatório via terminal:**
O comando abaixo executa o teste e exporta automaticamente o dashboard de resultados para a pasta reports/.

# Windows (PowerShell)
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="reports/stress-test/stress-test-report.html"; $env:K6_WEB_DASHBOARD_PERIOD="5s"; k6 run src/scripts/stress-test.js
```

# Linux / macOS (Bash)
```Bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=reports/stress-test/stress-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run src/scripts/stress-test.js
```

---

## 🧪 3. Executar Spike Test (Teste de Pico)

**Objetivo:** Avaliar a estabilidade da API sob um pico repentino e agressivo de acessos simultâneos.

**Endpoint:** `/api/recommendations`
* **Configuração do teste:**
    * **VUs:** Salto rápido até 300 usuários.
    * **Estágios:**
        * **Ramp-Up:** de 0 a 300 VUs em 30 segundos.
        * **Ramp-Down:** volta para 0 VUs em 40 segundos.

**Execução e Geração de Relatório via terminal:**
O comando abaixo executa o teste e exporta automaticamente o dashboard de resultados para a pasta reports/.

# Windows (PowerShell)
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="reports/spike-test/spike-test-report.html"; $env:K6_WEB_DASHBOARD_PERIOD="5s"; k6 run src/scripts/spike-test.js
```
# Linux / macOS (Bash)
```Bash
K6_WEB_DASHBOARD=true \
K6_WEB_DASHBOARD_EXPORT=reports/spike-test/spike-test-report.html \
K6_WEB_DASHBOARD_PERIOD=5s \
k6 run src/scripts/spike-test.js
```

---

## 📊 Relatórios de Performance

Os relatórios detalhados em HTML e as evidências estão localizados na pasta `/reports`.

### 📂 Arquivos de Saída
* **Stress Test:** `./reports/stress-test/stress-test-report.html`
* **Spike Test:** `./reports/spike-test/spike-test-report.html`

---

### 🧪 1. Stress Test (200 VUs)

**Análise:** Estabilidade total com carga progressiva. Taxa de erro de 0% e latência estável em 157ms.

#### 📈 Overview
![Stress Overview](./reports/stress-test/stress-overview.png)

#### 📝 Summary
![Stress Summary](./reports/stress-test/stress-summary.png)

---

### 🧪 2. Spike Test (500 VUs)

**Análise:** Avaliação de resiliência sob salto repentino de tráfego de 0 a 300 VUs.

#### 📈 Overview
![Spike Overview](./reports/spike-test/spike-overview.png)

#### 📝 Summary
![Spike Summary](./reports/spike-test/spike-summary.png)