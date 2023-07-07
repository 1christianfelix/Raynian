import { checkUsernameDuplicate } from './usernameDuplicate';

function getRandomElement(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function randomUsername(animals, hardAdj, softAdj, determiners) {
  let det = getRandomElement(determiners);
  const noun = getRandomElement(animals);
  const randomIndex = Math.floor(Math.random() * 2);
  const adj = getRandomElement(randomIndex === 0 ? hardAdj : softAdj);

  if (det === 'a' && adj[0] === 'a') {
    det = 'an';
  }
  if (det === 'an' && adj[0] !== 'a') {
    det = 'a';
  }
  const username = `${det}${adj}${noun}`;
  return username;
}

export async function generateUniqueUser() {
  let username = '';
  while (true) {
    while (username.length < MIN_NAME_LEN || username.length > MAX_NAME_LEN) {
      username = randomUsername(animals, hardAdj, softAdj, determiners);
    }
    const data = await checkUsernameDuplicate(username);
    if (!data || data.valid_display) {
      return username;
    }
    username = '';
  }
}

// Constants
const MIN_NAME_LEN = 4;
const MAX_NAME_LEN = 25;

const animals = [
  'dog',
  'cat',
  'elephant',
  'lion',
  'tiger',
  'giraffe',
  'zebra',
  'monkey',
  'hippo',
  'rhino',
  'cheetah',
  'bear',
  'wolf',
  'fox',
  'deer',
  'rabbit',
  'hamster',
  'guineapig',
  'squirrel',
  'koala',
  'panda',
  'kangaroo',
  'crocodile',
  'alligator',
  'snake',
  'turtle',
  'frog',
  'toad',
  'lizard',
  'chameleon',
  'dolphin',
  'whale',
  'shark',
  'octopus',
  'jellyfish',
  'starfish',
  'seahorse',
  'crab',
  'lobster',
  'penguin',
  'seal',
  'walrus',
  'parrot',
  'eagle',
  'owl',
  'hawk',
  'peacock',
  'flamingo',
  'swan',
  'duck',
  'goose',
  'rooster',
  'cow',
  'horse',
  'pig',
  'sheep',
  'goat',
  'chicken',
  'turkey',
  'duckling',
  'calf',
  'kitten',
  'puppy',
  'chick',
  'foal',
  'cub',
  'caterpillar',
  'butterfly',
  'spider',
  'ant',
  'bee',
  'wasp',
  'dragonfly',
  'ladybug',
  'beetle',
  'grasshopper',
  'cricket',
  'snail',
  'slug',
  'tortoise',
  'hedgehog',
  'armadillo',
  'porcupine',
  'koala',
  'anteater',
  'jaguar',
  'zebu',
  'panther',
  'meerkat',
  'lemur',
  'gazelle',
  'hyena',
  'chimpanzee',
  'ostrich',
  'buffalo',
  'elk',
  'moose',
  'polarbear',
  'raccoon',
  'gorilla',
  'walrus',
  'hippopotamus',
  'gibbon',
  'tapir',
  'peacock',
];

const hardAdj = [
  'aggressive',
  'brutal',
  'destructive',
  'dynamic',
  'explosive',
  'fierce',
  'forceful',
  'gritty',
  'intense',
  'powerful',
  'relentless',
  'ruthless',
  'savage',
  'sharp',
  'swift',
  'tenacious',
  'tough',
  'unstoppable',
  'vicious',
  'volatile',
  'wild',
  'dirty',
  'energetic',
  'evil',
  'furious',
  'hard',
  'ugly',
  'disgusting',
  'agile',
  'athletic',
  'brawny',
  'brisk',
  'daring',
  'determined',
  'explosive',
  'ferocious',
  'smelly',
  'hardcore',
  'mighty',
  'muscular',
  'resilient',
  'robust',
  'spirited',
  'strenuous',
  'unyielding',
  'vigorous',
  'violent',
  'wiry',
  'zealous',
];

const softAdj = [
  'adorable',
  'beautiful',
  'charming',
  'cuddly',
  'delightful',
  'enchanting',
  'fluffy',
  'gentle',
  'happy',
  'lovable',
  'playful',
  'precious',
  'sweet',
  'tiny',
  'joyful',
  'endearing',
  'whimsical',
  'snuggly',
  'innocent',
  'lovely',
  'magical',
  'bubbly',
  'dainty',
  'darling',
  'fuzzy',
  'giggly',
  'glowing',
  'heartsome',
  'kawaii',
  'melodic',
  'peachy',
  'pretty',
  'radiant',
  'smiling',
  'squeaky',
  'sugary',
  'tender',
  'uplifting',
  'yummy',
  'angelic',
  'dreamy',
  'bouncy',
  'cherished',
  'cupcake-like',
  'dewy-eyed',
  'kittenish',
  'moonbeam',
  'snugly',
  'sunshiney',
  'jiggly',
  'twinkly',
];

const determiners = ['a', 'an', 'the', 'any', 'some', 'another', 'one', 'this', 'that'];
