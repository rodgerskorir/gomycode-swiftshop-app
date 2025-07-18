import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ReceiptData {
  _id: string;
  amount: number;
  paymentMethod: string;
  status: string;
  customerName: string;
  itemsCount: number;
  createdAt: string;
  userId: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
  };
  orderId: any; 
}

const ReceiptDetails = () => {
  const { id } = useParams(); // URL param
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/swiftshop/receipts/${id}`
        );
        const data = await res.json();

        if (data.success) {
          setReceipt(data.data);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError("Something went wrong loading the receipt");
      }
    };

    fetchReceipt();
  }, [id]);

  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!receipt) return <div className="p-4">Loading receipt...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-md bg-white mt-4">
      <h1 className="text-2xl font-bold mb-4">Receipt #{receipt._id}</h1>
      <p>
        <strong>Customer:</strong> {receipt.customerName}
      </p>
      <p>
        <strong>Email:</strong> {receipt.userId.email}
      </p>
      <p>
        <strong>Phone:</strong> {receipt.userId.phone || "N/A"}
      </p>
      <p>
        <strong>Shipping Address:</strong> {receipt.userId.address || "N/A"}
      </p>
      <p>
        <strong>Items Count:</strong> {receipt.itemsCount}
      </p>
      <p>
        <strong>Payment Method:</strong> {receipt.paymentMethod}
      </p>
      <p>
        <strong>Amount:</strong> KES {receipt.amount.toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong>
        <span
          className={`ml-2 px-2 py-1 text-white rounded ${
            receipt.status === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {receipt.status}
        </span>
      </p>
      <p>
        <strong>Date:</strong> {new Date(receipt.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default ReceiptDetails;
