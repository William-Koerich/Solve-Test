const data = [
  {
    name: "Pringles Original",
    price: "R$ 9,90",
    code: "7892840800024",
    image:
      "https://res.cloudinary.com/dubsqkz8e/image/upload/v1645980254/rn/IMG_3104_ez56pm.jpg",
  },
  {
    name: "Natas",
    price: "R$ 1,89",
    code: "7896036098093",
    image:
      "https://res.cloudinary.com/dubsqkz8e/image/upload/v1645980254/rn/IMG_3106_rmlh0q.jpg",
  },
  {
    name: "Redbull",
    price: "R$ 12,43",
    code: "7891149100012",
    image:
      "https://res.cloudinary.com/dubsqkz8e/image/upload/v1645980254/rn/IMG_3105_lv4hi8.jpg",
  },
  {
    name: "Coca-Cola 350ml",
    price: "R$ 2,20",
    code: "7894900011517",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Coca-Cola_can.jpg/640px-Coca-Cola_can.jpg",
  },
  {
    name: "KitKat Chocolate",
    price: "R$ 4,50",
    code: "7891000240106",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/02/KitKat-Wrapper.jpg",
  },
  {
    name: "Oreo",
    price: "R$ 3,80",
    code: "7892840222949",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Oreo_Biscuits_%28Triple_Pack%29.jpg/640px-Oreo_Biscuits_%28Triple_Pack%29.jpg",
  },
  {
    name: "Nutella",
    price: "R$ 19,99",
    code: "7891000250846",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Nutella_Spread.jpg/640px-Nutella_Spread.jpg",
  },
  {
    name: "Doritos Nacho",
    price: "R$ 8,50",
    code: "7892840800086",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Doritos_Nacho_Cheese_Bag.jpg/640px-Doritos_Nacho_Cheese_Bag.jpg",
  },

];

export interface IProduct {
  name: string;
  price: string;
  code: string;
  image: string;
}

export function findProductByCode(code: string) {
  return data.find((product) => product.code === code);
}

export default data;
