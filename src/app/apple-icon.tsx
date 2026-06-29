import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 32,
        }}
      >
        <svg
          width="100"
          height="100"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M4 6h16v3H4V6z" fill="#70D1FF" />
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
