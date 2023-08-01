export const handleSubmitReview = async (api, { reviewText, rating, userName }) => {
    try {
      // Make a POST request to your Flask API with the custom Axios instance
      const response = await api.post("/api/reviews", {
        reviewText,
        rating,
        userName,
      });
      console.log("Review saved successfully. Review ID:", response.data.reviewId);
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };
  