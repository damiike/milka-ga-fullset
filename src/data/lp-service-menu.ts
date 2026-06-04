import generated from './cms-lash-menu.generated.json';
import { LASH_MENU_DESCRIPTIONS } from './lash-menu-descriptions';

type MenuItem = {
  name: string;
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
};

type MenuGroup = {
  category: string;
  items: MenuItem[];
};

/** Fallback when CMS export has not been run (local dev / subdomain root build). */
const FALLBACK_GROUPS: MenuGroup[] = [
  {
    category: 'Classic Lashes',
    items: [
      {
        name: 'Natural Classic Set',
        price: '$140',
        duration: '75 min',
        description: LASH_MENU_DESCRIPTIONS['Natural Classic Set'],
      },
      {
        name: 'Full Classic Set',
        price: '$160',
        duration: '120 min',
        description: LASH_MENU_DESCRIPTIONS['Full Classic Set'],
        popular: true,
      },
      {
        name: 'Half Classic Set',
        price: '$90',
        duration: '60 min',
        description: LASH_MENU_DESCRIPTIONS['Half Classic Set'],
      },
    ],
  },
  {
    category: 'Volume Lashes',
    items: [
      {
        name: 'Full Russian Volume Set',
        price: '$210',
        duration: '120 min',
        description: LASH_MENU_DESCRIPTIONS['Full Russian Volume Set'],
        popular: true,
      },
      {
        name: 'Russian Volume Natural Set',
        price: '$185',
        duration: '90 min',
        description: LASH_MENU_DESCRIPTIONS['Russian Volume Natural Set'],
      },
      {
        name: 'Full Mega Russian Volume Set',
        price: '$295',
        duration: '150 min',
        description: LASH_MENU_DESCRIPTIONS['Full Mega Russian Volume Set'],
      },
    ],
  },
  {
    category: 'Specialty Sets',
    items: [
      {
        name: 'Wet Look Full Set',
        price: '$180',
        duration: '120 min',
        description: LASH_MENU_DESCRIPTIONS['Wet Look Full Set'],
      },
      {
        name: 'Full Hybrid Set',
        price: '$185',
        duration: '120 min',
        description: LASH_MENU_DESCRIPTIONS['Full Hybrid Set'],
        popular: true,
      },
    ],
  },
  {
    category: 'Add-Ons',
    items: [
      {
        name: 'Bottom Lashes Add-On',
        price: '$60',
        duration: '+30 min',
        description: LASH_MENU_DESCRIPTIONS['Bottom Lashes Add-On'],
      },
      {
        name: 'Wispy Add-On',
        price: '$20',
        duration: '+15 min',
        description: LASH_MENU_DESCRIPTIONS['Wispy Add-On'],
        popular: true,
      },
    ],
  },
];

type GeneratedMenu = {
  heroFromPrice?: number | null;
  groups?: Array<{
    category: string;
    items: Array<{
      name: string;
      price: string;
      duration: string;
      popular?: boolean;
    }>;
  }>;
};

const cmsMenu = generated as GeneratedMenu;

function withDescriptions(
  groups: Array<{
    category: string;
    items: Array<{ name: string; price: string; duration: string; popular?: boolean }>;
  }>,
): MenuGroup[] {
  return groups.map((group) => ({
    category: group.category,
    items: group.items.map((item) => ({
      ...item,
      description: LASH_MENU_DESCRIPTIONS[item.name] || 'Book online for current service details.',
    })),
  }));
}

export const LP_HERO_FROM_PRICE =
  typeof cmsMenu.heroFromPrice === 'number' && cmsMenu.heroFromPrice > 0
    ? cmsMenu.heroFromPrice
    : 140;

export const LP_SERVICE_GROUPS: MenuGroup[] =
  cmsMenu.groups?.length ? withDescriptions(cmsMenu.groups) : FALLBACK_GROUPS;
