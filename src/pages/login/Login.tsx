import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import { useSignInMutation } from '../../gql/graphql.ts';

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const [signInMutation] = useSignInMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data } = await signInMutation({
        variables: { input: { email: values.email, password: values.password } },
      });

      if (data?.signIn.accessToken) {
        localStorage.setItem('authToken', data.signIn.accessToken);
        console.log('Login successful');
        navigate('/cards'); // Redirect to Cards page after successful login
      } else {
        setError('Invalid response from server.');
      }
    } catch (err: unknown) {
      console.error('Login failed:', err);
      setError((err as { message : string })?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
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

export default Login;
