import { getAuthToken } from '@/api/service';
import { CategoriesParams } from '@/schemas';
import axios from 'axios';
import { redirect } from 'next/navigation';

// const apiTypeMap: Record<string, string> = {
//   event: 'EVENT',
//   experience: 'EXPERIENCE',
//   touristpoint: 'TOURIST_POINT',
//   hotel: 'HOTEL',
//   restaurant: 'RESTAURANT'
// };

const CategoryPage = async ({
  params,
  searchParams
}: {
  params: { type: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const validatedParam = CategoriesParams.safeParse(params.type);

  if (!validatedParam.success) {
    redirect('/');
  }

  const { data: InterestPointData } = await axios.get<[]>(
    `http://localhost:8081/interestpoint/event?page=${}&size=${}`,
    {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`
      }
    }
  );

  const page = searchParams['page'] ?? '1';
  const perpage = '5';
  const start = (Number(page) - 1) * Number(perpage);
  const end = start + Number(perpage);

  return (
    <div className='h-fit flex gap-8 flex-col mb-12'>
      <pre>{JSON.stringify(InterestPointData.slice(start, end), null, 2)}</pre>
    </div>
  );
};

export default CategoryPage;
