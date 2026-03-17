const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    console.log('Seed engine initiated...')

    // Upsert Teams
    const csk = await prisma.team.upsert({
        where: { name: 'CSK' },
        update: {},
        create: {
            name: 'CSK',
            fullName: 'Chennai Super Kings',
            homeVenue: 'M. A. Chidambaram Stadium',
            strengthScore: 85,
        },
    })

    const mi = await prisma.team.upsert({
        where: { name: 'MI' },
        update: {},
        create: {
            name: 'MI',
            fullName: 'Mumbai Indians',
            homeVenue: 'Wankhede Stadium',
            strengthScore: 82,
        },
    })

    // Seed Players
    await prisma.player.create({
        data: {
            name: 'Virat Kohli',
            role: 'Batter',
            nationality: 'Indian',
            iplTeam: 'RCB',
            overallRating: 94,
            careerRuns: 8661,
            careerSR: 132.85,
            analytics: {
                archetype: "Elite Anchor",
                scoutVerdict: "One of the most consistent run-scorers in IPL history.",
                auctionCeiling: 21.0
            }
        }
    })

    await prisma.player.create({
        data: {
            name: 'Jasprit Bumrah',
            role: 'Bowler',
            nationality: 'Indian',
            iplTeam: 'MI',
            overallRating: 95,
            careerWickets: 183,
            careerEcon: 7.24,
            analytics: {
                archetype: "Death Over Specialist",
                scoutVerdict: "Arguably the best bowler in world cricket.",
                auctionCeiling: 18.0
            }
        }
    })

    console.log('Seed data successfully injected into vault.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
