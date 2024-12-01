import { useToast } from "@/common/hooks/useToast";
import { ToastVariant } from "@/common/interfaces/toast";
import { contactSchema } from "@/common/schemas/contact";
import CustomFloatingField from "@/components/(website)/floatingfield/CustomFloatingField";
import { sendContactFromUser } from "@/services/contact.service";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";

type Props = {
	full_name: string;
	email: string;
	subject: string;
	content: string;
};

const FormContact = (props: Props) => {
	const { toast } = useToast();

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		getValues,
	} = useForm<Props>({
		resolver: joiResolver(contactSchema),
	});

	const submit = async () => {
		const res = await sendContactFromUser(getValues());
		console.log(res);
		if (!res) return;
		toast({
			variant: ToastVariant.SUCCESS,
			content: "Gửi thành công, chúng tôi sẽ sớm phản hồi với bạn",
		});
		reset();
	};

	return (
		<>
			<div className="lg:col-span-7 md:col-span-12">
				<form onSubmit={handleSubmit(submit)}>
					<div className="space-y-12">
						<div className="border-b border-gray-900/10 flex flex-col gap-7 pb-12">
							<h2 className="font-semibold text-3xl pb-5">Liên hệ với chúng tôi</h2>
							<CustomFloatingField
								field="full_name"
								label="Tên của bạn"
								register={register}
								floating
								rounded
								error={errors.full_name}
								message={errors.full_name?.message}
							/>
							<CustomFloatingField
								field="email"
								label="Email"
								register={register}
								floating
								rounded
								error={errors.email}
								message={errors.email?.message}
							/>
							<CustomFloatingField
								field="subject"
								label="Tiêu đề"
								register={register}
								floating
								rounded
								error={errors.subject}
								message={errors.subject?.message}
							/>
							<div className="flex flex-col gap-1">
								<label htmlFor="" className="text-[16px]">
									Nội dung
								</label>
								<textarea
									{...register("content")}
									className="h-[20dvh] overflow-y-scroll focus:ring-0 border-zinc-300 rounded-md"
								></textarea>
								{errors.content && (
									<span className="text-red-500 text-sm">
										{errors.content?.message}
									</span>
								)}
							</div>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-start gap-x-6">
						<button
							type="submit"
							className=" bg-black px-3 py-2 text-sm text-white shadow-sm hover:bg-[#00BFC5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00BFC5] mb-10"
						>
							GỬI
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default FormContact;
