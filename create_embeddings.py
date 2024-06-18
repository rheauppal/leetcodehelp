import json
from openai.embeddings_utils import get_embedding
import openai

# Ensure your OpenAI API key is set as an environment variable
openai.api_key = "your_openai_api_key"

def chunk_text(text, chunk_size=2000):
    chunks = []
    for i in range(0, len(text), chunk_size):
        chunks.append(text[i:i + chunk_size])
    return chunks

def create_embeddings(input_file, output_file):
    with open(input_file, 'r') as f:
        all_problems = json.load(f)

    problem_embeddings = []
    for problem in all_problems:
        if 'description' in problem and problem['description']:
            full_text = f"{problem['title']}\n{' '.join(tag['name'] for tag in problem['topicTags'])}\n{problem['description']}"
            chunks = chunk_text(full_text)
            for chunk in chunks:
                embedding = get_embedding(chunk, engine="text-embedding-ada-002")
                problem_embeddings.append({'id': problem['questionFrontendId'], 'embedding': embedding})

    with open(output_file, 'w') as f:
        json.dump(problem_embeddings, f)

create_embeddings('all_problems.json', 'problem_embeddings.json')
