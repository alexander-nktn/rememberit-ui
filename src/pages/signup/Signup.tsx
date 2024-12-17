import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import { useSignUpMutation } from '../../gql/graphql.ts';

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
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
    setValues({ ...values, [e.target.name]: e.target.value });
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
        variables: { input: { firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password } },
      });

      if (data?.signUp) {
        // localStorage.setItem('authToken', data.signup.token);
        console.log('Signup successful');
        navigate('/login'); // Redirect to Login page after successful signup
      } else {
        setError('Invalid response from server.');
      }
    } catch (err: unknown) {
      console.error('Signup failed:', err);
      setError((err as { message: string } )?.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="name">First name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Last name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            placeholder="Confirm your password"
          />
        </div>
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

export default Signup;
