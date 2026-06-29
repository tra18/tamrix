export async function submitQuoteRequest(payload: unknown): Promise<{ id: string }> {
  const res = await fetch("/api/quotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`quote_submit_${res.status}`);
  }

  return res.json();
}

export async function submitOrderRequest(payload: unknown): Promise<{ id: string }> {
  const res = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`order_submit_${res.status}`);
  }

  return res.json();
}
