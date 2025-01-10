import { Accordion } from "flowbite-react";

type Props = {};

const ResponsiveCheckoutProducts = (props: Props) => {
	return (
		<div className="min-[320px]:px-[5%] xl:px-[11.5%] 2xl:px-[17.5%] min-[1000px]:hidden bg-zinc-100 border-b px-[21px] py-[17px]">
			<Accordion className="p-0 border-0 ring-0 ring-offset-0 focus:ring-0 focus:border-0">
				<Accordion.Panel className="border-0">
					<Accordion.Title className="text-[14px] text-zinc-800 py-3 px-0 border-0 border-b-zinc-800 ring-0 ring-offset-0 focus:ring-0 focus:border-0">
						Your Order Summary - <span className="font-500">$ 55.00</span>
					</Accordion.Title>
					<Accordion.Content className="p-0 border-0 py-10">
						{/* <ItemInCheckout />
						<ItemInCheckout />
						<ItemInCheckout /> */}
						<div className="w-full mt-10 flex flex-col gap-2 *:flex *:justify-between *:items-center">
							<div className="text-zinc-700 text-[14px] font-[500]">
								<p>Subtotal</p>
								<p>55.00</p>
							</div>
							<div className="text-zinc-700 text-[14px] font-[500]">
								<p>Shipping</p>
								<p>0.17</p>
							</div>
							<div className="text-zinc-700 text-[18px] font-semibold">
								<p>Total</p>
								<p>
									<span className="text-[13px] text-zinc-400 mr-1">USD</span>
									<span>$55.17</span>
								</p>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Panel>
			</Accordion>
		</div>
	);
};

export default ResponsiveCheckoutProducts;
