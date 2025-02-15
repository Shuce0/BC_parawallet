"use client"; // Bắt buộc để dùng useState & useEffect trong App Router

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ClaimPage() {
  const searchParams = useSearchParams();
  const wallet_id = searchParams.get("wallet_id");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (wallet_id) {
      claimWallet(wallet_id);
    }
  }, [wallet_id]);

  const claimWallet = async (wallet_id: string) => {
    try {
      const response = await fetch(`/api/claim?wallet_id=${wallet_id}`);
      const data = await response.json();
      setStatus(data.message || "Error claiming wallet");
    } catch (error) {
      setStatus("Failed to claim wallet");
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">Claim Your Wallet</h1>
      {status ? <p className="text-green-500">{status}</p> : <p>Claiming your wallet...</p>}
    </div>
  );
}
