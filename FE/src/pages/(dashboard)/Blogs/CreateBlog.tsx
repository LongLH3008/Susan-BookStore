import { useToast } from "@/common/hooks/useToast";
import { IBlog } from "@/common/interfaces/blog";
import { BlogValidate } from "@/common/schemas/blog";
import { createBlog, getBlogById, updateBlog } from "@/services/blog";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { MdAdd, MdHorizontalRule } from "react-icons/md";

import { Link, useNavigate, useParams } from "react-router-dom";

interface TypeCKEDITOR {
  toolbar: string[];
  table: { contentToolbar: string[] };
  heading: {
    options: Array<{
      model: string;
      view?: string;
      title: string;
      class: string;
    }>;
  };
}
const CreateBlog = () => {
  const MAX_INPUTS = 5;
  const { id } = useParams<{ id: string }>();

  const { toast } = useToast();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBlog>({
    resolver: joiResolver(BlogValidate),
  });
  const [selectedCoverImage, setSelectedCoverImage] = useState<File | null>(
    null
  );
  const [previewCoverImage, setPreviewCoverImage] = useState<string | null>(
    null
  );

  const [editorData, setEditorData] = useState("");

  const [inputs, setInputs] = useState<string[]>([""]);

  //lấy tin tức theo id

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["BlogId", id],
    queryFn: () => getBlogById(id!),
    enabled: !!id,
  });
  // console.log(blog?.metadata.blog_content);
  useEffect(() => {
    if (blog?.metadata?.blog_content) {
      setEditorData(blog.metadata.blog_content);
    }
    if (blog?.metadata?.blog_image) {
      setPreviewCoverImage(blog.metadata.blog_image);
    }
  }, [blog]);
  //lấy ảnh đại diện
  const handleCoverImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedCoverImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreviewCoverImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  //cấu hình CKEditor
  const configCKEditor: TypeCKEDITOR = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "|",
      "insertTable",
      "tableColumn",
      "tableRow",
      "mergeTableCells",
      "|",
      "undo",
      "redo",
      "|",
      "alignment",
      "fontSize",
      "fontColor",
      "fontBackgroundColor",
      "highlight",
      "codeBlock",
      "|",
      "mediaEmbed",
      "imageUpload",
      "horizontalLine",
      "specialCharacters",
    ],
    image: {
      toolbar: [
        "imageTextAlternative",
        "|",
        "imageStyle:alignLeft",
        "imageStyle:alignCenter",
        "imageStyle:alignRight",
      ],
    },
    simpleUpload: {
      uploadUrl: "http://localhost:5000/api/v1/upload",
    },

    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },
    heading: {
      options: [
        {
          model: "paragraph",
          title: "Paragraph",
          class: "ck-heading_paragraph",
        },
        {
          model: "heading1",
          view: "h1",
          title: "Heading 1",
          class: "ck-heading_heading1",
        },
        {
          model: "heading2",
          view: "h2",
          title: "Heading 2",
          class: "ck-heading_heading2",
        },
        {
          model: "heading3",
          view: "h3",
          title: "Heading 3",
          class: "ck-heading_heading3",
        },
      ],
    },
  };
  //thêm input tag
  const handleAddInput = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputs.length < MAX_INPUTS) {
      setInputs([...inputs, ""]);
    }
  };
  //xóa thẻ
  const handleRemoveInput = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (inputs.length > 1) {
      const newInputs = inputs.filter((_, i) => i !== index);
      setInputs(newInputs);
    }
  };
  //lấy dữ liệu tag
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };
  const handleError = (err: any, action: string) => {
    const messages = `Lỗi khi ${action} sản phẩm: `;
    toast({
      variant: err.status,
      content: messages + (err.response?.data || err.message),
    });
  };

  const { mutateAsync, isPending } = !id
    ? useMutation({
        mutationFn: (data: IBlog) => createBlog(data),
        onSuccess: (data: any) => {
          nav("/quan-tri/tin-tuc");
          toast({
            variant: data.status,
            content: `Thêm tin tức thành công`,
          });
        },
        onError: (err: any) => handleError(err, "Thêm"),
      })
    : useMutation({
        mutationFn: ({ data, id }: { data: IBlog; id: string }) =>
          updateBlog(data, id),
        onSuccess: (data: any) => {
          nav("/quan-tri/tin-tuc");
          toast({
            variant: data.status,
            content: `Cập nhật tin tức thành công`,
          });
        },
        onError: (err: any) => handleError(err, "Cập nhật"),
      });

  const onSubmit: SubmitHandler<IBlog> = async (data: IBlog) => {
    try {
      let coverImageUrl = "";
      data.blog_content = editorData;
      data.blog_tags = inputs;

      if (selectedCoverImage) {
        const coverImageFormData = new FormData();
        coverImageFormData.append("files", selectedCoverImage);

        const coverImageResponse = await axios.post(
          "http://localhost:5000/api/v1/upload",
          coverImageFormData
        );
        coverImageUrl = coverImageResponse.data.metadata.fileLinks[0];
        console.log("coverImageUrl", coverImageUrl);

        data.blog_image = coverImageUrl;
      }
      const updatedData = {
        ...blog?.metadata,
        ...data,
      };

      console.log("updatedData", updatedData);
      id ? await mutateAsync({ data, id }) : await mutateAsync(data);
    } catch (error) {
      toast({
        variant: "error",
        content: `Lỗi khi gửi form: ${error?.message}`,
      });
      console.error("Lỗi khi gửi form:", error);
    }
  };

  return (
    <>
      <div className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg">
        <div className="flex items-center gap-3">
          <i className="fa-solid fa-ticket"></i>
          <h2 className={`text-xl font-[500]`}>
            {!id ? "Thêm" : "Sửa"} tin tức
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to={"/quan-tri/tin-tuc/"}
            type="reset"
            className="size-10 bg-zinc-900 hover:bg-[#00bfc5] grid place-items-center text-white rounded-md text-2xl hover:scale-110 duration-200"
          >
            <FaArrowRightFromBracket />
          </Link>
        </div>
      </div>{" "}
      {/* form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full  grid grid-cols-4 gap-8 mt-[100px]">
          <div className="w-full col-span-3 *:mb-6">
            <div>
              <label
                htmlFor="blog_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tiêu đề :<span className="text-sm text-red-500">*</span>
              </label>

              <input
                type="text"
                id="blog_title"
                className={` ${
                  errors.blog_title && "border-red-700"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                placeholder="John"
                {...register("blog_title")}
                defaultValue={
                  blog?.metadata?.blog_title && blog.metadata.blog_title
                }
              />
              {errors.blog_title && (
                <span className="text-red-700  text-sm ">
                  {errors.blog_title?.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Nội dung :
              </label>

              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={configCKEditor}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEditorData(data);
                }}
              />
            </div>
            <button
              type="submit"
              className="border px-6 py-3 border-gray-500 rounded-lg hover:border-[#00bfc5] hover:text-[#00bfc5] "
            >
              submit
            </button>
            <button
              type="reset"
              className="border px-6 py-3 border-gray-500 rounded-lg hover:border-[#00bfc5] hover:text-[#00bfc5] "
            >
              Reset
            </button>
          </div>
          <div className="col-span-1 *:mb-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="small_size"
              >
                Ảnh bìa :
              </label>
              <input
                accept="image/*"
                onChange={handleCoverImageChange}
                className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                id="small_size"
                type="file"
              />
              {previewCoverImage && (
                <img src={previewCoverImage} alt="Cover Preview" width="200" />
              )}
            </div>
            <div>
              <label
                htmlFor="blog_author"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tên tác giả :<span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                id="blog_author"
                className={`${
                  errors.blog_author && "border-red-700"
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 `}
                placeholder="John"
                defaultValue={
                  blog?.metadata?.blog_author && blog.metadata.blog_author
                }
                {...register("blog_author")}
              />
              {errors.blog_author && (
                <span className="text-red-700 text-sm ">
                  {errors.blog_author?.message}
                </span>
              )}
            </div>
            <div className="w-full flex flex-col  justify-center">
              <label
                htmlFor="blog_tags"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Tên thẻ sách :
              </label>
              <div className="w-full flex items-center ">
                <div className="flex flex-col  justify-center ">
                  {inputs.map((input, index) => (
                    <div className="flex items-center mb-3">
                      <input
                        key={index}
                        defaultValue={input}
                        onChange={(e) => {
                          handleInputChange(index, e);
                        }}
                        type="text"
                        id="blog_tags"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  "
                      />
                      <button
                        className="border hover:border-red-700 hover:text-red-700 text-xl ms-2 p-1 flex justify-center items-center rounded-full "
                        onClick={(e) => handleRemoveInput(index, e)}
                        disabled={inputs.length <= 1}
                      >
                        <MdHorizontalRule />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  className="border p-1 hover:border-[#00bfc5] hover:text-[#00bfc5] flex text-xl justify-center items-center rounded-full ms-4"
                  onClick={(e) => handleAddInput(e)}
                  disabled={inputs.length >= MAX_INPUTS}
                >
                  <MdAdd />
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <style>
        {`
          .ck-editor__editable_inline {
            height: 40vh;
            overflowY : auto ;
          }
        `}
      </style>
    </>
  );
};

export default CreateBlog;
