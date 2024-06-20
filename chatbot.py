import os
import openai
import faiss
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.chat_models import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.llms import OpenAI
import numpy as np
import json

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key from the environment variable
openai.api_key = os.getenv('OPENAI_API_KEY')

class Chatbot:
    def __init__(self):
        # initialization constructor 
        self.api_key = openai.api_key
        self.embeddings_model = OpenAIEmbeddings(api_key=self.api_key)
        self.index = None
        self.memory = ConversationBufferMemory()
    
    def load_file(self, file_path):
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"The file {file_path} does not exist.")
        
        with open(file_path, 'r') as file:
            content = json.load(file)
        return content
    
    # can try multiple splits- going w recursive char splitter/ could try recursive json splitter
    # html split, code split 
    def text_split(self, text, chunk_size=100, chunk_overlap=20):
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size, chunk_overlap=chunk_overlap,
        length_function=len, is_separator_regex=False,)
        chunks = text_splitter.split_text(text)
        return chunks

    def create_embeddings(self, chunks):
        embeddings = self.embeddings_model.embed_documents(chunks)
        return embeddings
    
    # write know we are using faiss syncrhonously meaning - that no other task can happen right now 
    # creates an index with embeddings 
    # faiss allows for easy search, retrieval of the nearest neighbors, L2 Euclidean dist metric 
    # faiss expects a numpy array 
    def create_faiss_index(self, embeddings):
        embeddings = np.array(embeddings).astype('float32')
        dimension = len(embeddings[0])
        self.index = faiss.IndexFlatL2(dimension)
        self.index.add(embeddings)

    # searches for index with the most similar embeddings to a given query 
    # returns distance to the top k most similar queries 
    # I should create a context variable instead???
    def search_faiss_index(self, query, k=5):
        query_embedding = np.array(self.embeddings_model.embed_query(query)).reshape(1, -1).astype('float32') # creates query embedding
        distances, indices = self.index.search(query_embedding, k)
        return distances, indices


    # create a prompt template 
    def generate_prompt(self, context, query):
        chatbot_template = """
        You are a helpful assistant. Answer the question based on the following context:
        Context: {context}
        Question: {query}
        Answer:
        """
        
        prompt_template = PromptTemplate(
            input_variables=["context", "query"],
            template=chatbot_template
        )
        
        return prompt_template
        # llm = OpenAI(api_key=openai.api_key, model='gpt-3.5-turbo-instruct', temperature=0.7)
        # llm_chain = LLMChain(llm=llm, prompt=prompt_template)
        # return llm_chain.run(prompt)


    def get_openai_response(self, prompt_template, context, query):
        llm = OpenAI(api_key=openai.api_key, model='gpt-3.5-turbo-instruct', temperature=0.7)
        llm_chain = LLMChain(llm=llm, prompt=prompt_template)

        # Generate response using the LLMChain
        response = llm_chain.invoke({'context': context, 'query': query})
        return response

    def chat(self, query):
        distances, indices = self.search_faiss_index(user_query)
        context_chunks = [self.chunks[idx] for idx in indices[0]]
        context = " ".join(context_chunks)
        
        # Generate the prompt using the context and the user's query
        prompt = self.generate_prompt(context, user_query)
        
        # Get the response from OpenAI
        response = self.get_openai_response(prompt, context, query)
        return response

if __name__ == "__main__":
    chatbot = Chatbot()
    json_content = chatbot.load_file('sample_data.json')
    json_text = json.dumps(json_content, indent=2)
    
    chunks = chatbot.text_split(json_text)
    chatbot.chunks = chunks
    embeddings = chatbot.create_embeddings(chunks)
    chatbot.create_faiss_index(embeddings)
    
    user_query = "What is chapter 2 about?"
    response = chatbot.chat(user_query)
    print("Chatbot Response:")
    print(response)

