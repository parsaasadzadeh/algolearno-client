'use client';
import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import api from '../services/api';

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [acceptRules, setAcceptRules] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (phone.length < 11) return alert('شماره معتبر نیست');
    if (!acceptRules) return alert('لطفاً قوانین را بپذیرید');

    setLoading(true);
    try {
      const response = await api.post('/auth/send-otp', { phoneNumber: phone });
      if (response.status === 200) {
        setStep(2);
        setIsTimerActive(true);
        setTimer(120);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'خطا در برقراری ارتباط');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await api.post('/auth/send-otp', { phoneNumber: phone });
      setCode('');
      setTimer(120);
      setIsTimerActive(true);
    } catch (err) {
      alert('خطا در ارسال مجدد کد');
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/verify-otp', {
        phoneNumber: phone,
        code: code
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        Cookies.set('token', token, {
          expires: 30,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        if (!user.isProfileComplete) {
          window.location.href = '/complete-profile';
        } else {
          window.location.href = '/dashboard';
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || 'کد اشتباه است');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-vazir" dir="rtl">
      <div className="w-full max-w-[400px] bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-100 p-8 md:p-10">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <Image src="/img/algolearno.png" alt="vtstorecode" width={120} height={60} priority />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-2xl font-black text-slate-800">خوش آمدید</h1>
          <p className="text-slate-400 text-sm mt-2">
            {step === 1 ? 'برای ورود یا ثبت‌نام شماره خود را وارد کنید' : `کد تایید به شماره ${phone} ارسال شد`}
          </p>
        </div>

        <form onSubmit={step === 1 ? handleSendCode : handleVerify} className="space-y-5">
          <div>
            <label className="block text-slate-700 text-sm font-bold mb-2 mr-1">شماره موبایل</label>
            <input
              type="tel"
              disabled={step === 2 || loading}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="09123456789"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-left dir-ltr focus:ring-2 focus:ring-indigo-500 outline-none transition-all disabled:opacity-50"
              required
            />
          </div>

          {step === 1 && (
            <div className="flex items-start gap-2 text-sm text-slate-600">
              <input
                id="acceptRules"
                type="checkbox"
                checked={acceptRules}
                onChange={(e) => setAcceptRules(e.target.checked)}
                className="mt-1 h-4 w-4 accent-indigo-600"
              />
              <label htmlFor="acceptRules" className="leading-7">
                قوانین و شرایط را می‌پذیرم و{' '}
                <Link href="/rules" className="text-indigo-600 font-bold hover:underline">
                  مطالعه قوانین
                </Link>
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <label className="block text-slate-700 text-sm font-bold mb-2 mr-1">کد تایید</label>
              <input
                type="text"
                disabled={loading}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="- - - - -"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-center tracking-[1rem] font-bold focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                autoFocus
                required
              />
              <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-xs text-slate-400 font-medium">زمان باقی‌مانده: {formatTime(timer)}</span>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="text-xs text-indigo-600 font-bold hover:underline"
                  >
                    ارسال مجدد کد
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (step === 1 && !acceptRules)}
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            {loading ? 'در حال پردازش...' : step === 1 ? 'ارسال کد تایید' : 'تایید و ورود'}
          </button>

          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-slate-400 text-sm font-medium hover:text-slate-600"
            >
              اصلاح شماره موبایل
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
