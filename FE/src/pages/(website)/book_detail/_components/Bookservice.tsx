import { useToast } from "@/common/hooks/useToast";
import { IProduct } from "@/common/interfaces/product";
import { IReview } from "@/common/interfaces/review";
import { Authentication } from "@/common/shared/authentication";
import Comment from "@/components/(website)/comment/comment";
import { createReview, getReviewByIdBook } from "@/services/review.service";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Rating,
  Skeleton,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

interface NotiLogin {
  open: any;
  handleClose: any;
}

const ModalLogin = ({ open, handleClose }: NotiLogin) => {
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="p-16" id="alert-dialog-title">
          {"Vui lòng Đăng nhập trước khi đánh giá sản phẩm :3"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogActions>
          <Button onClick={handleClose} className="text-red-700">
            Thoát
          </Button>
          <Button>
            <Link to={"/dang-nhap"}>Đăng nhập</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const Bookservice = ({ detailProduct }: { detailProduct: IProduct }) => {
  const [tab, setTab] = useState<string>("Description");
  const [rating, setRating] = useState<number>(3);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const payload = Authentication();

  const [writeReview, setWriteReview] = useState<boolean>(false);
  const [review, setReview] = useState<string>("");
  const {
    data: reviewIdBook,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["review"],
    queryFn: () => getReviewByIdBook(detailProduct?._id),
  });
  const { toast } = useToast();
  const handleClose = () => {
    setOpenModal(false);
  };
  const { mutate } = useMutation({
    mutationFn: ({
      bookId,
      newReview,
    }: {
      bookId: string;
      newReview: IReview;
    }) => createReview(bookId, newReview),
    onSuccess: (data: any) => {
      // navigate(-1);
      toast({
        variant: data.status,
        content: `Thêm đánh giá thành công`,
      });
      refetch();
      setRating(3);
      setReview("");
    },
    onError: (err: any) => {
      const messages = `Lỗi khi thêm đánh giá: `;
      toast({
        variant: err.status,
        content: messages + (err.response?.data || err.message),
      });
    },
  });
  // Hàm xử lý khi form được submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!payload) {
      setOpenModal(true);
    } else {
      const newReview = {
        userId: payload.id,
        rating: rating,
        comment: review,
      };
      const bookId = detailProduct?._id;
      console.log("bookId", bookId);

      mutate({ bookId, newReview });
    }

    // console.log("Review submitted:", review);
  };
  // console.log("rating", rating);

  return (
    <>
      <ModalLogin open={openModal} handleClose={handleClose} />
      <hr className="w-full h-[1px] mx-auto my-10 bg-gray-400 border-0 rounded md:my-10"></hr>
      <div className="my-24">
        <div className=" flex justify-center">
          <button
            onClick={() => setTab("Description")}
            className={`${
              tab == "Description" ? "text-gray-900" : "text-gray-300"
            } font-bold  text-xl px-4 hover:text-gray-900`}
          >
            Mô Tả
          </button>
          <button
            onClick={() => setTab("Reviews")}
            className={`${
              tab == "Reviews" ? "text-gray-900" : "text-gray-300"
            } font-bold  text-xl px-4 hover:text-gray-900`}
          >
            Đánh giá
          </button>
        </div>
        <div className=" my-14">
          {/* Description */}
          <div
            className={`${
              tab !== "Description" ? "hidden" : ""
            } text-[#646464] leading-loose `}
          >
            <p
              className={`${
                !isExpanded && "overflow-hidden text-ellipsis line-clamp-4"
              }`}
            >
              {detailProduct?.description}
            </p>
            <span
              onClick={() => setIsExpanded(true)}
              className={`${
                isExpanded ? "hidden" : ""
              } font-bold hover:underline cursor-pointer`}
            >
              Xem thêm
            </span>
            <span
              onClick={() => setIsExpanded(false)}
              className={`${
                !isExpanded ? "hidden" : ""
              } font-bold hover:underline cursor-pointer`}
            >
              Thu gọn
            </span>
          </div>
          {/* Reviews */}
          <div className={`${tab !== "Reviews" ? "hidden" : ""}`}>
            <h2 className="text-center text-black text-2xl font-semibold">
              Đánh giá của khách hàng
            </h2>
            <div className="flex justify-center divide-x divide-yellow-300 my-8">
              <div className="mx-10">
                <div className="flex *:mr-2 *:text-yellow-300 *:text-xl ">
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                  <i className="fa-regular fa-star " />
                </div>
                <p>Hãy là người đầu tiên viết đánh giá</p>
              </div>
              <div className="">
                <button
                  onClick={() => {
                    setWriteReview(!writeReview);
                  }}
                  className="py-3 px-16 mx-10 bg-yellow-300 text-white font-bold hover:opacity-80"
                >
                  {writeReview ? "Hủy đánh giá" : "Viết đánh giá"}
                </button>
              </div>
            </div>
            <div
              className={`${
                writeReview ? "" : "hidden"
              } *:text-[#646464] *:text-center`}
            >
              <hr className="w-full h-[1px] mx-auto my-10 bg-yellow-300 border-0 rounded md:my-10 "></hr>
              <h2 className=" text-black text-2xl font-bold">Viết đánh giá</h2>
              <div className="text-center">
                <p className="my-3">Đánh giá</p>
                <Rating
                  name="simple-controlled"
                  value={rating}
                  onChange={(
                    event: SyntheticEvent<Element, Event>,
                    newValue: number | null
                  ) => {
                    setRating(newValue);
                  }}
                />
              </div>
              <form onSubmit={handleSubmit} className="w-2/4 m-auto  my-4">
                <div className="*:my-4">
                  <label htmlFor="review">Đánh giá(150)</label>
                  <textarea
                    name=""
                    id="review"
                    className="w-full h-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:border-yellow-300 focus:ring-yellow-300"
                    placeholder="Viết đánh giá tại đây ..."
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex justify-center *:mx-2 my-6">
                  <button
                    type="reset"
                    className="px-8 py-2 border-[3px] text-[17px] font-bold text-yellow-300 border-yellow-300 hover:opacity-80 "
                  >
                    Hủy đánh giá
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 border text-[17px] font-bold text-white bg-yellow-300 hover:opacity-80 "
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </form>
            </div>
            <hr className="w-full h-[1px] mx-auto my-10 bg-yellow-300 border-0 rounded md:my-10 "></hr>

            {/* Bài review */}
            {!isLoading ? (
              <div className="">
                <form className="max-w-[170px] my-5">
                  <select
                    id="countries"
                    className=" border-0 text-gray-900 text-sm rounded-lg focus:ring-yellow-300 focus:border-yellow-300 block w-full p-2 "
                  >
                    <option selected>Gần đây nhất</option>
                    <option value="highest-rating">Xếp hạng cao nhất</option>
                    <option value="lowest-rating">Xếp hạng thấp nhất</option>
                  </select>
                </form>
                <div className="max-h-[400px] overflow-y-scroll">
                  <h4 className="text-xl font-semibold mb-5">
                    {reviewIdBook?.metadata?.totalReviews} Bình Luận
                  </h4>
                  {reviewIdBook?.metadata?.reviews.length === 0 ? (
                    <p>Chưa có đánh giá nào :3</p>
                  ) : (
                    <Comment reviews={reviewIdBook?.metadata?.reviews} />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex ">
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={60}
                  height={60}
                />
                <div className="ms-3">
                  <Skeleton
                    animation="wave"
                    height={20}
                    width={100}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton
                    animation="wave"
                    height={20}
                    width={200}
                    style={{ marginBottom: 6 }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookservice;
