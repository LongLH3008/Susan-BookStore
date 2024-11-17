import { bankingPayment, checkBankingSuccess, createOrder } from "@/services/checkout.service";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastVariant } from "../interfaces/toast";
import { useToast } from "./useToast";

type usePayment = {
    action: "COD" | "BANKING" | "VERIFY_PAYMENT";
    onSuccess?: (data?: any) => void;
    onError?: (error?: any) => void;
};

export const usePayment = ({ action, onSuccess, onError }: usePayment) => {
    const nav = useNavigate();
    const { toast } = useToast();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (args: any) => {
            try {
                let response;
                switch (action) {
                    case 'COD':
                        response = await createOrder(args);
                        break;
                    case 'BANKING':
                        response = await bankingPayment(args);
                        break;
                    case 'VERIFY_PAYMENT':
                        response = await checkBankingSuccess(args);
                        break;
                    default:
                        break;
                }
                return response;
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (response: any) => {
            onSuccess && onSuccess()
            if (action == 'COD') {
                toast({ variant: ToastVariant.SUCCESS, content: 'Thanh toán thành công' });
                nav(`/thanh-toan-thanh-cong/${response.metadata.trackingNumber}`);
            }
            if (action == 'BANKING') {
                window.location.href = `${response.metadata}`;
            }
        },
        onError: (error: any) => {
            onError && onError()
            console.log(error)
            toast({ variant: ToastVariant.ERROR, content: 'Thanh toán thât bại' });
        },
    });

    const onSubmit: SubmitHandler<any> = async (args: any) => {
        mutate(args);
    };

    return { onSubmit, ...rest };
};
