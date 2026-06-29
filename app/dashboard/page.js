'use client';

import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import Dashboard from '../components/Dashboard';
import api from '../services/api';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user) {
        setTransactions([]);
        setTransactionsLoading(false);
        return;
      }

      try {
        const response = await api.get('/payment/my-orders');
        setTransactions(response.data.orders || []);
      } catch (error) {
        console.error('خطا در دریافت تراکنش‌ها:', error);
        setTransactions([]);
      } finally {
        setTransactionsLoading(false);
      }
    };

    if (user) {
      fetchTransactions();
    }
  }, [user]);

  if (loading) {
    return <p className="text-center mt-10">در حال بارگذاری اطلاعات کاربر...</p>;
  }

  if (!user) {
    return (
      <p className="text-center text-2xl mt-10">
        برای مشاهده داشبورد، لطفاً وارد حساب کاربری شوید.
      </p>
    );
  }

  if (transactionsLoading) {
    return <p className="text-center mt-10">در حال بارگذاری تراکنش‌ها...</p>;
  }

  return (
    <Dashboard
      user={user}
      isSubscribed={true}
      transactions={transactions}
    />
  );
}
