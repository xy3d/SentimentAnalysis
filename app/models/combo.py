# analysis.py
from transformers import pipeline

# Load the sentiment analysis pipelines for different models
model1_pipeline = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")
model2_pipeline = pipeline("text-classification", model="distilbert-base-uncased")

def analyze_sentiment(text):
    # Get sentiment predictions from both models
    result1 = model1_pipeline(text)[0]
    result2 = model2_pipeline(text)[0]

    # Combine the sentiment scores from both models
    combined_score = (result1['score'] + result2['score']) / 2

    # Classify sentiment based on the combined score
    if combined_score > 0.5:
        sentiment = "positive"
    elif combined_score < 0.5:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return sentiment, combined_score
