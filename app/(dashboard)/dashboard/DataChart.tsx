"use client"

import { useGetSummary } from '@/features/summary/api/useGetSummary'
import React from 'react'
import ChartComponent, { ChartLoading } from './ChartComponent'
import PieComponent, { PieChartLoading } from './PieComponent'

const DataChart = () => {
    const {data,isLoading} = useGetSummary()

    if(isLoading) {
        return (
            <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
            <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <PieChartLoading  />

        </div>
    </div>
        )
    }
  return (
    <div className='grid grid-cols-1 lg:grid-cols-6 gap-8'>
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
            <ChartComponent data={data?.days} />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <PieComponent data={data?.categories} />

        </div>
    </div>
  )
}

export default DataChart