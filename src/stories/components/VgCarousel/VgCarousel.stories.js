import VgCarousel from "../../../components/VgCarousel/VgCarousel";

export default {
  title: "Carousel",
  component: VgCarousel,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A responsive image carousel component that supports multiple images and customizable size.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    Rowadata: {
      description: 'Object containing images array and size configuration',
      control: 'object',
    },
    OnIndexChange: {
      action: 'clicked',
    },
  }
};

const demoImages = [
  {
    slide: 'https://9fc9a5aa542dd16dedb7-07b010db7b552ce02eef60d5776c1e9d.ssl.cf2.rackcdn.com/Inventory/350x350/7165ec82-6723-4715-b9b8-c7d8bcf74a9e_$2024_12_09_11_06_04_0853.png',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Chelsea 1',
    fileType: 'JPG',
  },
  {
    slide: 'https://9fc9a5aa542dd16dedb7-07b010db7b552ce02eef60d5776c1e9d.ssl.cf2.rackcdn.com/Inventory/800x0/4f852b0d-f20b-4208-87dd-e641d367a4e5_$2024_12_09_11_06_04_0858.png',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Chelsea 1',
    fileType: 'JPG',
  },
  {
    slide: 'https://9fc9a5aa542dd16dedb7-07b010db7b552ce02eef60d5776c1e9d.ssl.cf2.rackcdn.com/Inventory/800x0/d2306505-ffd9-4f0d-949b-4a3db9eeb2e6_$2024_12_09_11_06_04_0871.png',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Chelsea 1',
    fileType: 'JPG',
  },
  {
    slide: 'https://9fc9a5aa542dd16dedb7-07b010db7b552ce02eef60d5776c1e9d.ssl.cf2.rackcdn.com/Inventory/800x0/2c8eefa2-9e41-4ca1-8eb9-4054d0d4c5c6_$2024_12_09_11_06_04_0841.png',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Chelsea 1',
    fileType: 'JPG',
  },
  {
    slide: 'https://9fc9a5aa542dd16dedb7-07b010db7b552ce02eef60d5776c1e9d.ssl.cf2.rackcdn.com/Inventory/800x0/7165ec82-6723-4715-b9b8-c7d8bcf74a9e_$2024_12_09_11_06_04_0853.png',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Nature img 4',
    fileType: 'JPG',
  },
  {
    slide: 'https://img.freepik.com/free-photo/waterfall-nature-thailand_335224-989.jpg?ga=GA1.1.2113821316.1734692008&semt=ais_hybrid',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Nature img 1',
    fileType: 'JPG',
  },
  {
    slide: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    fileDescription: 'This is a sample video description.',
    fileName: 'Sample Video.mp4',
    fileType: 'mp4',
  },
  {
    slide: 'https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?ga=GA1.1.2113821316.1734692008&semt=ais_hybrid',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Nature img 2',
    fileType: 'JPG',
  },
  {
    slide: 'https://img.freepik.com/free-photo/asian-woman-wearing-thai-dress-costume-traditional-according-thai-culture-pha-dok-siew-waterfall-chiang-mai-thailand_335224-1164.jpg?ga=GA1.1.2113821316.1734692008&semt=ais_hybrid',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Nature img 3',
    fileType: 'JPG',
  },
  {
    slide: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    fileDescription: 'This is a sample video description.',
    fileName: 'Sample Video.mp4',
    fileType: 'mp4',
  },
  {
    slide: 'https://img.freepik.com/free-photo/rock-ban-forest-tropical-beautiful-jungle_1417-1271.jpg?ga=GA1.1.2113821316.1734692008&semt=ais_hybrid',
    fileDescription: 'The photographer tried to demonstrate the reality in all its beauty',
    fileName: 'Nature img 4',
    fileType: 'JPG',
  },
]

export const Default = {
  args: {
    Rowadata: {
      images: demoImages,
    },
    OnIndexChange: () => {},
  },
};
