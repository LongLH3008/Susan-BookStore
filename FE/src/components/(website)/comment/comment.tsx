import { IReview } from "@/common/interfaces/review";
import { FormatfullDate } from "@/components/formatDate";
import { getUsers } from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";

const Comment = ({ reviews }: { reviews: IReview[] }) => {
  const {
    data: Users,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const findUserById = (userId: string) => {
    if (!Array.isArray(Users?.metadata?.allUsers)) return null;
    return Users?.metadata?.allUsers.find((user: IUser) => user._id === userId);
  };
  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {reviews.map((review: IReview) => {
        const user = findUserById(review.userId);
        // console.log("user", user);

        return (
          <div key={review?._id} className="flex my-5">
            <img
              src={
                user?.user_avatar ||
                "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
              }
              alt={user?.user_name}
              className="w-12 h-12 rounded-full"
            />

            <div className="ms-7 ">
              <h4 className="text-gray-900 font-bold">{user?.user_name}</h4>
              <p className="text-gray-700 w-[500px]">{review?.comment}</p>
              <span className="text-gray-400 text-sm">
                {FormatfullDate(review?.createdAt)}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comment;
