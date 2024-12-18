import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignInMutation } from '../../gql/graphql';
import './Login.css';
import { useUser } from '../../contexts/UserContext';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [signInMutation] = useSignInMutation();
  const { refetchUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data } = await signInMutation({
        variables: { input: { email: values.email, password: values.password } },
      });

      const accessToken = data?.signIn.accessToken;

      if (accessToken) {
        localStorage.setItem('authToken', accessToken);
        await refetchUser();
        navigate('/cards');
      } else {
        setError('Invalid login credentials.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="Enter your password"
        />
        <button type="submit" className="login-button" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
        <div className="redirect-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </div>
      </form>
    </div>
  );
};

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, disabled, placeholder }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}:</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      placeholder={placeholder}
    />
  </div>
);

export default Login;
