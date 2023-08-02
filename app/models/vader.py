# analysis.py
from nltk.sentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    # Initialize the VADER sentiment analyzer
    sia = SentimentIntensityAnalyzer()

    # Calculate sentiment scores
    sentiment_score = sia.polarity_scores(text)['compound']

    # Classify sentiment
    if sentiment_score >= 0.05:
        sentiment = "positive"
    elif sentiment_score <= -0.05:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return sentiment, sentiment_score