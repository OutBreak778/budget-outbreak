import React from 'react'
import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type AccountColumnProps = {
    account: string 
    accountId: string
}

const AccountColumn: React.FC<AccountColumnProps> = ({account,accountId}) => {

    const {onOpen: onOpenAccount} = useOpenAccount()
    const onClick = () => {
        onOpenAccount(accountId)
    }
  return (
    <div onClick={onClick} className='flex items-center cursor-pointer hover:underline'>
        {account}
    </div>
  )
}

export default AccountColumn