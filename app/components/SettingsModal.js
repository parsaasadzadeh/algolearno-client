import React, { useEffect } from 'react';

const TransactionsModal = ({ isOpen, onClose, transactions = [] }) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatPrice = (amount) => {
    return Number(amount || 0).toLocaleString('fa-IR');
  };

  const formatDate = (date) => {
    if (!date) return '-';

    return new Date(date).toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusInfo = (status) => {
    const normalized = String(status || '').toLowerCase();

    if (
      normalized === 'success' ||
      normalized === 'paid' ||
      normalized === 'completed' ||
      normalized === 'موفق'
    ) {
      return {
        label: 'موفق',
        className:
          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
      };
    }

    if (
      normalized === 'pending' ||
      normalized === 'waiting' ||
      normalized === 'در انتظار'
    ) {
      return {
        label: 'در انتظار',
        className:
          'bg-amber-500/15 text-amber-400 border border-amber-500/20',
      };
    }

    if (
      normalized === 'failed' ||
      normalized === 'canceled' ||
      normalized === 'cancelled' ||
      normalized === 'ناموفق'
    ) {
      return {
        label: 'ناموفق',
        className:
          'bg-rose-500/15 text-rose-400 border border-rose-500/20',
      };
    }

    return {
      label: status || 'نامشخص',
      className:
        'bg-slate-500/15 text-slate-300 border border-slate-500/20',
    };
  };

  return (
    <div className="fixed inset-0 z-[1000]" dir="rtl">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
        <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0f172a] to-[#020617] text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
          <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4 sm:px-7 sm:py-5">
            <div>
              <h2 className="text-xl font-extrabold text-white sm:text-2xl">
                تراکنش‌های حساب
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                لیست پرداخت‌ها و وضعیت تراکنش‌های شما
              </p>
            </div>

            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-red-500 hover:text-white"
              aria-label="بستن"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6">
            {transactions.length > 0 ? (
              <>
                <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:block">
                  <table className="w-full border-collapse">
                    <thead className="sticky top-0 z-10 bg-[#0f172a] text-right text-sm text-slate-300">
                      <tr>
                        <th className="px-5 py-4 font-semibold">شناسه تراکنش</th>
                        <th className="px-5 py-4 font-semibold">دوره</th>
                        <th className="px-5 py-4 font-semibold">مبلغ</th>
                        <th className="px-5 py-4 font-semibold">وضعیت</th>
                        <th className="px-5 py-4 font-semibold">تاریخ</th>
                      </tr>
                    </thead>

                    <tbody>
                      {transactions.map((tx, index) => {
                        const statusInfo = getStatusInfo(tx.status);

                        return (
                          <tr
                            key={tx._id || index}
                            className="border-t border-white/10 transition hover:bg-white/[0.03]"
                          >
                            <td className="px-5 py-4 text-sm text-slate-300">
                              <span className="inline-block max-w-[220px] truncate rounded-lg bg-white/5 px-3 py-1.5 ltr text-left">
                                {tx.refId || tx.authority || tx._id || '-'}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-sm text-slate-300">
                              {tx.course?.title || '-'}
                            </td>

                            <td className="px-5 py-4 font-bold text-cyan-400">
                              {formatPrice(tx.amount)} تومان
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${statusInfo.className}`}
                              >
                                {statusInfo.label}
                              </span>
                            </td>

                            <td className="px-5 py-4 text-sm text-slate-300">
                              {formatDate(tx.createdAt)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="grid gap-4 md:hidden">
                  {transactions.map((tx, index) => {
                    const statusInfo = getStatusInfo(tx.status);

                    return (
                      <div
                        key={tx._id || index}
                        className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-lg"
                      >
                        <div className="mb-3 flex items-start justify-between gap-3">
                          <div>
                            <p className="mb-1 text-xs text-slate-400">
                              شناسه تراکنش
                            </p>
                            <p className="break-all text-sm text-white">
                              {tx.refId || tx.authority || tx._id || '-'}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${statusInfo.className}`}
                          >
                            {statusInfo.label}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="col-span-2 rounded-xl bg-black/20 p-3">
                            <p className="mb-1 text-xs text-slate-400">دوره</p>
                            <p className="text-slate-200">
                              {tx.course?.title || '-'}
                            </p>
                          </div>

                          <div className="rounded-xl bg-black/20 p-3">
                            <p className="mb-1 text-xs text-slate-400">مبلغ</p>
                            <p className="font-bold text-cyan-400">
                              {formatPrice(tx.amount)} تومان
                            </p>
                          </div>

                          <div className="rounded-xl bg-black/20 p-3">
                            <p className="mb-1 text-xs text-slate-400">تاریخ</p>
                            <p className="text-slate-200">
                              {formatDate(tx.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex min-h-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-3xl">
                  💳
                </div>
                <h3 className="text-lg font-bold text-white">
                  تراکنشی ثبت نشده است
                </h3>
                <p className="mt-2 max-w-md text-sm leading-7 text-slate-400">
                  هنوز هیچ پرداختی برای حساب شما ثبت نشده. بعد از خرید دوره‌ها،
                  تراکنش‌ها در این بخش نمایش داده می‌شوند.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsModal;
