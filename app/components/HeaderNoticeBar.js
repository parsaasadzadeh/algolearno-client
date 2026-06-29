export default function HeaderNoticeBar({
  badge = "اطلاعیه",
  text = "درگاه پرداخت فعال نمی‌باشد. به‌زودی فعال خواهد شد.",
  linkText = "",
  linkHref = "#",
}) {
  return (
    <div className="assvhja-wrap">
      <div className="assvhja-glow"></div>

      <div className="assvhja-stars">
        <span className="assvhja-star assvhja-star-1">✦</span>
        <span className="assvhja-star assvhja-star-2">✦</span>
        <span className="assvhja-star assvhja-star-3">✦</span>
        <span className="assvhja-star assvhja-star-4">✦</span>
      </div>

      <div className="assvhja-track">
        <div className="assvhja-content">
          <span className="assvhja-badge">{badge}</span>
          <span className="assvhja-text">{text}</span>
          {/* <a href={linkHref} className="assvhja-link">
            {linkText}
          </a> */}
        </div>
      </div>

      <style jsx>{`
        .assvhja-wrap {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin: 0;
          top: 0;
          background: linear-gradient(90deg, #071a3d 0%, #0b2558 50%, #071a3d 100%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 24px rgba(3, 10, 30, 0.18);
          z-index: 30;
        }

        .assvhja-track {
          position: relative;
          z-index: 2;
          padding: 12px 20px;
        }

        .assvhja-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
          text-align: center;
        }

        .assvhja-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3px;
          backdrop-filter: blur(6px);
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
          animation: assvhjaPulse 2.8s ease-in-out infinite;
        }

        .assvhja-text {
          color: #eef4ff;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.8;
        }

        .assvhja-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 14px;
          border-radius: 10px;
          background: #ffffff;
          color: #0a214f;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          box-shadow: 0 6px 18px rgba(255, 255, 255, 0.18);
        }

        .assvhja-link:hover {
          transform: translateY(-2px);
          background: #f2f6ff;
          box-shadow: 0 10px 22px rgba(255, 255, 255, 0.24);
        }

        .assvhja-glow {
          position: absolute;
          inset: auto;
          top: 50%;
          left: -10%;
          width: 180px;
          height: 180px;
          transform: translateY(-50%);
          background: radial-gradient(circle, rgba(109, 164, 255, 0.28) 0%, rgba(109, 164, 255, 0) 70%);
          animation: assvhjaMoveGlow 8s linear infinite;
          pointer-events: none;
        }

        .assvhja-stars {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .assvhja-star {
          position: absolute;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.35);
          animation: assvhjaTwinkle 2.4s ease-in-out infinite;
        }

        .assvhja-star-1 {
          top: 10px;
          right: 8%;
          animation-delay: 0s;
        }

        .assvhja-star-2 {
          top: 50%;
          right: 18%;
          animation-delay: 0.6s;
        }

        .assvhja-star-3 {
          top: 14px;
          left: 12%;
          animation-delay: 1.2s;
        }

        .assvhja-star-4 {
          bottom: 8px;
          left: 22%;
          animation-delay: 1.8s;
        }

        @keyframes assvhjaTwinkle {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.35) rotate(12deg);
          }
        }

        @keyframes assvhjaPulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08), 0 0 0 rgba(255, 255, 255, 0);
          }
          50% {
            transform: scale(1.04);
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14), 0 0 18px rgba(255, 255, 255, 0.08);
          }
        }

        @keyframes assvhjaMoveGlow {
          0% {
            left: -10%;
          }
          100% {
            left: 110%;
          }
        }

        @media (max-width: 768px) {
          .assvhja-track {
            padding: 10px 14px;
          }

          .assvhja-content {
            gap: 10px;
          }

          .assvhja-badge {
            font-size: 12px;
            padding: 5px 10px;
          }

          .assvhja-text {
            font-size: 13px;
          }

          .assvhja-link {
            font-size: 12px;
            padding: 7px 12px;
          }
        }
      `}</style>
    </div>
  );
}
