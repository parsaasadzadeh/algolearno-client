'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/user/me');
        setUser(response.data.user || response.data);
      } catch (err) {
        console.error('خطا در تایید هویت:', err);
        Cookies.remove('token', { path: '/' });
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
