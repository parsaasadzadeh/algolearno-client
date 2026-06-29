"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// کامپوننت داخلی که لاجیک و UI را مدیریت می‌کند
function VerifyPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const success = searchParams.get("success");
  const message = searchParams.get("message");
  const courseSlug = searchParams.get("courseSlug");
  const refId = searchParams.get("refId");

  useEffect(() => {
    if (success === "true" && courseSlug) {
      const timer = setTimeout(() => {
        router.push(`/courses/${courseSlug}`);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, courseSlug, router]);

  const isSuccess = success === "true";

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div
          style={{
            ...styles.icon,
            backgroundColor: isSuccess ? "#16a34a" : "#dc2626",
          }}
        >
          {isSuccess ? "✓" : "✕"}
        </div>

        <h1 style={styles.title}>
          {isSuccess ? "پرداخت با موفقیت انجام شد" : "پرداخت ناموفق بود"}
        </h1>

        <p style={styles.text}>
          {isSuccess
            ? "تراکنش شما با موفقیت ثبت و تایید شد."
            : message || "در فرآیند پرداخت مشکلی رخ داده است."}
        </p>

        {isSuccess && refId && (
          <p style={styles.refId}>
            کد پیگیری: <strong>{refId}</strong>
          </p>
        )}

        {isSuccess && courseSlug ? (
          <button
            style={styles.button}
            onClick={() => router.push(`/courses/${courseSlug}`)}
          >
            ورود به دوره
          </button>
        ) : (
          <button style={styles.button} onClick={() => router.push("/")}>
            بازگشت به صفحه اصلی
          </button>
        )}
      </div>
    </div>
  );
}

// صفحه اصلی که کامپوننت داخلی را با Suspense رندر می‌کند
export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={
      <div style={styles.wrapper}>
        <p>در حال بررسی وضعیت پرداخت...</p>
      </div>
    }>
      <VerifyPaymentContent />
    </Suspense>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f3f4f6",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "#fff",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    padding: "40px 30px",
    textAlign: "center",
  },
  icon: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "42px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  title: {
    fontSize: "28px",
    marginBottom: "15px",
    color: "#111827",
  },
  text: {
    fontSize: "16px",
    color: "#4b5563",
    marginBottom: "20px",
    lineHeight: "1.8",
  },
  refId: {
    fontSize: "15px",
    color: "#1f2937",
    marginBottom: "25px",
  },
  button: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "12px 24px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
