import { useState } from "react";

const ReviewModal = ({ business, onClose, onSubmit }) => {
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (reviewText.trim()) {
      onSubmit(reviewText);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Write a review for {business.name}</h2>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 h-32"
          placeholder="Your review..."
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
