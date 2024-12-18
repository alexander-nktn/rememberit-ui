import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignUpMutation } from '../../gql/graphql';
import './Signup.css';

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup: React.FC = () => {
  const [values, setValues] = useState<SignupFormValues>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [signUpMutation] = useSignUpMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { data } = await signUpMutation({
        variables: {
          input: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          },
        },
      });

      if (data?.signUp) {
        console.log('Signup successful');
        navigate('/login');
      } else {
        setError('Error during signup. Please try again.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signup failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <InputField label="First Name" name="firstName" value={values.firstName} onChange={handleChange} />
        <InputField label="Last Name" name="lastName" value={values.lastName} onChange={handleChange} />
        <InputField label="Email" type="email" name="email" value={values.email} onChange={handleChange} />
        <InputField label="Password" type="password" name="password" value={values.password} onChange={handleChange} />
        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit" className="signup-button" disabled={isSubmitting}>
          {isSubmitting ? 'Signing up...' : 'Sign Up'}
        </button>
        <div className="redirect-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', name, value, onChange }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}:</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default Signup;
