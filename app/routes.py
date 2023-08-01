# routes.py
from flask import request, jsonify
from textblob import TextBlob
from . import app
from .db import reviews_collection

@app.route("/api/reviews", methods=["POST"])
def save_review():
    data = request.get_json()
    review_text = data["reviewText"]
    rating = data["rating"]
    user_name = data["userName"]

    # Save the review in MongoDB
    review_data = {
        "reviewText": review_text,
        "rating": rating,
        "userName": user_name
    }
    inserted_review = reviews_collection.insert_one(review_data)

    # Perform sentiment analysis using TextBlob
    blob = TextBlob(review_text)
    sentiment_score = blob.sentiment.polarity

    # Classify sentiment
    if sentiment_score > 0:
        sentiment = "positive"
    elif sentiment_score < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # Update the "sentiment" and "sentiment_score" columns for the inserted review
    reviews_collection.update_one(
        {"_id": inserted_review.inserted_id},
        {"$set": {"sentiment": sentiment, "sentiment_score": sentiment_score}}
    )

    # Return the inserted review ID
    return jsonify({"message": "Review saved successfully.", "reviewId": str(inserted_review.inserted_id)})
