import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface InterestPointTypesProps {
  control: any;
}

const InterestPointTypes = ({ control }: InterestPointTypesProps) => {
  return (
    <FormField
      control={control}
      name='type'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tipo</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shadow-md shadow-gray-400 border border-black w-full'>
                <SelectValue placeholder='Selecione um tipo de atração' />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='border border-black w-full'>
              <SelectItem value='TOURISTPOINT'>Ponto Turistico</SelectItem>
              <SelectItem value='RESTAURANT'>Restaurante</SelectItem>
              <SelectItem value='HOTEL'>Hotel</SelectItem>
              <SelectItem value='EXPERIENCE'>Experiência</SelectItem>
              <SelectItem value='EVENT'>Evento</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InterestPointTypes;
