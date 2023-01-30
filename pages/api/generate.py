import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Prompt: Create a weekly nutritional plan for the given medical conditions along with the nutritional benefits of each food. Base it off food from the given country\nCondition: Thyroidectomy\nCountry: Nigeria\nPlan:",
  temperature=0.79,
  max_tokens=668,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)
