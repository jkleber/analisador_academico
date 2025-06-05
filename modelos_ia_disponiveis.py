# pip install python-dotenv
# pip install google-generativeai

import os
from dotenv import load_dotenv
import google.generativeai as genai


# Carrega as variáveis do arquivo .env
load_dotenv()

# Lê a chave da variável de ambiente
api_key = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=api_key)

for model in genai.list_models():
    print(model.name, model.supported_generation_methods)
