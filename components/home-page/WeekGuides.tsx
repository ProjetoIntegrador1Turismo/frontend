import { WeekGuidesProps } from '@/lib/interfaces';
import GuideCard from './GuideCard';

const WeekGuides = ({ guides }: WeekGuidesProps) => {
  return (
    <div className='flex flex-col gap-4 items-center'>
      <h1 className='text-3xl font-extralight'>Guias da Semana</h1>
      {guides.map((guide, i) => {
        return <GuideCard guide={guide} key={i} />;
      })}
    </div>
  );
};

export default WeekGuides;
