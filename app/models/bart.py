from transformers import BartTokenizer, BartForConditionalGeneration
from textblob import TextBlob

# Load the summarization model
summarization_model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
summarization_tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")

def summarize_text(text, max_length=150):
    inputs = summarization_tokenizer.encode("summarize: " + text, return_tensors="pt", max_length=max_length, truncation=True)
    summary_ids = summarization_model.generate(inputs, max_length=50, min_length=20, length_penalty=2.0, num_beams=4, early_stopping=True)
    summary = summarization_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    return summary

def analyze_sentiment(text):
    # Summarize the text to reduce complexity
    summarized_text = summarize_text(text)

    # If the summarization fails to produce a summary (e.g., very short input), use the original text
    summarized_text = summarized_text if summarized_text else text

    # Perform sentiment analysis on the summarized text
    blob = TextBlob(summarized_text)
    sentiment_score = blob.sentiment.polarity

    # Classify sentiment
    if sentiment_score > 0:
        sentiment = "positive"
    elif sentiment_score < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    return sentiment, sentiment_score
