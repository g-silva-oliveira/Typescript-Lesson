import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database with sample hobbies...');

  const hobbies = [
    {
      name: "Photography",
      description: "Capturing beautiful moments and memories through the lens",
      difficulty: "intermediate",
      category: "arts",
      isActive: true
    },
    {
      name: "Rock Climbing",
      description: "Ascending natural rock formations or artificial climbing walls",
      difficulty: "advanced",
      category: "outdoor",
      isActive: true
    },
    {
      name: "Chess",
      description: "Strategic board game of skill and tactics",
      difficulty: "intermediate",
      category: "indoor",
      isActive: true
    },
    {
      name: "Programming",
      description: "Creating software applications and solving problems with code",
      difficulty: "intermediate",
      category: "technology",
      isActive: true
    },
    {
      name: "Swimming",
      description: "Moving through water using various strokes and techniques",
      difficulty: "beginner",
      category: "sports",
      isActive: true
    },
    {
      name: "Painting",
      description: "Creating art using pigments and various painting techniques",
      difficulty: "beginner",
      category: "arts",
      isActive: true
    },
    {
      name: "Hiking",
      description: "Walking in natural environments, often in mountainous areas",
      difficulty: "beginner",
      category: "outdoor",
      isActive: true
    },
    {
      name: "3D Printing",
      description: "Creating physical objects from digital designs using additive manufacturing",
      difficulty: "advanced",
      category: "technology",
      isActive: false
    },
    {
      name: "Cooking",
      description: "Preparing delicious meals and exploring culinary arts",
      difficulty: "intermediate",
      category: "indoor",
      isActive: true
    },
    {
      name: "Basketball",
      description: "Team sport involving shooting a ball through a hoop",
      difficulty: "intermediate",
      category: "sports",
      isActive: true
    }
  ];

  for (const hobby of hobbies) {
    await prisma.hobby.create({
      data: hobby
    });
    console.log(`✅ Created hobby: ${hobby.name}`);
  }

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
