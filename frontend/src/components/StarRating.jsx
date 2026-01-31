const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-sm ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
      >
        ★
      </span>
    ))}
  </div>
);

export default StarRating;
