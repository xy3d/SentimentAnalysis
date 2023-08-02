import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Snackbar } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import useReviewState from "../state/useReviewState";
import api from "../service/api";
import { handleSubmitReview } from "../utils/reviewUtils";
import "../styles/reviewFormStyles.css";

const ReviewFormComponent = () => {
  const { reviewText, setReviewText, rating, setRating, userName, setUserName } = useReviewState();
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await handleSubmitReview(api, values);
      resetForm();
      setSubmitStatus("success");
    } catch (error) {
      setSubmitStatus("error");
    }
  };

  const handleCloseSnackbar = () => {
    setSubmitStatus(null);
  };

  const validationSchema = yup.object({
    reviewText: yup.string().required("Review is required").matches(/^[A-Za-z0-9\s.,!?']+$/, "Only text, special characters, and symbols are allowed"),
    rating: yup
      .number()
      .required("Rating is required")
      .typeError("Rating must be a number")
      .integer("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating can't exceed 5"),
    userName: yup.string().required("User Name is required").matches(/^[A-Za-z0-9]+$/, "Only alpha-numeric characters are allowed"),
  });

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} border="1px solid #ccc" borderRadius={8}>
        <Typography variant="h5" gutterBottom>
          Submit a Review
        </Typography>
        <Formik
          initialValues={{ reviewText, rating, userName }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange }) => (
            <Form>
              <Field
                as={TextField}
                label="Review"
                multiline
                fullWidth
                name="reviewText"
                value={values.reviewText}
                onChange={(e) => {
                  handleChange(e);
                  setReviewText(e.target.value);
                }}
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="reviewText" component="div" className="error-message" />

              <Field
                as={TextField}
                label="Rating"
                type="number"
                fullWidth
                name="rating"
                value={values.rating}
                onChange={(e) => {
                  handleChange(e);
                  setRating(e.target.value);
                }}
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="rating" component="div" className="error-message" />

              <Field
                as={TextField}
                label="User Name"
                fullWidth
                name="userName"
                value={values.userName}
                onChange={(e) => {
                  handleChange(e);
                  setUserName(e.target.value);
                }}
                variant="outlined"
                margin="normal"
              />
              <ErrorMessage name="userName" component="div" className="error-message" />

              <Button type="submit" variant="contained" color="primary">
                Submit Review
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Snackbar
        open={submitStatus === "success" || submitStatus === "error"}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={submitStatus === "success" ? "Review submitted successfully!" : "Failed to submit review. Please try again."}
      />
    </Container>
  );
};

export default ReviewFormComponent;
