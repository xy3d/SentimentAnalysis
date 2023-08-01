import { useState } from "react";

const useReviewState = () => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [userName, setUserName] = useState("");

  return { reviewText, setReviewText, rating, setRating, userName, setUserName };
};

export default useReviewState;
