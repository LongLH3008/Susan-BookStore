export const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating); // Số ngôi sao vàng đầy đủ
  const hasHalfStar = rating % 1 >= 0.3 && rating % 1 <= 0.7; // Kiểm tra xem có sao rưỡi không

  // Tạo mảng để hiển thị các ngôi sao
  const stars = [];

  // Thêm ngôi sao đầy đủ
  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i key={i} className="fa-solid fa-star text-amber-400 ps-1 text-xs"></i>
    );
  }

  // Thêm ngôi sao rưỡi nếu có
  if (hasHalfStar) {
    stars.push(
      <i className="fa-solid fa-star-half-stroke text-amber-400 text-xs"></i>
    );
  }

  return <div>{stars}</div>;
};
