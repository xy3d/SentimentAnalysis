from transformers import pipeline

sentiment_pipeline = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")

def analyze_sentiment(text):
    results = sentiment_pipeline(text)

    sentiment_label = results[0]['label']
    sentiment_score = results[0]['score']

    if sentiment_label == 'LABEL_0':
        sentiment = "negative"
    elif sentiment_label == 'LABEL_1':
        sentiment = "neutral"
    else:
        sentiment = "positive"

    return sentiment, sentiment_score
