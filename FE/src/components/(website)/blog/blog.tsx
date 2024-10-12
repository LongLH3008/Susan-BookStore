import { IBlog } from "@/common/interfaces/blog";
import { FormatDate } from "@/components/formatDate";
import { getUsers } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = { dataBlog: IBlog };

const Blog = ({ dataBlog }: Props) => {
  const [author, setAuthor] = useState<IUser | null>(null);
  const { data: user, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
  useEffect(() => {
    if (user?.metadata?.allUsers && dataBlog?.blog_author) {
      const filteredAuthor = user.metadata.allUsers.find(
        (u: IUser) => u._id === dataBlog.blog_author
      );
      setAuthor(filteredAuthor);
    }
  }, [user?.metadata, dataBlog?.blog_author]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="relative flex flex-col justify-between h-[425px]">
      <div className="flex justify-center items-center overflow-hidden h-[222px]">
        <img src={dataBlog?.blog_image} alt="" className="w-full h-full" />
        {/* Time  */}
        <span className="absolute top-[6%] left-[6%] rounded-full w-[70px] h-[70px] bg-white flex flex-col justify-center items-center">
          <p className="text-[#929292] font-[500]">Jan</p>
          <p className="text-xl text-zinc-700 font-bold">25</p>
        </span>
      </div>
      <div className="flex flex-col justify-between h-[182px]">
        <Link
          to={"/tin-tuc/" + dataBlog?.blog_slug}
          state={{ from: location.pathname }}
          className="hover:text-[#00BFC5] text-zinc-700 font-semibold text-[18px]"
        >
          {dataBlog?.blog_title}
        </Link>
        <p className="text-[#9d9d9d] text-[14px]">
          <span className="text-[#333]">{FormatDate(dataBlog?.createdAt)}</span>{" "}
          _ by: <span>{author?.user_name}</span>
        </p>
        <p className="text-[#707070] text-[14px] truncate ">
          {dataBlog?.blog_content}
        </p>
        <Link
          to={"/tin-tuc/" + dataBlog?.blog_slug}
          state={{ from: location.pathname }}
          className="hover:text-[#00BFC5] text-zinc-700 font-[500] text-[14px] w-fit border-b-2 py-1"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default Blog;
