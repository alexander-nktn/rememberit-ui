import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { User, useUpdateUserMutation, useDeleteUserMutation } from '../../gql/graphql';
import { useUser } from '../../contexts/UserContext';
import ConfirmationPopup from '../../components/confirmationPopup/ConfirmationPopup';

type ProfileFormValues = {
  email: string;
  firstName: string;
  lastName: string;
};

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser, loading } = useUser();
  const [updateUserMutation] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  const [values, setValues] = useState<ProfileFormValues>({
    email: '',
    firstName: '',
    lastName: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        email: user.email || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    if (!user) {
      setError('User not found.');
      setIsSubmitting(false);
      return;
    }

    try {
      const { data } = await updateUserMutation({
        variables: {
          input: {
            id: user.id,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
      });

      if (data?.updateUser) {
        setSuccessMessage('Profile updated successfully.');
        setUser(data.updateUser as User);
      } else {
        setError('Invalid response from server.');
      }
    } catch (err: unknown) {
      console.error('Update failed:', err);
      setError((err as { message: string })?.message || 'Update failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProfile = () => {
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!user) return;

    try {
      await deleteUserMutation({
        variables: { id: user.id },
      });

      localStorage.removeItem('authToken');
      setUser(null);
      navigate('/login');
    } catch (err: unknown) {
      console.error('Delete failed:', err);
      setError('Failed to delete the profile. Please try again.');
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <form className="profile-form" onSubmit={handleSubmit}>
        <h2>Profile</h2>
        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

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
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>
        <button type="submit" className="profile-button" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={handleDeleteProfile}
          disabled={isSubmitting}
        >
          Delete Profile
        </button>
      </form>

      {isDeletePopupOpen && (
        <ConfirmationPopup
          message="Are you sure you want to delete your profile? This action cannot be undone."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Profile;
