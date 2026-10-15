
import { useState } from "react";
import "./FeedbackForm.css";

export default function FeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [submittedName, setSubmittedName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      newErrors.email = "Enter a valid email address";
    }

    if (!rating) {
      newErrors.rating = "Please select a rating";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedName(name.trim());
    } else {
      setSubmittedName("");
    }
  }

  return (
    <main className="feedback-page">
      <section className="feedback-wrapper">
        <div className="feedback-icon">⭐</div>

        <h1>Course Feedback Form</h1>
        <p className="subtitle">
          Your feedback helps us improve and create a better
          learning experience.
        </p>

        <form className="feedback-card" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name-input"> Name <span>*</span></label>
            <input
              id="name-input"
              data-testid="name-input"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSubmittedName("");
              }}
            />
            {errors.name && (
              <p className="error" data-testid="name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email-input"> Email <span>*</span></label>
            <input
              id="email-input"
              data-testid="email-input"
              type="text"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmittedName("");
              }}
            />
            {errors.email && (
              <p className="error" data-testid="email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rating-select"> Rating <span>*</span></label>
            <select
              id="rating-select"
              data-testid="rating-select"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
                setSubmittedName("");
              }}
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            {errors.rating && (
              <p className="error" data-testid="rating-error">
                {errors.rating}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="comment-input">Comment</label>
            <textarea
              id="comment-input"
              data-testid="comment-input"
              placeholder="Tell us about your experience..."
              value={comment}
              maxLength={200}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className="comment-count" data-testid="comment-count">
              {comment.length}/200
            </p>
          </div>

          <button type="submit" data-testid="submit-btn">
            Submit Feedback →
          </button>

          {submittedName && (
            <p className="success" data-testid="success-msg" role="status">
              ✓ Thank you, {submittedName}! Feedback submitted.
            </p>
          )}
        </form>

        <p className="footer-text">Made for a better learning experience 💜</p>
      </section>
    </main>
  );
}
