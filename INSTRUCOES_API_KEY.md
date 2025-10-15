# 🔑 Como Obter a API Key Correta do Google Places

## ⚠️ **Problema Identificado**

A chave que você forneceu:
```
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
```

É uma **Client Secret OAuth2** (começa com `GOCSPX-`), não uma API Key do Google Places.

## ✅ **Solução: Obter API Key Correta**

### **Passo 1: Acessar Google Cloud Console**
1. Vá para: https://console.cloud.google.com/
2. Faça login com sua conta Google
3. Selecione o mesmo projeto onde você tem a Client Secret

### **Passo 2: Ativar Places API**
1. No menu lateral, clique em **"APIs e Serviços"** → **"Biblioteca"**
2. Procure por **"Places API"**
3. Clique em **"Places API"** e depois **"ATIVAR"**

### **Passo 3: Criar API Key**
1. Vá em **"APIs e Serviços"** → **"Credenciais"**
2. Clique no botão **"+ CRIAR CREDENCIAIS"**
3. Selecione **"Chave de API"**
4. Uma nova API Key será criada (formato: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)

### **Passo 4: Configurar Restrições (IMPORTANTE)**
1. Clique na API Key recém-criada
2. Em **"Restrições da aplicação"**, selecione **"Referenciadores HTTP (sites)"**
3. Adicione seus domínios:
   ```
   https://relvaloupfono.com.br/*
   https://*.netlify.app/*
   ```
4. Em **"Restrições de API"**, selecione **"Restringir chave"**
5. Marque apenas **"Places API"**
6. Clique **"SALVAR"**

### **Passo 5: Configurar no Site**
1. Copie a nova API Key (formato: `AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`)
2. Edite o arquivo `config.js`
3. Substitua `SUA_API_KEY_AQUI` pela nova chave
4. Faça novo deploy

## 🆔 **Place ID Atualizado**
✅ Já configurei o Place ID correto: `ChIJqZjrLeYxWpMRrRQEXPITSu4`

## 💰 **Custos**
- **Gratuito**: Até $200/mês (≈ 11.700 solicitações)
- **Seu uso estimado**: 5-50 solicitações/mês
- **Custo real**: $0 (dentro da cota gratuita)

## 🔍 **Como Verificar se Funcionou**
Após configurar a API Key:
1. Acesse seu site
2. Abra o console do navegador (F12)
3. Procure por: `"✅ Real Google reviews loaded successfully!"`

## ❓ **Dúvidas Comuns**

**P: Por que não posso usar a Client Secret?**
R: Client Secrets são para autenticação OAuth2, não para APIs públicas como Places API.

**P: A API Key é segura no código?**
R: Sim, com as restrições de domínio configuradas, ela só funciona no seu site.

**P: E se eu não quiser usar a API?**
R: Posso configurar depoimentos reais coletados manualmente do seu Google Meu Negócio.
