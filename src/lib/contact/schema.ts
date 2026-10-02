/** Contact form — fields and required flags mirror the original site's WPForms form (#256). */
export type ContactMessage = {
  firstName: string;
  lastName: string;
  email: string;
  /** TODO(client): the original label was garbled ("or Comment Email"); shown as "Subject". */
  subject: string;
  message: string;
};

export type ContactField = keyof ContactMessage;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const emptyContactMessage = (): ContactMessage => ({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

export const contactRequired: ContactField[] = ["firstName", "lastName", "email"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  for (const k of contactRequired) if (!v[k].trim()) errors[k] = "This field is required.";
  if (!errors.email && !EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  if (v.message.length > 5000) errors.message = "Please keep your message under 5,000 characters.";
  return errors;
}
