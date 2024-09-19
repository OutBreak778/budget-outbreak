import {create} from "zustand"

type NewACategorytate = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useNewCategory = create<NewACategorytate>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}))