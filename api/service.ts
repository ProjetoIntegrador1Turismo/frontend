'use server';
import { auth } from '@/auth';
import { HomePageData } from '@/lib/interfaces';
import {
  InterestPointEditFormSchema,
  InterestPointFormSchema,
  RegisterGuideSchema,
  RegisterSchema,
  UpdateProfileSchema
} from '@/schemas';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import * as z from 'zod';

export const getAuthToken = async () => {
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
    name: values.name,
    shortDescription: values.shortDescription,
    interestPointType: values.type,
    address: {
      zipCode: values.zipcode,
      road: values.road,
      number: values.number
    }
  };

  let extraData: Record<string, any> = {};
  switch (values.type) {
    case 'EVENT':
      extraData = {
        date: values.date,
        longDescription: values.longDescription,
        duration: values.duration
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
        duration: values.duration
      };
      break;
    case 'RESTAURANT':
      extraData = {
        foodType: values.foodType
      };
      break;
    case 'TOURIST_POINT':
      extraData = {
        longDescription: values.longDescription,
        duration: values.duration
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
  values: z.infer<typeof InterestPointEditFormSchema>,
  id: number
) {
  const baseData = {
    averageValue: values.averageValue,
    name: values.name,
    shortDescription: values.shortDescription,
    interestPointType: values.type,
    zipCode: values.zipcode,
    road: values.road,
    number: values.number
  };

  let extraData: Record<string, any> = {};
  switch (values.type) {
    case 'EVENT':
      extraData = {
        date: values.date,
        longDescription: values.longDescription,
        duration: values.duration
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
        duration: values.duration
      };
      break;
    case 'RESTAURANT':
      extraData = {
        foodType: values.foodType
      };
      break;
    case 'TOURIST_POINT':
      extraData = {
        longDescription: values.longDescription,
        duration: values.duration
      };
      break;
    default:
      return false;
  }

  const data = { ...baseData, ...extraData };

  const response = await axios.put(`http://localhost:8081/interestpoint/${id}`, data, {
    headers: { Authorization: `Bearer ${await getAuthToken()}` }
  });

  return response.status === 200;
}

export async function RegisterGuide({
  name,
  email,
  password,
  cadastur
}: z.infer<typeof RegisterGuideSchema>) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const response = await axios.post('http://localhost:8081/user/create', {
    firstName: firstName,
    lastName: lastName,
    email: email,
    cadasturCode: cadastur,
    password: password
  });

  return response.status === 200;
}
