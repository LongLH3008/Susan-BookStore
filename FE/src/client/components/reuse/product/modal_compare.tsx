import * as img from "@/assets/img";
import { Link } from "react-router-dom";
import { Modal } from "flowbite-react";
import { CustomModalCompare } from "@/client/themes/CustomModalCompare";
import useProductContext from "../../context/ContextProduct";

type Props = {};

const DetailCompareImg = () => {
	return (
		<td>
			<div className="flex flex-col justify-center items-center gap-4">
				<div className="w-[120px] h-[120px] overflow-hidden flex justify-center items-center">
					<img src={img.demo} alt="" />
				</div>
				<p>
					{/* status */}
					<span className="font-semibold text-red-700 mr-2">On sale</span>
					<span className="text-red-500">$ Price</span>
				</p>
				<Link to="/" className="hover:text-red-600 uppercase">
					View product
				</Link>
			</div>
		</td>
	);
};

const ModalCompare = (props: Props) => {
	const { compare, compareModal, featuresProduct } = useProductContext();

	const openCompare = () => {
		compareModal.open();
		featuresProduct.close();
	};

	return (
		<>
			<button className="max-[500px]:hidden" onClick={openCompare}>
				<i className="hover:text-[#00BFC5] fa-solid fa-sliders"></i>
			</button>
			<Modal theme={CustomModalCompare} show={compare} onClose={() => compareModal.close()}>
				<Modal.Header />
				<Modal.Body>
					<table className="w-full mt-5 text-[14px] text-zinc-700 text-center">
						<tbody>
							<tr className="*:p-[12px] border *:border-x">
								<th scope="col" className="w-[20%]">
									Action
								</th>
								<td>
									<i className="fa-solid fa-xmark"></i>
								</td>
								<td>
									<i className="fa-solid fa-xmark"></i>
								</td>
							</tr>
							<tr className="*:p-[12px] border *:border-x">
								<th scope="col" className="">
									<div className="flex justify-center items-start h-full">Product name</div>{" "}
								</th>
								<td>555 77 854</td>
								<td>555 77 854</td>
							</tr>
							<tr className="*:p-[12px] border *:border-x">
								<th scope="col" className="h-[227px]">
									<div className="flex justify-center items-start h-full">Product image</div>
								</th>
								<DetailCompareImg />
								<DetailCompareImg />
							</tr>
							<tr className="*:p-[12px] border *:border-x">
								<th scope="col" className="h-[100px]">
									<div className="flex justify-center items-start h-full">Product description</div>{" "}
								</th>
								<td>
									As opposed to using 'Content here, content here', making it look like readable
									English. Many desktop publishing packages and web page editors now use Lorem Ipsum
									as their default model text, and a search for 'lorem ipsum' will uncover many...
								</td>
								<td>
									As opposed to using 'Content here, content here', making it look like readable
									English. Many desktop publishing packages and web page editors now use Lorem Ipsum
									as their default model text, and a search for 'lorem ipsum' will uncover many...
								</td>
							</tr>
							<tr className="*:p-[12px] border *:border-x">
								<th scope="col" className="uppercase">
									availability
								</th>
								<td>Available In stock</td>
								<td>Available In stock</td>
							</tr>
						</tbody>
					</table>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalCompare;
