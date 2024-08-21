// pages/[type]/page.tsx

import { getAuthToken } from '@/api/service';
import { CategoriesParams } from '@/schemas';
import axios from 'axios';
import { redirect } from 'next/navigation';
import PaginationControls from '@/components/categories/PaginationControls';
import SearchBar from '@/components/categories/SearchBar';
import InterestPointCard from '@/components/categories/InterestPointCard';

const apiTypeMap: Record<string, string> = {
  event: 'events',
  experience: 'experiences',
  touristpoint: 'tourist-points',
  hotel: 'hotels',
  restaurant: 'restaurants',
  itinerary: 'itineraries'
};

const headerTypeMap: Record<string, string> = {
  event: 'Eventos',
  experience: 'Experiências',
  touristpoint: 'Pontos Turísticos',
  hotel: 'Hóteis',
  restaurant: 'Restaurantes',
  itinerary: 'Roteiros'
};

export default async function CategoryPage({
  params,
  searchParams
}: {
  params: { type: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const validatedParam = CategoriesParams.safeParse(params.type);

  if (!validatedParam.success) {
    redirect('/');
  }
  const query = searchParams['query'] ?? ' ';

  const page = searchParams['page']
    ? Number(searchParams['page']) === 0
      ? Number(searchParams['page']) + 1
      : Number(searchParams['page']) - 1
    : 0;
  const size = 10;

  const { data: InterestPointData } = await axios.get(
    `http://localhost:8081/paginated/${apiTypeMap[validatedParam.data]}?page=${page}&size=${size}&query=${query}`,
    {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`
      }
    }
  );

  const { content, totalPages, number, first, last } = InterestPointData;

  return (
    <div className='h-[75vh] flex flex-col gap-8 mb-12'>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-5xl font-bold'>{headerTypeMap[validatedParam.data]}</h1>
          <p>
            Encontre os melhores {headerTypeMap[validatedParam.data].toLowerCase()} em Foz do
            Iguaçu!
          </p>
        </div>
        <SearchBar route={validatedParam.data} />
      </div>
      <div className='grid grid-cols-5 grid-rows-2 gap-4'>
          {content.map((item: any) => (
            <InterestPointCard
              type={validatedParam.data === 'itinerary' ? 'itinerary' : 'tour'}
              id={item.id}
              key={item.id}
              name={validatedParam.data === 'itinerary' ? item.title : item.name}
              imageCoverUrl={item.imageCoverUrl}
              shortDescription={item.shortDescription}
            />
          ))}
      </div>
      <div className='self-end'>
        <PaginationControls
          query={query}
          currentPage={number + 1}
          totalPages={totalPages}
          hasPreviousPage={!first}
          hasNextPage={!last}
        />
      </div>
    </div>
  );
}
