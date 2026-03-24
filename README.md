# Plano de teste de performance - API QuickPizza

**URL Base da API:** `https://quickpizza.grafana.com`

Este projeto automatiza testes de performance utilizando a ferramenta **K6**. A estrutura foi desenhada para separar configurações globais (`base.js`) dos scripts de execução.

---

## Criação do Report e Monitoria

---

## 1. Executar Smoke Tests 

**Objetivo:** Validar se a API está no ar e respondendo com status code 200 OK.

**Endpoint:** `/api/recommendations`
* **Configuração do teste:**
    * **VUs:** 2
    * **Tempo:** 10 segundos

**Execução via terminal:**
```powershell
k6 run --vus 1 --duration 5s src/scripts/stress-test.js
```

---

## Executar Stress Test (Teste de Stress)

**Objetivo:** Encontrar o limite de carga da aplicação e o ponto onde o sistema começa a ficar lento ou dar erro.

**Endpoint:** `/api/recommendations`
* **Configuração do teste:**
    * **VUs:** Aumento gradativo.
    * **Estágios:**
        * **Ramp-Up:** de 1 até 200 VUs em 1 minuto.
        * **Pico:** mantém 200 VUs por 5 minutos.
        * **Ramp-Down:** de 200 VUs até 0 em 1 minuto.

**Execução via terminal:**
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="stress-test-report.html"; $env:K6_WEB_DASHBOARD_PERIOD="5s"; k6 run src/scripts/stress-test.js
```

---

## Executar Spike Test (Teste de Pico)

**Objetivo:** Avaliar a estabilidade da API sob um pico repentino e agressivo de acessos simultâneos.

**Endpoint:** `/api/recommendations`
* **Configuração do teste:**
    * **VUs:** Salto rápido até 400 usuários.
    * **Estágios:**
        * **Ramp-Up:** de 0 a 400 VUs em 30 segundos.
        * **Ramp-Down:** volta para 0 VUs em 40 segundos.

**Execução via terminal:**
```powershell
$env:K6_WEB_DASHBOARD="true"; $env:K6_WEB_DASHBOARD_EXPORT="spike-test-report.html"; $env:K6_WEB_DASHBOARD_PERIOD="5s"; k6 run src/scripts/spike-test.js
```