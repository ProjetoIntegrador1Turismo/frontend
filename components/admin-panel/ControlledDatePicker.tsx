import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

interface ControlledDatePickerProps {
  control: any;
  disabled?: boolean;
  label: string;
}

const ControlledDatePicker = ({ control, label, disabled }: ControlledDatePickerProps) => {
  return (
    <FormField
      control={control}
      name='date'
      render={({ field }) => (
        <FormItem className='flex flex-col gap-[10px]'>
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  disabled={disabled}
                  className={cn(
                    'w-[240px] pl-3 text-left font-normal shadow-md shadow-gray-400 border border-black',
                    !field.value && 'text-muted-foreground'
                  )}
                >
                  {field.value ? format(field.value, 'PPP') : <span>Selecione uma data</span>}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0 shadow-md shadow-gray-400 border border-black'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date < new Date('1900-01-01')}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledDatePicker;
