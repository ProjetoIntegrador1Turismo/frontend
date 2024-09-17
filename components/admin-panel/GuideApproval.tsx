'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Guide } from '@/lib/interfaces';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import SearchBar from '../guide-panel/SearchBar';
import GuideTable from './GuideTable';
import GuidePagination from './GuidePagination';
import { Button } from '../ui/button';
import { Check, CircleXIcon } from 'lucide-react';
import { useToast } from '../ui/use-toast';

// TODO: AJUSTAR PRA VOLTAR PRA PÁGINA ANTERIOR AUTOMATICAMENTE QUANDO A LISTA FICAR VAZIA

interface QueryReturn {
  data: Guide[];
}

const GuideApproval = () => {
  const { data: sessionData } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('inativos');

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const [filteredInactiveGuides, setFilteredInactiveGuides] = useState<Guide[]>([]);
  const [filteredActiveGuides, setFilteredActiveGuides] = useState<Guide[]>([]);

  const { data: inactiveGuides, refetch: refetchInactiveGuides } = useQuery<QueryReturn, Error>({
    queryKey: ['inactiveGuides'],
    queryFn: async () => {
      return axios.get('http://localhost:8081/admin/unapproved-guides', {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    refetchOnWindowFocus: false
  });

  const { data: activeGuides, refetch: refetchActiveGuides } = useQuery<QueryReturn, Error>({
    queryKey: ['activeGuides'],
    queryFn: async () => {
      return axios.get('http://localhost:8081/admin/approved-guides', {
        headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
      });
    },
    refetchOnWindowFocus: false
  });

  useEffect(() => {
    if (activeTab === 'inativos') {
      refetchInactiveGuides();
    } else if (activeTab === 'ativos') {
      refetchActiveGuides();
    }
  }, [activeTab, refetchInactiveGuides, refetchActiveGuides]);

  useEffect(() => {
    if (inactiveGuides) {
      setFilteredInactiveGuides(
        inactiveGuides.data.filter((guide: Guide) =>
          guide.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, inactiveGuides]);

  useEffect(() => {
    if (activeGuides) {
      setFilteredActiveGuides(
        activeGuides.data.filter((guide: Guide) =>
          guide.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, activeGuides]);

  const handleNext = (guides: Guide[]) => {
    if (currentPage < totalPages(guides)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const { mutate: approveGuide } = useMutation({
    mutationFn: async (id: number) => {
      return axios.put(
        `http://localhost:8081/admin/approve-guide/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inactiveGuides'] });
      queryClient.invalidateQueries({ queryKey: ['activeGuides'] });
      toast({ title: 'Guia aprovado!', variant: 'default', className: 'bg-green-500 text-white' });
    }
  });

  const { mutate: disapproveGuide } = useMutation({
    mutationFn: async (id: number) => {
      return axios.put(
        `http://localhost:8081/admin/disapprove-guide/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${sessionData?.user.authToken}` }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inactiveGuides'] });
      queryClient.invalidateQueries({ queryKey: ['activeGuides'] });
      toast({ title: 'Guia inativado!', variant: 'destructive' });
    }
  });

  const paginatedData = (guides: Guide[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return guides.slice(startIndex, startIndex + itemsPerPage);
  };

  const totalPages = (guides: Guide[]) => Math.ceil(guides.length / itemsPerPage);

  if (!inactiveGuides || !activeGuides) return <ClipLoader color='black' />;

  return (
    <div className='min-h-[75vh] h-fit'>
      <Card className='w-[667px]'>
        <CardHeader>
          <CardTitle>Aprovar ou Desativar Guias</CardTitle>
          <CardDescription>Gerencie o status dos guias de turismo.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='mb-3'>
            <SearchBar
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value='inativos'>Guias Inativos</TabsTrigger>
              <TabsTrigger value='ativos'>Guias Ativos</TabsTrigger>
            </TabsList>

            <TabsContent value='inativos'>
              <GuideTable
                guides={paginatedData(filteredInactiveGuides)}
                actionButton={(id) => (
                  <Button className='bg-green-500' onClick={() => approveGuide(id)}>
                    <Check />
                  </Button>
                )}
              />
              <GuidePagination
                currentPage={currentPage}
                totalPages={totalPages(filteredInactiveGuides)}
                onNext={() => handleNext(filteredInactiveGuides)}
                onPrevious={handlePrevious}
              />
            </TabsContent>

            <TabsContent value='ativos'>
              <GuideTable
                guides={paginatedData(filteredActiveGuides)}
                actionButton={(id) => (
                  <Button variant='destructive' onClick={() => disapproveGuide(id)}>
                    <CircleXIcon />
                  </Button>
                )}
              />
              <GuidePagination
                currentPage={currentPage}
                totalPages={totalPages(filteredActiveGuides)}
                onNext={() => handleNext(filteredActiveGuides)}
                onPrevious={handlePrevious}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default GuideApproval;
