import { Link } from "react-router-dom";
import PageLayout from "@/layouts/DashboardLayout";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
const BlogPage = () => {
	const { register, handleSubmit, setValue } = useForm();
	const [showModal, setShowModal] = useState(false);

	return (
		<PageLayout>
			<div className="px-10 sm:ml-64 h-[100vh]">
				<div className="flex flex-col items-center justify-center h-48 rounded bg-gray-50 dark:bg-gray-800">
					<p className="text-2xl font-bold text-gray-800 dark:text-gray-50">Blog Page DashBoard</p>
				</div>
				<form className="max-w-sm mx-auto mb-4 w-100">
					<div className="mb-5">
						<label
							htmlFor="title"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Title
						</label>
						<input
							{...register("title")} // Đăng ký input với react-hook-form
							type="text"
							id="title"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Title"
							required
						/>
					</div>

					<div className="mb-5 w-full border-b-2 border-gray-900 py-4">
						<label
							htmlFor="title"
							className="block  mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Title
						</label>
						<button
							onClick={() => setShowModal(!showModal)}
							data-modal-target="default-modal"
							data-modal-toggle="default-modal"
							className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							type="button"
						>
							Show editor
						</button>
						<div
							id="default-modal"
							tabIndex={-1}
							className={` ${
								showModal ? "" : "hidden"
							} overflow-y-auto overflow-x-hidden fixed mt-[10%] ml-[35%] top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
						>
							<div className="relative p-4 w-full max-w-2xl max-h-full">
								<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
									<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
										<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
											Contents
										</h3>
										<button
											onClick={() => setShowModal(!showModal)}
											type="button"
											className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
											data-modal-hide="default-modal"
										>
											<svg
												className="w-3 h-3"
												aria-hidden="true"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 14 14"
											>
												<path
													stroke="currentColor"
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
												/>
											</svg>
											<span className="sr-only">Close modal</span>
										</button>
									</div>
									<div className="p-4 md:p-5 space-y-4">
										<CKEditor
											editor={ClassicEditor}
											data="<p>Hello from CKEditor&nbsp;5!</p>"
											onReady={(editor) => {
												// You can store the "editor" and use when it is needed.
												console.log("Editor is ready to use!", editor);
											}}
											onChange={(event) => {
												console.log(event);
											}}
											onBlur={(event, editor) => {
												console.log("Blur.", editor);
											}}
											onFocus={(event, editor) => {
												console.log("Focus.", editor);
											}}
											config={{
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
												],
												table: {
													contentToolbar: [
														"tableColumn",
														"tableRow",
														"mergeTableCells",
													],
												},
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Create blog
					</button>
					<Link
						to={"/"}
						className="mx-4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
					>
						Preview
					</Link>
				</form>
			</div>
		</PageLayout>
	);
};

export default BlogPage;
