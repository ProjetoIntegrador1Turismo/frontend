import { GuideCardInfo, SliderCardProps, TourTitleInfo } from './interfaces';

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
  name: 'Lu',
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
    name: 'Lua Santos',
    rating: 1,
    trips: 882
  },
  {
    img: '/avatar.jpg',
    name: 'Claudio Santos Faraday',
    rating: 4,
    trips: 1027
  },
  {
    img: '/avatar.jpg',
    name: 'Julia Souza santos Constante',
    rating: 5,
    trips: 633
  },
  {
    img: '/avatar.jpg',
    name: 'Lucas Souza Silva',
    rating: 2,
    trips: 34
  }
];

export const tourTitleMock: TourTitleInfo = {
  address: 'Av. Tancredo Neves, 6731 - Conj. C, Foz do Iguaçu - PR, 85867-318',
  phone: '(45) 3520-6265',
  price: 1,
  rating: 3,
  title: 'Itaipu Binacional',
  description: `Sua cama, acima do chão e com vista para a cidade, é a peça central. Duas luminosas flores de cerâmica emolduram a cabeceira da cama, enquanto os grandes sofás de formas orgânicas criam um ambiente de sala de estar privada.

  A decoração inclui a tocha olímpica de Paris 2024 (projetada por mim) exposta em sua alcova exclusiva, em frente a um saco de boxe para dar um toque esportivo pessoal. Assim, até você entra no ritmo de competição. Como o quarto mais bonito deve ter a varanda mais bonita, o grande terraço do Museu também será reservado para você. Paris é sua; que comece a cerimônia...

  Prepare-se para ter uma noite mágica e histórica.

  • Assista à Cerimônia de Abertura no terraço do museu com a vista incomparável do rio Sena.

  • Tenha acesso privativo à coleção impressionista do museu e a uma experiência exclusiva em um espaço que não fica aberto ao público.

  • Desfrute de um jantar gourmet que apresenta os melhores clássicos franceses. 

  • Passe a noite no quarto do relógio projetado por mim em uma cama flutuante.`
};
