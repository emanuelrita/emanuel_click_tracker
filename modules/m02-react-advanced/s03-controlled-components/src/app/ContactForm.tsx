"use client";
import { useState, ChangeEvent, SyntheticEvent } from "react";
import styles from "./ContactForm.module.css";

interface FormState {
  name: string;
  email: string;
  message: string;
}

function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isEmailValid = form.email.includes("@");
  const isFormValid =
    form.name.trim() !== "" &&
    form.email.trim() !== "" &&
    form.message.trim() !== "" &&
    isEmailValid;

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      console.log("Form submitted:", form);
      setSubmitSuccess(true);

      // Reset form after successful submission
      setForm({ name: "", email: "", message: "" });

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      {submitSuccess && (
        <div className={styles.successMessage}>
          ✓ Message sent successfully!
        </div>
      )}

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          type="text"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your email"
          type="email"
        />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your message"
          rows={5}
        />
        <button type="submit" disabled={!isFormValid}>
          Send
        </button>
      </form>

      <div className={styles.formPreview}>
        <h2>Live Preview</h2>
        <div className={styles.previewContent}>
          <div>
            <strong>Name:</strong> {form.name || "(empty)"}
          </div>
          <div>
            <strong>Email:</strong> {form.email || "(empty)"}
            {form.email && !isEmailValid && (
              <span className={styles.invalidEmail}> (invalid)</span>
            )}
          </div>
          <div>
            <strong>Message:</strong> {form.message || "(empty)"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
