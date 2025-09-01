
import type { Experience, Review, Friend, FriendActivity, NewsArticle, AvatarItem, Transaction } from './types';

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Void Runners',
    creator: 'PixelPioneers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator1/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game1/600/400',
    playerCount: 12500,
    genre: 'Combat',
    description: 'Jump into a fast-paced sci-fi shooter. Battle across alien landscapes, customize your arsenal, and prove you are the ultimate Void Runner in intense team-based combat.',
  },
  {
    id: '2',
    title: 'Chrono Odyssey',
    creator: 'DreamWeavers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator2/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game2/600/400',
    playerCount: 45200,
    genre: 'Adventure',
    description: 'An epic open-world adventure awaits. Explore ancient ruins, solve cryptic puzzles, and shape your destiny as you travel through time to save the world from collapsing.',
  },
  {
    id: '3',
    title: 'CyberCity Tycoon',
    creator: 'SynthBuilders',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator3/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game3/600/400',
    playerCount: 8900,
    genre: 'Simulation',
    description: 'Build and manage your own futuristic metropolis. Design towering skyscrapers, manage resources, and keep your citizens happy in this immersive city-building simulation.',
  },
  {
    id: '4',
    title: 'Mystic Realms RPG',
    creator: 'LoreMasters',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator4/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game4/600/400',
    playerCount: 78000,
    genre: 'Roleplay',
    description: 'Forge your path in a sprawling fantasy world. Choose your class, team up with friends, and embark on legendary quests to slay dragons and uncover powerful artifacts.',
  },
  {
    id: '5',
    title: 'Gravity Gauntlet',
    creator: 'QuantumLeap',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator5/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game5/600/400',
    playerCount: 22300,
    genre: 'Obby',
    description: 'Test your reflexes and problem-solving skills in this challenging obstacle course. Manipulate gravity to navigate mind-bending levels and race to the finish line.',
  },
  {
    id: '6',
    title: 'Starship Raiders',
    creator: 'GalaxyGames',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator6/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game6/600/400',
    playerCount: 15400,
    genre: 'Combat',
    description: 'Captain your own starship and engage in thrilling space battles. Upgrade your vessel, recruit a crew, and dominate the galaxy in this action-packed combat experience.',
  },
  {
    id: '7',
    title: 'Pet Paradise',
    creator: 'HappyPaws',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator7/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game7/600/400',
    playerCount: 95100,
    genre: 'Simulation',
    description: 'Adopt and raise adorable virtual pets. Design their habitat, play fun mini-games, and connect with other pet owners in this relaxing and charming simulation.',
  },
  {
    id: '8',
    title: 'The Great Escape',
    creator: 'PuzzlePros',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator8/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game8/600/400',
    playerCount: 31000,
    genre: 'Obby',
    description: 'Work together with your team to solve intricate puzzles and overcome obstacles to escape from a series of elaborate trap-filled rooms. Communication is key!',
  },
  {
    id: '9',
    title: 'Fantasy Frontier',
    creator: 'EpicQuests',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator9/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game9/600/400',
    playerCount: 62000,
    genre: 'Adventure',
    description: 'Venture into an untamed wilderness filled with mystical creatures and hidden treasures. Build a settlement, craft powerful gear, and explore a vibrant, ever-changing world.',
  },
  {
    id: '10',
    title: 'Downtown Life',
    creator: 'UrbanVerse',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator10/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game10/600/400',
    playerCount: 150000,
    genre: 'Roleplay',
    description: 'Live your dream life in a bustling virtual city. Get a job, customize your apartment, and socialize with players from around the world in this ultimate roleplaying experience.',
  },
  {
    id: '11',
    title: 'Nitro Fusion',
    creator: 'SpeedDemons',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator11/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game11/600/400',
    playerCount: 42000,
    genre: 'Racing',
    description: 'Get behind the wheel of high-octane supercars and compete in adrenaline-fueled races. Master the drift, hit the nitro, and dominate the leaderboards.',
  },
  {
    id: '12',
    title: 'Asphalt Legends',
    creator: 'ApexRacers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator12/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game12/600/400',
    playerCount: 110000,
    genre: 'Racing',
    description: 'Experience the thrill of street racing in iconic locations. Collect and customize a fleet of world-class cars and prove you are a legend of the asphalt.',
  },
  {
    id: '13',
    title: 'Tower Defense Mania',
    creator: 'StrategyKings',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator13/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game13/600/400',
    playerCount: 18000,
    genre: 'Simulation',
    description: 'Defend your base from waves of enemies. Place towers strategically and upgrade your defenses to survive the onslaught in this addictive tower defense game.',
  },
  {
    id: '14',
    title: 'Obby Master',
    creator: 'Jumpmasters',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator14/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game14/600/400',
    playerCount: 55000,
    genre: 'Obby',
    description: 'The ultimate obstacle course challenge. With hundreds of levels, can you prove you are the Obby Master?',
  },
  {
    id: '15',
    title: 'Galactic Empires',
    creator: 'CosmicBuilders',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator15/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game15/600/400',
    playerCount: 33000,
    genre: 'Combat',
    description: 'Build a galactic empire, form alliances, and conquer the universe. A grand strategy game set in space.',
  },
  {
    id: '16',
    title: 'High School Life',
    creator: 'Roleplay Central',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator16/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game16/600/400',
    playerCount: 250000,
    genre: 'Roleplay',
    description: 'Attend classes, make friends, and go to prom in this immersive high school roleplaying game.',
  },
  {
    id: '17',
    title: 'Jungle Quest',
    creator: 'Adventure Co.',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator17/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game17/600/400',
    playerCount: 41000,
    genre: 'Adventure',
    description: 'Explore a dense jungle, uncover ancient secrets, and find hidden treasures in this exciting adventure game.',
  },
  {
    id: '18',
    title: 'Drift Kings',
    creator: 'TireSquealers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator18/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game18/600/400',
    playerCount: 68000,
    genre: 'Racing',
    description: 'Master the art of drifting on challenging mountain roads and city streets. Become the Drift King!',
  },
  {
    id: '19',
    title: 'Restaurant Simulator',
    creator: 'CuisineCraft',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator19/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game19/600/400',
    playerCount: 29000,
    genre: 'Simulation',
    description: 'Design, build, and manage your own restaurant. From fast food to fine dining, the choice is yours.',
  },
  {
    id: '20',
    title: 'Arena Champions',
    creator: 'Battle Studios',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator20/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game20/600/400',
    playerCount: 92000,
    genre: 'Combat',
    description: 'Compete in a futuristic arena in skill-based PvP combat. Climb the ranks and become a champion.',
  },
  {
    id: '21',
    title: 'Escape the Dungeon',
    creator: 'Maze Runners',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator21/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game21/600/400',
    playerCount: 15000,
    genre: 'Obby',
    description: 'Navigate a treacherous dungeon filled with traps and puzzles. Can you make it out alive?',
  },
  {
    id: '22',
    title: 'Island Survival',
    creator: 'Wilderness Explorers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator22/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game22/600/400',
    playerCount: 38000,
    genre: 'Adventure',
    description: 'You are stranded on a deserted island. Craft tools, build shelter, and survive against the elements.',
  },
  {
    id: '23',
    title: 'Super Hero City',
    creator: 'Justice Inc',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator23/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game23/600/400',
    playerCount: 180000,
    genre: 'Roleplay',
    description: 'Become a superhero, fight villains, and protect the city in this open-world roleplaying adventure.',
  },
  {
    id: '24',
    title: 'Offroad Madness',
    creator: 'MudBoggers',
    creatorAvatarUrl: 'https://picsum.photos/seed/creator24/40/40',
    thumbnailUrl: 'https://picsum.photos/seed/game24/600/400',
    playerCount: 25000,
    genre: 'Racing',
    description: 'Take your 4x4 through extreme offroad courses. Mud, rocks, and rivers await in this realistic driving sim.',
  },
];

export const mockReviews: Review[] = [
    {
        id: 'r1',
        author: 'ProGamer123',
        authorAvatarUrl: 'https://picsum.photos/seed/review1/40/40',
        rating: 5,
        comment: 'Absolutely amazing! The gameplay is smooth and the community is fantastic. Highly recommended!',
        // FIX: Added missing experienceId to match the Review type.
        experienceId: '1',
    },
    {
        id: 'r2',
        author: 'CasualPlayer',
        authorAvatarUrl: 'https://picsum.photos/seed/review2/40/40',
        rating: 4,
        comment: 'Really fun game to play with friends. Can be a bit challenging at times, but overall a great experience.',
        // FIX: Added missing experienceId to match the Review type.
        experienceId: '2',
    },
    {
        id: 'r3',
        author: 'CritiqueMaster',
        authorAvatarUrl: 'https://picsum.photos/seed/review3/40/40',
        rating: 3,
        comment: 'It\'s a decent game with a good concept, but it could use more content and bug fixes. Has potential.',
        // FIX: Added missing experienceId to match the Review type.
        experienceId: '1',
    }
];

export const sidebarFriendsData: Friend[] = [
    { name: 'Starlight', avatar: 'https://picsum.photos/seed/friend1/40/40', status: 'online', currentGame: { name: 'Void Runners', id: '1' } },
    { name: 'GamerX', avatar: 'https://picsum.photos/seed/friend2/40/40', status: 'online', currentGame: { name: 'Mystic Realms RPG', id: '4' } },
    { name: 'Nova', avatar: 'https://picsum.photos/seed/friend3/40/40', status: 'online' },
    { name: 'Raptor', avatar: 'https://picsum.photos/seed/friend4/40/40', status: 'offline' },
    { name: 'Echo', avatar: 'https://picsum.photos/seed/friend5/40/40', status: 'offline' },
];

export const friendsActivityData: FriendActivity[] = [
    {
        friendName: 'Starlight',
        friendAvatarUrl: 'https://picsum.photos/seed/friend1/40/40',
        experience: experiences.find(e => e.id === '1')!
    },
    {
        friendName: 'GamerX',
        friendAvatarUrl: 'https://picsum.photos/seed/friend2/40/40',
        experience: experiences.find(e => e.id === '4')!
    },
    {
        friendName: 'Nova',
        friendAvatarUrl: 'https://picsum.photos/seed/friend3/40/40',
        experience: experiences.find(e => e.id === '11')!
    }
];

export const newsData: NewsArticle[] = [
    {
        id: 'n1',
        title: 'The Void Runners Championship is Here!',
        category: 'Event',
        summary: 'Compete with the best and prove your skills in the official Void Runners tournament. Prizes await!',
        imageUrl: 'https://picsum.photos/seed/news1/800/600'
    },
    {
        id: 'n2',
        title: 'New "Chrono Odyssey" Expansion Announced',
        category: 'Update',
        summary: 'A new chapter unfolds. Discover new lands, quests, and mysteries in the upcoming expansion.',
        imageUrl: 'https://picsum.photos/seed/news2/800/600'
    },
    {
        id: 'n3',
        title: 'Creator Spotlight: The Minds Behind CyberCity',
        category: 'Community',
        summary: 'We sat down with SynthBuilders to talk about their inspiration and the future of city-building sims.',
        imageUrl: 'https://picsum.photos/seed/news3/800/600'
    }
];

const placeholderModelUrl = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Box/glTF-Binary/Box.glb';

export const avatarItems: AvatarItem[] = [
  // Avatars
  { id: 'avatar_male', name: 'Male', modelUrl: 'https://models.readyplayer.me/68b4527d9897f0fa4b95e937.glb', category: 'Avatars', thumbnailUrl: 'https://api.readyplayer.me/v1/avatars/68b4527d9897f0fa4b95e937.png?scene=fullbody-portrait-v1' },
  { id: 'avatar_female', name: 'Female', modelUrl: 'https://models.readyplayer.me/68b451ac8e571f7322bb7e5a.glb', category: 'Avatars', thumbnailUrl: 'https://api.readyplayer.me/v1/avatars/68b451ac8e571f7322bb7e5a.png?scene=fullbody-portrait-v1' },
  // Hats
  { id: 'hat1', name: 'Blue Beanie', modelUrl: placeholderModelUrl, category: 'Hats' },
  { id: 'hat2', name: 'Red Cap', modelUrl: placeholderModelUrl, category: 'Hats' },
  { id: 'hat3', name: 'Top Hat', modelUrl: placeholderModelUrl, category: 'Hats' },
  { id: 'hat4', name: 'Cowboy Hat', modelUrl: placeholderModelUrl, category: 'Hats' },
  // Shirts
  { id: 'shirt1', name: 'ATLAX Hoodie', modelUrl: placeholderModelUrl, category: 'Shirts' },
  { id: 'shirt2', name: 'Denim Jacket', modelUrl: placeholderModelUrl, category: 'Shirts' },
  { id: 'shirt3', name: 'T-Shirt', modelUrl: placeholderModelUrl, category: 'Shirts' },
  { id: 'shirt4', 'name': 'Flannel', modelUrl: placeholderModelUrl, category: 'Shirts' },
  // Pants
  { id: 'pants1', name: 'Jeans', modelUrl: placeholderModelUrl, category: 'Pants' },
  { id: 'pants2', name: 'Cargo Shorts', modelUrl: placeholderModelUrl, category: 'Pants' },
  { id: 'pants3', name: 'Sweatpants', modelUrl: placeholderModelUrl, category: 'Pants' },
  { id: 'pants4', name: 'Ripped Jeans', modelUrl: placeholderModelUrl, category: 'Pants' },
  // Accessories
  { id: 'acc1', name: 'Cool Shades', modelUrl: placeholderModelUrl, category: 'Accessories' },
  { id: 'acc2', name: 'Backpack', modelUrl: placeholderModelUrl, category: 'Accessories' },
  { id: 'acc3', name: 'Gold Chain', modelUrl: placeholderModelUrl, category: 'Accessories' },
  { id: 'acc4', name: 'Scarf', modelUrl: placeholderModelUrl, category: 'Accessories' },
];

export const mockTransactions: Transaction[] = [
    { id: 't1', date: '2024-07-20', description: 'Monthly Subscription Fee', amount: -9.99 },
    { id: 't2', date: '2024-07-18', description: 'Added Funds', amount: 25.00 },
    { id: 't3', date: '2024-07-15', description: 'Void Runners - "Starlight" Skin', amount: -5.00 },
    { id: 't4', date: '2024-07-12', description: 'Mystic Realms - "Dragon Scale" Armor', amount: -15.00 },
    { id: 't5', date: '2024-07-01', description: 'Added Funds', amount: 10.00 },
    { id: 't6', date: '2024-06-20', description: 'Monthly Subscription Fee', amount: -9.99 },
];
