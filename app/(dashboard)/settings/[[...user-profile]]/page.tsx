import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserProfile } from '@clerk/nextjs'
import React from 'react'

const page = () => {
  return (
    <div className="max-w-screen-2xl mx-auto  w-full pb-10 -mt-24">
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="gap-y-3 lg:flex-row lg:items-start lg:justify-between">
        <CardTitle className="text-xl line-clamp-1">Settings page</CardTitle>
      </CardHeader>
      <CardContent className='flex items-center justify-center mt-12'>
        <UserProfile />
      </CardContent>
    </Card>
  </div>
  )
}

export default page