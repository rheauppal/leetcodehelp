# gotta work on this 

import json
import openai
import faiss
import numpy as np
import os
from flask import Flask, request, jsonify

# Set your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

# Function to divide data into chunks
def divide_into_chunks(data, chunk_size=100):
    chunks = []
    for i in range(0, len(data), chunk_size): 
        chunk = data[i:i + chunk_size] 
        chunks.append(chunk)
    return chunks

# Function to get embeddings from OpenAI
def get_embeddings(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )
    return response['data'][0]['embedding']

# Function to retrieve relevant chunks
def retrieve_chunks(query, top_k=5):
    query_embedding = np.array([get_embeddings(query)]).astype('float32')
    distances, indices = index.search(query_embedding, top_k)
    return [chunks[i] for i in indices[0]]

# Function to generate a response using OpenAI
def generate_response(query):
    relevant_chunks = retrieve_chunks(query)
    context = ' '.join([chunk['content'] for chunk in relevant_chunks])
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=f"Context: {context}\n\nQuestion: {query}\nAnswer:",
        max_tokens=150
    )
    return response['choices'][0]['text']

# Load your data from JSON
with open('output.json', 'r') as f:
    data = json.load(f)

# Divide data into chunks
chunks = divide_into_chunks(data)

# Generate embeddings for each chunk
embeddings = [get_embeddings(chunk['content']) for chunk in chunks]

# Initialize FAISS index
d = len(embeddings[0])  # Dimension of the embeddings
index = faiss.IndexFlatL2(d)

# Convert embeddings to numpy array
embedding_matrix = np.array(embeddings).astype('float32')

# Add embeddings to FAISS index
index.add(embedding_matrix)

# Flask app for the chatbot
app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    user_query = request.json.get('query')
    response = generate_response(user_query)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
