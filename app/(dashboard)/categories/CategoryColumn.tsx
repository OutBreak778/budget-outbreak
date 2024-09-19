import { useOpenCategory } from '@/features/categories/hooks/useOpenCategory'
import { useOpenTransactions } from '@/features/transactions/hooks/useOpenTransactions'
import { cn } from '@/lib/utils'
import { TriangleAlertIcon } from 'lucide-react'
import React from 'react'

type CategoryColumnProps = {
  id: string
    category: string | null 
    categoryId: string | null
}

const CategoryColumn: React.FC<CategoryColumnProps> = ({id, category, categoryId}) => {

    const {onOpen: onOpenCategory} = useOpenCategory()
    const {onOpen: onOpenTransaction} = useOpenTransactions()
    const onClick = () => {
      if(categoryId) {
        onOpenCategory(categoryId)
      } else{
        onOpenTransaction(id)
      }
    }
  return (
    <div onClick={onClick} className={cn('flex items-center cursor-pointer hover:underline', !category && "text-rose-500")}>
        {!category && <TriangleAlertIcon className={cn('mr-2 shrink-0 size-4')} />}
        {category || "Uncategorized"}
    </div>
  )
}

export default CategoryColumn