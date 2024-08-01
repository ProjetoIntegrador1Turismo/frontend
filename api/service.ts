import { auth } from '@/auth';
import { HomePageData } from '@/lib/interfaces';
import { InterestPointFormSchema } from '@/schemas';
import * as z from 'zod';

const getAuthToken = async () => {
  const session = await auth();
  return session?.user.authToken;
}

interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface UserUpdateData {
  name: string;
  email: string;
  avatar?: any;
  password?: string | undefined;
}

export async function RegisterUser ({ name, email, password }: UserRegisterData) {
  const authResponse = await fetch('http://localhost:8081/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: name.substring(0, name.indexOf(' ')),
      lastName: name.substring(name.indexOf(' ') + 1),
      email: email,
      password: password
    })
  });

  if (authResponse.status === 400){
    return false;
  }

  return true;
}

export const fetchHomepageData = async () => {
  const response = await fetch('http://localhost:8081/page-source/home', { cache: 'no-cache' });

  return (await response.json()) as HomePageData;
};

export async function updateUser({ name, password, email }: UserUpdateData) {
  const updateResponse = await fetch('http://localhost:8081/user/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      firstName: name.substring(0, name.indexOf(' ')),
      lastName: name.substring(name.indexOf(' ') + 1),
      newPassword: password ? password : null
    })
  });

  if (updateResponse.status === 400) {
    return false;
  }

  return true;
}

export async function interestPointCreate(values: z.infer<typeof InterestPointFormSchema>) {
  switch (values.type) {
    case 'EVENT':
      const { averageValue, date, duration, longDescription, name, number, road, shortDescription, zipcode, type } = values;
      const response = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: averageValue,
          date: date,
          duration: duration,
          longDescription: longDescription,
          name: name,
          shortDescription: shortDescription,
          interestPointType: type,
          address: {
            zipcode: zipcode,
            road: road,
            number: number
          }
        })
      });
      if (response.status !== 200) {
        return await response.json();
      }
      return true;
      default:
        return false
  }

}