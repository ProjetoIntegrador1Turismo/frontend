import { GuideCardInfo, SliderCardProps } from './interfaces';

export const mockSlides: SliderCardProps[] = [
  {
    image: 'https://i.imgur.com/wKCqVTl.png',
    title: 'Itaipu Binacional'
  },
  {
    image:
      'https://www.cnnbrasil.com.br/viagemegastronomia/wp-content/uploads/sites/5/2021/05/cataratas.jpg',
    title: 'Cataratas do iguaçu'
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Viveiro_Aves_de_Rios_e_Mangues.jpg/1200px-Viveiro_Aves_de_Rios_e_Mangues.jpg',
    title: 'Parque das aves'
  },
  {
    image: 'https://localplanet.com.br/wp-content/uploads/2022/11/bar-dreams-motor-show-scaled.jpg',
    title: 'Dreams Park Show'
  },
  {
    image:
      'https://media-cdn.tripadvisor.com/media/photo-s/19/7d/59/e8/la-caverna-cozinha-internacion.jpg',
    title: 'La caverna'
  },
  {
    image: 'https://img.restaurantguru.com/rd9c-SO-Lounge-interior-2021-09.jpg',
    title: 'So Lounge'
  },
  {
    image: 'https://catuaipalladium.com.br/wp-content/uploads/2023/02/intro.png',
    title: 'Shopping Catuai Palladium'
  }
];

export const mockTour = {
  tourTitle: 'Itaipu Binacional',
  duration: '1h30min',
  price: '1',
  image: 'https://i.imgur.com/wKCqVTl.png',
  imageAlt: 'Photo of Itaipu Binacional'
};

export const mockGuide: GuideCardInfo = {
  img: '/avatar.jpg',
  name: 'Luiza Oliveira',
  rating: 3,
  trips: 223
};

export const mockGuides: GuideCardInfo[] = [
  {
    img: '/avatar.jpg',
    name: 'Kleber Machado da Silva',
    rating: 3,
    trips: 10003
  },
  {
    img: '/avatar.jpg',
    name: 'Kleber Machado da Silva',
    rating: 1,
    trips: 882
  },
  {
    img: '/avatar.jpg',
    name: 'Kleber Machado da Silva',
    rating: 4,
    trips: 1027
  },
  {
    img: '/avatar.jpg',
    name: 'Kleber Machado da Silva',
    rating: 5,
    trips: 633
  },
  {
    img: '/avatar.jpg',
    name: 'Kleber Machado da Silva',
    rating: 2,
    trips: 34
  }
];
