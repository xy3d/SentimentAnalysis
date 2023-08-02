import React, { useState } from "react";
import { TextField, Button, Box, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Grid, Snackbar } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Rating } from "@mui/material";
import useReviewState from "../state/useReviewState";
import api from "../service/api";
import { handleSubmitReview } from "../utils/reviewUtils";
import "../styles/reviewFormStyles.css";

const ReviewFormComponent = () => {
  const { reviewText, setReviewText, rating, setRating, userName, setUserName } = useReviewState();
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      await handleSubmitReview(api, values);
      setLoading(false);
      resetForm();
      setDialogMessage("Review submitted successfully!");
      setAlertSeverity("success");
      setDialogOpen(true);
    } catch (error) {
      setLoading(false);
      setDialogMessage("Failed to submit review. Please try again.");
      setAlertSeverity("error");
      setDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    if (alertSeverity === "success") {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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

              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography component="legend">Rating:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Rating
                    name="rating"
                    value={values.rating}
                    onChange={(event, newValue) => {
                      handleChange(event);
                      setRating(newValue);
                    }}
                  />
                </Grid>
              </Grid>

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

              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                Submit Review
              </Button>

              {loading && <CircularProgress />}
            </Form>
          )}
        </Formik>
      </Box>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogMessage}</DialogTitle>
        <DialogContent>
          <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar} message={dialogMessage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReviewFormComponent;
