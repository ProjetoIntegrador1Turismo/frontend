import { auth } from '@/auth';
import InterestPointEditForm, {
  InterestPointData
} from '@/components/admin-panel/InterestPointEditForm';

const InterestPointEditPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const response = await fetch(`http://localhost:8081/interestpoint/${params.id}`, {
    headers: { Authorization: `Bearer ${session?.user.authToken}` }
  });
  const interestPointData = (await response.json()) as InterestPointData;

  return (
    <div>
      <InterestPointEditForm InterestPoint={interestPointData} />
    </div>
  );
};

export default InterestPointEditPage;
