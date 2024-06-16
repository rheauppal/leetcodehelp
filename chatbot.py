from openai import OpenAI
client = OpenAI()


assistant = client.beta.assistants.create(
  name="Math Tutor",
  instructions=".",
  tools=[{"type": "code_interpreter"}],
  model="gpt-4o",
)


thread = client.beta.threads.create()

message = client.beta.threads.messages.create(
  thread_id=thread.id,
  role="user",
  content=""
)

