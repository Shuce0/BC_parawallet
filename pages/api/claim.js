export default async function handler(req, res) {
  const { wallet_id } = req.query;

  if (!wallet_id) {
    return res.status(400).json({ message: "Wallet ID is required" });
  }

  // Gọi API của Para để claim ví
  try {
    const response = await fetch(`https://api.getpara.com/v1/wallet/${wallet_id}/claim`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer 87efcb06b5c9758c587c343eb2fe0281` // Thay thế YOUR_PARA_API_KEY bằng API Key của bạn
      },
    });

    if (response.ok) {
      return res.status(200).json({ message: "Wallet claimed successfully!" });
    } else {
      return res.status(500).json({ message: "Error claiming wallet" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error claiming wallet" });
  }
}
