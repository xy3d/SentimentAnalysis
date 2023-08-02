from transformers import pipeline

# Load the sentiment analysis pipeline with the twitter-roberta-base-sentiment model
sentiment_pipeline = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")

def analyze_sentiment(text, max_chunk_length=100):
    # Split the text into smaller chunks
    chunks = [text[i:i + max_chunk_length] for i in range(0, len(text), max_chunk_length)]

    # Initialize variables to store sentiment scores and confidence
    sentiment_scores = []
    confidences = []

    # Analyze sentiment for each chunk
    for chunk in chunks:
        result = sentiment_pipeline(chunk)[0]
        sentiment_scores.append(result['label'])
        confidences.append(result['score'])

    # Calculate overall sentiment by combining chunk sentiments
    # We'll consider majority sentiment and use the average confidence score
    positive_count = sentiment_scores.count('LABEL_2')
    negative_count = sentiment_scores.count('LABEL_0')
    neutral_count = sentiment_scores.count('LABEL_1')
    total_chunks = len(sentiment_scores)

    if positive_count > negative_count and positive_count > neutral_count:
        overall_sentiment = "positive"
    elif negative_count > positive_count and negative_count > neutral_count:
        overall_sentiment = "negative"
    else:
        overall_sentiment = "neutral"

    overall_confidence = sum(confidences) / len(confidences)

    return overall_sentiment, overall_confidence
