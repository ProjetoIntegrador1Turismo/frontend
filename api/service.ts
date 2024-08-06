'use server';
import { auth } from '@/auth';
import { HomePageData } from '@/lib/interfaces';
import {
  InterestPointFormSchema,
  RegisterGuideSchema,
  RegisterSchema,
  UpdateProfileSchema
} from '@/schemas';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import * as z from 'zod';

const getAuthToken = async () => {
  const session = await auth();
  return session?.user.authToken;
};

const getAuthTokenClient = () => {
  return useSession().data?.user.authToken;
};

export async function RegisterUser({ name, email, password }: z.infer<typeof RegisterSchema>) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const response = await axios.post('http://localhost:8081/user/create', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password
  });

  return response.status === 200;
}

export const fetchHomepageData = async () => {
  const response = await fetch('http://localhost:8081/page-source/home', { cache: 'no-cache' });

  return (await response.json()) as HomePageData;
};

export async function updateUser({ name, password, email }: z.infer<typeof UpdateProfileSchema>) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const response = await axios.put('http://localhost:8081/user/update', {
    email: email,
    firstName: firstName,
    lastName: lastName,
    newPassword: password || null
  });

  return response.status === 200;
}

export async function interestPointCreate(values: z.infer<typeof InterestPointFormSchema>) {
  const baseData = {
    averageValue: values.averageValue,
    duration: values.duration,
    name: values.name,
    shortDescription: values.shortDescription,
    interestPointType: values.type,
    address: {
      zipcode: values.zipcode,
      road: values.road,
      number: values.number
    }
  };

  let extraData: Record<string, any> = {};
  switch (values.type) {
    case 'EVENT':
      extraData = {
        date: values.date,
        longDescription: values.longDescription
      };
      break;
    case 'HOTEL':
      extraData = {
        breakfastIncluded: values.breakfastIncluded,
        isResort: values.isResort,
        starsNumber: values.starsNumber
      };
      break;
    case 'EXPERIENCE':
      extraData = {
        requiredAge: values.requiredAge,
        longDescription: values.longDescription,
        category: values.category
      };
      break;
    case 'RESTAURANT':
      extraData = {
        foodType: values.foodType
      };
      break;
    case 'TOURIST_POINT':
      extraData = {
        longDescription: values.longDescription
      };
      break;
    default:
      return false;
  }

  const data = { ...baseData, ...extraData };

  const response = await axios.post('http://localhost:8081/interestpoint', data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getAuthToken()}`
    }
  });

  return response.status === 200;
}

export async function interestPointUpdate(
  values: z.infer<typeof InterestPointFormSchema>,
  id: string
) {
  axios.put(`http://localhost:8081/interestpoint/${id}`, values, {
    headers: { Authorization: `Bearer ${await getAuthToken()}` }
  });
}

export async function RegisterGuide({
  name,
  email,
  password,
  cadastur
}: z.infer<typeof RegisterGuideSchema>) {
  const authResponse = await fetch('http://localhost:8081/user/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: name.substring(0, name.indexOf(' ')),
      lastName: name.substring(name.indexOf(' ') + 1),
      email: email,
      cadasturCode: cadastur,
      password: password
    })
  });

  return authResponse.status === 200;
}
