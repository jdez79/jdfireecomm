import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, deleteUser } from "firebase/auth";
import { Form, Button, Alert } from 'react-bootstrap';
import "../styles/auth-styles.css";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email] = useState(user?.email || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!user) {
      setError('User not found');
      return;
    }

    setLoading(true);
    try {
      await updateProfile(user, {
        displayName: displayName,
      });
      setSuccess('Profile updated successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    setError('');
    setSuccess('');

    if (!user) {
      setError('User not found');
      return;
    }

    setLoading(true);
    try {
      await deleteUser(user);
      setSuccess('Account deleted successfully');
    } catch (error: any) {
      setError(error.message || 'Failed to delete account. You may need to re-login first.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <h1>Profile</h1>
      
      {success && <p className="success">{success}</p>}
      {error && <p className="danger">{error}</p>}

      <Form onSubmit={handleUpdateProfile}>
        <Form.Group className="mb-3">
          <Form.Label>Display Name</Form.Label>
          <Form.Control
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter your name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            disabled
            placeholder="Email"
          />
          <Form.Text className="text-muted">
            Email cannot be changed
          </Form.Text>
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading}
          className="w-100 mb-3"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </Button>
      </Form>

      <hr className="my-4" />

      <div className="text-center">
        <h5 className="mb-3">Danger Zone</h5>
        <Button 
          variant="danger"
          onClick={handleDeleteAccount}
          className="deleteAccountButton"
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete Account'}
        </Button>
      </div>
    </div>
  );
};

export default Profile;