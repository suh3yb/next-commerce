import { useState, useEffect } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import {
  Header,
  Accordion,
  Icon,
  Button,
  Form,
  Message,
} from 'semantic-ui-react';
import catchErrors from '../../utils/catchErrors';
import baseUrl from '../../utils/baseUrl';

const INITIAL_FORM = { currentPassword: '', newPassword: '', newPassword2: '' };

const AccountSettings = ({ _id }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const isFormComplete = Object.values(form).every(elem => Boolean(elem));
    setDisabled(!isFormComplete);

    let timeoutSuccess;
    let timeoutError;
    if (success) {
      timeoutSuccess = setTimeout(() => setSuccess(false), 3000);
    }
    if (error) {
      timeoutError = setTimeout(() => setError(false), 3000);
    }
    return () => {
      clearTimeout(timeoutSuccess);
      clearTimeout(timeoutError);
    };
  }, [form, success, error]);

  const handleChange = event => {
    const { name, value } = event.target;
    setForm(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const passwordsMatch = form.newPassword === form.newPassword2;
      if (!passwordsMatch) {
        return setError('Passwords do not match');
      }
      const token = cookie.get('token');
      const url = `${baseUrl}/api/account`;
      const headers = { headers: { Authorization: token } };
      const payload = {
        passwords: {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
      };
      const response = await axios.put(url, payload, headers);
      setSuccess(response.data);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setForm(INITIAL_FORM);
    }
  };

  const panels = [
    {
      key: 'change password',
      title: {
        content: (
          <Header as="h3" floated="left">
            <Icon name="lock" />
            Change Password
          </Header>
        ),
      },
      content: {
        content: (
          <Form
            error={Boolean(error)}
            success={Boolean(success)}
            loading={loading}
            onSubmit={handleSubmit}
          >
            <Message error header="Oops!" content={error} />
            <Message success header="Success!" content={success} />
            <Form.Input
              label="Current Password"
              placeholder="Current Password"
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
            />
            <Form.Input
              label="New Password"
              placeholder="New Password"
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
            />
            <Form.Input
              label="Confirm New Password"
              placeholder="Confirm New Password"
              type="password"
              name="newPassword2"
              value={form.newPassword2}
              onChange={handleChange}
            />
            <Button
              disabled={disabled || loading}
              type="submit"
              color="teal"
              content="Submit"
            />
          </Form>
        ),
      },
    },
  ];

  return (
    <>
      <Header as="h2">
        <Icon name="settings" />
        Settings
      </Header>
      <Accordion fluid styled exclusive={false} panels={panels} />
    </>
  );
};

export default AccountSettings;
