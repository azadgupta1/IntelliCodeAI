import prisma from '../config/db.js'

// Utility to get the date range
const getStartDate = (filter) => {
  const now = new Date()
  if (filter === '7d') return new Date(now.setDate(now.getDate() - 7))
  if (filter === '31d') return new Date(now.setDate(now.getDate() - 31))
  if (filter === '3m') return new Date(now.setMonth(now.getMonth() - 3))
  return new Date(0) // fallback: everything
}

// GET /github/repo/:repoId/error-history?range=7d|31d|3m
export const getRepoErrorHistory = async (req, res) => {
  try {
    const { repoId } = req.params
    const { range = '7d' } = req.query

    const startDate = getStartDate(range)

    const history = await prisma.repoErrorHistory.findMany({
      where: {
        repoId: Number(repoId),
        timestamp: {
          gte: startDate,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    })

    console.log(history);
    res.status(200).json({ success: true, data: history })
  } catch (error) {
    console.error('Error fetching error history:', error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
