'use server';
import { auth } from '@/auth';
import { Guide, HomePageData } from '@/lib/interfaces';
import { InterestPointFormSchema } from '@/schemas';
import { useSession } from 'next-auth/react';
import * as z from 'zod';

const getAuthToken = async () => {
  const session = await auth();
  return session?.user.authToken;
};

const getAuthTokenClient = () => {
  return useSession().data?.user.authToken;
};

interface UserRegisterData {
  name: string;
  email: string;
  password: string;
}

interface GuideRegisterData {
  name: string;
  email: string;
  password: string;
  cadastur: string;
}

interface UserUpdateData {
  name: string;
  email: string;
  avatar?: any;
  password?: string | undefined;
}

export async function RegisterUser({ name, email, password }: UserRegisterData) {
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

  if (authResponse.status === 400) {
    return false;
  }

  return true;
}

export const fetchHomepageData = async () => {
  const response = await fetch('http://localhost:8081/page-source/home', { cache: 'no-cache' });

  return (await response.json()) as HomePageData;
};

export const fetchInactiveGuides = async () => {
  const response = await fetch('http://localhost:8081/admin/unapproved-guides', {});

  return await response.json();
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
      const {
        averageValue: eventValue,
        date: eventDate,
        duration: eventDuration,
        longDescription: eventLongDescription,
        name: eventName,
        number: eventNumber,
        road: eventRoad,
        shortDescription: eventShortDescription,
        zipcode: eventZipCode,
        type: eventType
      } = values;
      const eventResponse = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: eventValue,
          date: eventDate,
          duration: eventDuration,
          longDescription: eventLongDescription,
          name: eventName,
          shortDescription: eventShortDescription,
          interestPointType: eventType,
          address: {
            zipcode: eventZipCode,
            road: eventRoad,
            number: eventNumber
          }
        })
      });
      if (eventResponse.status !== 200) {
        return false;
      }
      return true;
    case 'HOTEL':
      const {
        averageValue: hotelValue,
        duration: hotelDuration,
        name: hotelName,
        number: hotelNumber,
        road: hotelRoad,
        shortDescription: hotelShortDescription,
        zipcode: hotelZipCode,
        type: hotelType,
        breakfastIncluded: hotelBreakfastIncluded,
        isResort: hotelIsResort,
        starsNumber: hotelStarsNumber
      } = values;
      const response = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: hotelValue,
          duration: hotelDuration,
          name: hotelName,
          shortDescription: hotelShortDescription,
          interestPointType: hotelType,
          address: {
            zipcode: hotelZipCode,
            road: hotelRoad,
            number: hotelNumber
          },
          breakfastIncluded: hotelBreakfastIncluded,
          isResort: hotelIsResort,
          starsNumber: hotelStarsNumber
        })
      });
      if (response.status !== 200) {
        return false;
      }
      return true;
    case 'EXPERIENCE':
      const {
        averageValue: experienceValue,
        duration: experienceDuration,
        name: experienceName,
        number: experienceNumber,
        road: experienceRoad,
        shortDescription: experienceShortDescription,
        zipcode: experienceZipCode,
        type: experienceType,
        requiredAge: experienceRequiredAge,
        longDescription: experienceLongDescription,
        category: experienceCategory
      } = values;
      const experienceResponse = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: experienceValue,
          duration: experienceDuration,
          name: experienceName,
          shortDescription: experienceShortDescription,
          interestPointType: experienceType,
          address: {
            zipcode: experienceZipCode,
            road: experienceRoad,
            number: experienceNumber
          },
          requiredAge: experienceRequiredAge,
          longDescription: experienceLongDescription,
          category: experienceCategory
        })
      });
      if (experienceResponse.status !== 200) {
        return false;
      }
      return true;
    case 'RESTAURANT':
      const {
        averageValue: restaurantValue,
        duration: restaurantDuration,
        name: restaurantName,
        number: restaurantNumber,
        road: restaurantRoad,
        shortDescription: restaurantShortDescription,
        zipcode: restaurantZipCode,
        type: restaurantType,
        foodType: restaurantFoodType
      } = values;
      const restaurantResponse = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: restaurantValue,
          duration: restaurantDuration,
          name: restaurantName,
          shortDescription: restaurantShortDescription,
          interestPointType: restaurantType,
          address: {
            zipcode: restaurantZipCode,
            road: restaurantRoad,
            number: restaurantNumber
          },
          foodType: restaurantFoodType
        })
      });
      if (restaurantResponse.status !== 200) {
        return false;
      }
      return true;
    case 'TOURIST_POINT':
      const {
        averageValue: touristPointValue,
        duration: touristPointDuration,
        name: touristPointName,
        number: touristPointNumber,
        road: touristPointRoad,
        shortDescription: touristPointShortDescription,
        zipcode: touristPointZipCode,
        type: touristPointType,
        longDescription: touristPointLongDescription
      } = values;
      const touristPointResponse = await fetch('http://localhost:8081/interestpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await getAuthToken()}`
        },
        body: JSON.stringify({
          averageValue: touristPointValue,
          duration: touristPointDuration,
          name: touristPointName,
          shortDescription: touristPointShortDescription,
          interestPointType: touristPointType,
          address: {
            zipcode: touristPointZipCode,
            road: touristPointRoad,
            number: touristPointNumber
          },
          longDescription: touristPointLongDescription
        })
      });
      if (touristPointResponse.status !== 200) {
        return false;
      }
      return true;
  }
}

export async function RegisterGuide({ name, email, password, cadastur }: GuideRegisterData) {
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

  if (authResponse.status === 400) {
    return false;
  }

  return true;
}

export async function fetchGuideItinerariesById() {
  const response = await fetch(
    'http://localhost:8081/page-source/guide-panel/itineraries?guideId=2',
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${await getAuthToken()}`
      }
    }
  );

  if (response.status !== 200) {
    return [];
  }

  return response.json();
}

export async function fetchAllEvents() {
  const response = await fetch('http://localhost:8081/interestpoint/type', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  });

  if (response.status !== 200) {
    return [];
  }

  return response.json();
}