import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["all-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.accounts["all-delete"]["$post"]>["json"]

export const useBulkDeleteAccount = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts["all-delete"]["$post"]({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Account deleted")
            queryClient.invalidateQueries({queryKey: ["accounts"]})
            // TODO invalidate summary
        },
        onError: () => {
            toast.error("Failed to deleted account")
        }
    })
    return mutation
}