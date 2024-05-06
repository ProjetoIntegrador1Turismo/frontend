import { ReactNode, SetStateAction } from 'react';

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
}

export interface HomeSliderProps {
  slides: SliderCardProps[];
}

export interface SliderWithHeaderProps {
  title: string;
  slides: SliderCardProps[];
}

export interface DropDownMenuProps {
  // eslint-disable-next-line no-unused-vars
  trigger: (value: SetStateAction<boolean>) => void;
}

export interface DropDownMenuItemProps {
  children: ReactNode;
  login?: boolean;
  profile?: boolean;
  logout?: boolean;
  register?: boolean;
  about?: boolean;
}

export interface RatingProps {
  rating: 1 | 2 | 3 | 4 | 5;
}

export interface GuideCardInfo {
  img: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  trips: number;
}

export interface GuideCardProps {
  guide: GuideCardInfo;
}

export interface WeekGuidesProps {
  guides: GuideCardInfo[];
}
