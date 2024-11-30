import { Link } from "react-router-dom";
import { IBlog } from "@/common/interfaces/blog";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/auth.service";
import { FormatDate } from "@/components/formatDate";

const BlogItem = ({ dataBlog }: { dataBlog: IBlog | null }) => {
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
    <>
      <div className=" border border-[#efefef] p-7">
        <h2 className="text-3xl font-semibold text-[#292929] text-center my-7">
          {dataBlog?.blog_title}
        </h2>
        <div className="flex divide-x divide-gray-400 *:px-5 justify-center mb-9">
          <p className="text-[#999999]">
            <i className="fa-solid fa-circle-user mr-2"></i>
            Tác giả :{" "}
            <span className="text-[#707070]">{author?.user_name}</span>
          </p>
          <p className="text-[#999999]">
            <i className="fa-regular fa-calendar-days mr-2"></i>
            Ngày đăng :{" "}
            <span className="text-[#333333]">
              {FormatDate(dataBlog?.createdAt)}
            </span>
          </p>
        </div>
        <img
          src={dataBlog?.blog_image}
          alt=""
          className="w-full object-cover h-[40vh] mb-10"
        />
        <div
          className="*:mt-10 *:text-[#707070]"
          dangerouslySetInnerHTML={{ __html: dataBlog?.blog_content }}
        />
        <div
          id="tags "
          className="my-7 border-t-2 border-b-2 py-2 border-[#e0e0e0]"
        >
          <p className="flex items-end text-[#999999] text-[17px] ">
            Thẻ sách :
            {Array.isArray(dataBlog?.blog_tags)
              ? dataBlog?.blog_tags?.map((tag, index) => (
                  <span key={index}>
                    <span className="italic hover:text-[#00BFC5] text-gray-900 text-[13px] ms-1">
                      {tag}
                    </span>
                    {index < dataBlog.blog_tags.length - 1 && ", "}
                  </span>
                ))
              : dataBlog?.blog_tags}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogItem;
