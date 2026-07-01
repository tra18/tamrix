"use client";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import { useRef } from "react";

interface TurnstileWidgetProps {
  siteKey: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  className?: string;
}

export function TurnstileWidget({
  siteKey,
  onToken,
  onExpire,
  className,
}: TurnstileWidgetProps) {
  const ref = useRef<TurnstileInstance>(null);

  return (
    <div className={className}>
      <Turnstile
        ref={ref}
        siteKey={siteKey}
        onSuccess={onToken}
        onExpire={() => {
          ref.current?.reset();
          onExpire?.();
        }}
        options={{ theme: "dark", size: "flexible" }}
      />
    </div>
  );
}
