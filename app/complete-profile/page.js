'use client';
import useAuth from '../hooks/useAuth';
import CompleteProfile from '../components/CompleteProfile';

export default function CompleteProfilePage() {
  const { user, loading } = useAuth();

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!user) {
    window.location.href = '/'; // هدایت به صفحه اصلی یا ورود
    return null;
  }

  return <CompleteProfile user={user} />;
}
