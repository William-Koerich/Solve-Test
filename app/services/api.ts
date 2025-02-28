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
    code: "7896036098097",
    image:
      "https://res.cloudinary.com/dubsqkz8e/image/upload/v1645980254/rn/IMG_3106_rmlh0q.jpg",
  },
  {
    name: "Redbull",
    price: "R$ 12,43",
    code: "7891149100019",
    image:
      "https://res.cloudinary.com/dubsqkz8e/image/upload/v1645980254/rn/IMG_3105_lv4hi8.jpg",
  },
  {
    name: "Coca-Cola 350ml",
    price: "R$ 2,20",
    code: "7894900011517",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimgs.extra.com.br%2F1505927937%2F1xg.jpg&f=1&nofb=1&ipt=3e059157dce0ae78f01d82ae3c0a40974045ebbf6dcc47d0038a021865c60def&ipo=images",
  },
  {
    name: "KitKat Chocolate",
    price: "R$ 4,50",
    code: "7891000240106",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi0.wp.com%2Fcannichstores.co.uk%2Fwp-content%2Fuploads%2F2020%2F05%2Fkit-kat-4-fingers.jpg%3Ffit%3D1280%252C1280%26ssl%3D1&f=1&nofb=1&ipt=16bd410ac4c556e36c03a647ecf062039531b8be4b473e768cf4e2dadddebbf6&ipo=images",
  },
  {
    name: "Oreo",
    price: "R$ 3,80",
    code: "7892840222949",
    image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.paodeacucar.com%2Fimg%2Fuploads%2F1%2F119%2F522119.jpg&f=1&nofb=1&ipt=90eca52a73cb75ef51d41f1dc5f86e387d3cd0162ca3cb4b0c2b704afd6df7ab&ipo=images"
  },
  {
    name: "Nutella",
    price: "R$ 19,99",
    code: "7891000250846",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fm.media-amazon.com%2Fimages%2FI%2F71NSoXxLUHL.jpg&f=1&nofb=1&ipt=eaef19b1baaa4063aac0bced7b95ac8e67e74d1350f1f9fce03b42f25ee55ba6&ipo=images",
  },
  {
    name: "Doritos Nacho",
    price: "R$ 8,50",
    code: "7892840800086",
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi5.walmartimages.com%2Fasr%2Fcf16c90d-f4ae-4d5e-acfc-50840ce4a99b_1.30e4c19f0aa1564bcee2ba96d5a5b9e9.jpeg%3FodnWidth%3D1000%26odnHeight%3D1000%26odnBg%3Dffffff&f=1&nofb=1&ipt=4fb52853b16395d0abb3453122274e12b61499fa2cd62a72f529e8b750cc22ee&ipo=images",
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
