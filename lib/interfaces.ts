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
