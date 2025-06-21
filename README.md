# 🧠 Prompter Backend

This is the backend of the **Prompter App**, a local AI-powered assistant designed to help users generate professional prompts using a local Mistral 7B model through [llama-node](https://github.com/BuilderIO/llama-node).

---

## 🏗️ Architecture Overview

The backend is built with:

- **Node.js**: Server runtime
- **Express.js**: Web server
- **llama-node**: Interface to run local Mistral 7B inference
- **Mistral-7B-Instruct-v0.1.Q4_0.gguf**: Local language model (not pushed due to size limits)

---

✅ 1. Clone the repository

```bash
git clone https://github.com/karim2201/prompter-backend.git
cd prompter-backend
```

✅ 2. Install dependencies
```bash
npm install
```

✅ 3. Download the Mistral model
Run this script to automatically fetch the model (~4GB):

```bash
./download-model.sh
```
📌 Make sure you have wget installed. The model will be placed in the root folder.

✅ 4. Start the backend
```bash
node server.js
```
By default, the backend runs on:
📍 http://localhost:3000
