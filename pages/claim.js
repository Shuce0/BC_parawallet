import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ClaimPage = () => {
  const router = useRouter();
  const { wallet_id } = router.query;
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (wallet_id) {
      // Gửi yêu cầu tới API của bạn để xác nhận ví và thực hiện claim
      claimWallet(wallet_id);
    }
  }, [wallet_id]);

  const claimWallet = async (wallet_id) => {
    try {
      const response = await fetch(`/api/claim?wallet_id=${wallet_id}`);
      const data = await response.json();
      setStatus(data.message || "Error claiming wallet");
    } catch (error) {
      setStatus("Failed to claim wallet");
    }
  };

  return (
    <div>
      <h1>Claim Your Wallet</h1>
      {status ? <p>{status}</p> : <p>Claiming your wallet...</p>}
    </div>
  );
};

export default ClaimPage;
