#!/bin/bash

MODEL_URL="https://huggingface.co/TheBloke/Mistral-7B-Instruct-v0.1-GGUF/resolve/main/mistral-7b-instruct-v0.1.Q4_0.gguf"
MODEL_NAME="mistral-7b-instruct-v0.1.Q4_0.gguf"

echo "📥 Downloading Mistral model to project root as $MODEL_NAME..."
wget -O "$MODEL_NAME" "$MODEL_URL"

if [ $? -eq 0 ]; then
    echo "✅ Download complete!"
else
    echo "❌ Download failed. Please check your internet connection or the URL."
fi
