# analysis.py
from transformers import pipeline, AutoModelForSeq2SeqLM, AutoTokenizer

# Load the sentiment analysis pipeline with the twitter-roberta-base-sentiment model
sentiment_pipeline = pipeline("text-classification", model="cardiffnlp/twitter-roberta-base-sentiment")

# Load the summarization model and tokenizer
summarization_model = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn")
summarization_tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")

def summarize_text(text, max_length=100):
    inputs = summarization_tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=max_length, truncation=True)
    summary_ids = summarization_model.generate(inputs, max_length=max_length, min_length=max_length // 2, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = summarization_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def analyze_sentiment(text, max_length=100):
    # Summarize the long sentence
    summarized_text = summarize_text(text, max_length=max_length)

    # Get sentiment prediction from the pipeline
    result = sentiment_pipeline(summarized_text)[0]

    # Classify sentiment
    label = result['label']
    if label == 'LABEL_0':
        sentiment = "negative"
    elif label == 'LABEL_1':
        sentiment = "neutral"
    else:
        sentiment = "positive"

    # The confidence score indicates the model's confidence in the prediction
    confidence = result['score']

    return sentiment, confidence
