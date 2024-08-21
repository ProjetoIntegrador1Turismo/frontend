import { ReactNode } from 'react';

export interface NavBarButtonProps {
  buttonText: string;
  href: string;
}

export interface NavBarButtonsContainerProps {
  buttons: NavBarButtonProps[];
}

export interface SliderCardProps {
  image: string;
  title: string;
  id: number;
}

export interface HomeSliderProps {
  slides: SliderCardProps[];
}

export interface SliderWithHeaderProps {
  title: string;
  slides: FirstSlider[];
}

export interface RatingProps {
  rating: number;
}

export interface GuideCardInfo {
  img: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  trips: number;
}

export interface GuideCardProps {
  guide: TopGuide;
}

export interface WeekGuidesProps {
  guides: TopGuide[];
}

export interface TourTitleInfo {
  title: string;
  phone: string;
  address: string;
  description: string;
  price: 1 | 2 | 3;
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface TourTitleProps {
  tour: TourTitleInfo;
}

export interface TourPriceProps {
  price: number;
}

export interface TourDescriptionProps {
  longDescription: string;
  shortDescription: string;
}

export interface HeaderProps {
  label: string;
  title: string;
}

export interface FormSucessProps {
  message?: string;
}

export interface FormErrorProps {
  message?: string;
}

export interface BackButtonProps {
  href: string;
  label: string;
}

export interface CardWrapperProps {
  children: ReactNode;
  headerLabel: string;
  headerTitle: string;
  backButtons: BackButtonProps[];
}

export interface HomePageData {
  top3InterestPoints: Top3InterestPoint[]
  firstSlider: FirstSlider[]
  secondSlider: SecondSlider[]
  topGuides: TopGuide[]
}

export interface Top3InterestPoint {
  id: number
  name: string
  averageValue: string
  duration: any
  imageCoverUrl: string
}

export interface FirstSlider {
  id: number
  name: string
  imageCoverUrl: string
}

export interface SecondSlider {
  id: number
  name: string
  imageCoverUrl: string
}

export interface TopGuide {
  id: number
  firstName: string
  averageRating: number
}

export interface Guide {
  id: number
  firstName: string
  cadasturCode: string
  isApproved: boolean
  itineraries: any[]
  reviews: any
  averageRating: any
}
