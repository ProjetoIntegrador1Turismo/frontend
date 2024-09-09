'use server';
import { auth } from '@/auth';
import { HomePageData } from '@/lib/interfaces';
import {
  CommentSchema,
  InterestPointEditFormSchema,
  InterestPointFormSchema,
  NewItineraryFormSchema,
  RegisterGuideSchema,
  RegisterSchema,
  UpdateProfileSchema
} from '@/schemas';
import axios from 'axios';
import * as z from 'zod';

export const getAuthToken = async () => {
  const session = await auth();
  return session?.user.authToken;
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
  try {
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
  } catch (error) {
    return false;
  }
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

export const ItineraryCreate = async (values: z.infer<typeof NewItineraryFormSchema>) => {
  const { interestPointIds, averageCost, ...rest } = values;
  const response = await axios.post(
    'http://localhost:8081/itinerary',
    {
      interestPointsId: interestPointIds,
      mediumCost: averageCost,
      ...rest
    },
    {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`
      }
    }
  );

  return { ok: response.status === 200, id: response.data.id };
};

export const ItineraryUpdate = async (
  values: z.infer<typeof NewItineraryFormSchema>,
  id: number
) => {
  const { interestPointIds, averageCost, ...rest } = values;
  const response = await axios.put(
    `http://localhost:8081/itinerary/${id}`,
    {
      interestPointsId: interestPointIds,
      mediumCost: averageCost,
      ...rest
    },
    {
      headers: {
        Authorization: `Bearer ${await getAuthToken()}`
      }
    }
  );

  return { ok: response.status === 200, id: response.data.id };
};

export const createReview = async (values: z.infer<typeof CommentSchema>, guideId: number) => {
  try {
    const response = await axios.post(
      `http://localhost:8081/review/${guideId}`,
      {
        rating: values.rating,
        text: values.commentText,
        date: new Date().toISOString()
      },
      {
        headers: {
          Authorization: `Bearer ${await getAuthToken()}`
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    return false;
  }
};
