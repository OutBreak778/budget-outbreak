import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories["all-delete"]["$post"]>
type RequestType = InferRequestType<typeof client.api.categories["all-delete"]["$post"]>["json"]

export const useBulkDeleteCategory = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories["all-delete"]["$post"]({ json })
            return await response.json()
        },
        onSuccess: () => {
            toast.success("Category deleted")
            queryClient.invalidateQueries({queryKey: ["categories"]})
            // TODO invalidate summary
        },
        onError: () => {
            toast.error("Failed to deleted Cateogry")
        }
    })
    return mutation
}