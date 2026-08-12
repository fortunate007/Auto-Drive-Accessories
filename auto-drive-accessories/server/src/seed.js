import { prisma } from './db.js';

// Same catalog used on the original showcase site, now living in the database
// instead of hardcoded markup. Edit this list, then re-run `npm run seed`.
const products = [
  {
    partNumber: 'PN-014',
    name: 'Heavy-Duty Rubber Floor Mats',
    description: 'All-weather set that traps mud and dust before it reaches your carpet.',
    price: 3500,
    category: 'Interior',
    icon: 'floor-mats'
  },
  {
    partNumber: 'PN-021',
    name: 'Leatherette Seat Cover Set',
    description: 'Full-set cushioned covers, fitted for front and rear seats.',
    price: 6800,
    category: 'Interior',
    icon: 'seat-cover'
  },
  {
    partNumber: 'PN-108',
    name: '4K Dual Dash Cam',
    description: 'Front and rear recording with loop capture and night mode.',
    price: 8200,
    category: 'Electronics',
    icon: 'dash-cam'
  },
  {
    partNumber: 'PN-112',
    name: 'Magnetic Phone Mount',
    description: 'Vent-clip mount, six-magnet grip, one-hand release.',
    price: 1200,
    category: 'Electronics',
    icon: 'phone-mount'
  },
  {
    partNumber: 'PN-119',
    name: '65W Fast Car Charger',
    description: 'Dual USB-C ports, enough power for two phones at once.',
    price: 1800,
    category: 'Electronics',
    icon: 'charger'
  },
  {
    partNumber: 'PN-203',
    name: '22" LED Light Bar',
    description: 'Combo-beam bar for murram roads and early starts upcountry.',
    price: 12500,
    category: 'Exterior',
    icon: 'light-bar'
  },
  {
    partNumber: 'PN-207',
    name: 'Splash Guard Mud Flap Set',
    description: 'Four-piece set, cut to fit, keeps grime off the paintwork.',
    price: 2400,
    category: 'Exterior',
    icon: 'mud-flap'
  },
  {
    partNumber: 'PN-301',
    name: '12V Portable Car Vacuum',
    description: 'Corded from the socket, enough suction for crumbs and dust.',
    price: 3200,
    category: 'Care & Tools',
    icon: 'vacuum'
  },
  {
    partNumber: 'PN-305',
    name: '32-Piece Roadside Tool Kit',
    description: 'Screwdrivers, pliers, tyre gauge and jump cables in one case.',
    price: 4600,
    category: 'Care & Tools',
    icon: 'tool-kit'
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { partNumber: product.partNumber },
      update: product,
      create: product
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
