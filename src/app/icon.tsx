import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#050A0F",
          borderRadius: 6,
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6h16v3H4V6z"
            fill="#70D1FF"
          />
          <path
            d="M10 9v12M6 9v8l-2 2M14 9v12M18 9v6l2 2"
            stroke="#70D1FF"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="4" cy="19" r="1.5" fill="#70D1FF" />
          <circle cx="20" cy="17" r="1.5" fill="#70D1FF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
