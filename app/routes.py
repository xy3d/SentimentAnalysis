# routes.py
from flask import request, jsonify
from . import app
from .db import reviews_collection
from .analysis import analyze_sentiment

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

    # Perform sentiment analysis using the imported analyze_sentiment function
    sentiment, sentiment_score = analyze_sentiment(review_text)

    # Update the "sentiment" and "sentiment_score" columns for the inserted review
    reviews_collection.update_one(
        {"_id": inserted_review.inserted_id},
        {"$set": {"sentiment": sentiment, "sentiment_score": sentiment_score}}
    )

    # Return the inserted review ID
    return jsonify({"message": "Review saved successfully.", "reviewId": str(inserted_review.inserted_id)})
