import cron from 'node-cron';
import prisma from '../config/db.js'; // Adjust path if needed

// This runs every day at 23:59:59
cron.schedule('59 59 23 * * *', async () => {
  console.log('📸 Taking daily errorCount snapshot...');

  try {
    const repos = await prisma.githubRepo.findMany({
      select: { id: true, errorCount: true },
    });

    const snapshots = repos.map(repo => ({
      repoId: repo.id,
      errorCount: repo.errorCount,
      timestamp: new Date(), // defaults to now()
    }));

    await prisma.repoErrorHistory.createMany({
      data: snapshots,
    });

    console.log(`✅ ${snapshots.length} snapshots saved.`);
  } catch (error) {
    console.error('❌ Failed to take daily errorCount snapshot:', error.message);
  }
});
