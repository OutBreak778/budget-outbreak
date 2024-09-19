import React from 'react'
import { SelectSingleEventHandler } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import {format} from "date-fns"

type DatePickerProps = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, disabled }) => {
  return (
    <div>
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" disabled={disabled} className={cn('w-full justify-start text-left font-normal', !value && "text-muted-foreground")}>
                    <CalendarIcon className='size-5 mr-2' />
                    {
                        value ? format(value, "PPP") : <span>Pick a date</span>
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar mode='single' selected={value} onSelect={onChange} disabled={disabled} initialFocus/>
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default DatePicker