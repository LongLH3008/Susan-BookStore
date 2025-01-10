import { ICMT } from "@/common/interfaces/comment";
import { SendRequest } from "@/config";

export const getCMTById = async (_id: string) => {
  console.log("_id", _id);
  return await SendRequest("GET", `blog/commentblog/${_id}`);
};

export const deleteCMT = async (idBlog: string, idComment: string) => {
  return await SendRequest(
    "DELETE",
    `blog/deletecommentBlog/${idBlog}/${idComment}`
  );
};

export const createCMT = async (idBlog: string, cmt: ICMT) => {
  const response = await SendRequest("POST", `blog/addcomment/${idBlog}`, cmt);
  return response;
};

export const updateCMT = async (
  idBlog: string,
  idComment: string,
  cmt: ICMT
) => {
  const response = await SendRequest(
    "PUT",
    `blog/updatecommentBlog/${idBlog}/${idComment}`,
    cmt
  );
  return response;
};

export const likeComment = async (
  idBlog: string,
  idComment: string,
  cmt: ICMT
) => {
  const response = await SendRequest(
    "POST",
    `blog/likecomment/${idBlog}/${idComment}`,
    cmt
  );
  return response;
};
