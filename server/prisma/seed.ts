// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Admin User
    const passwordHash = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@turkhealth.com' },
        update: {},
        create: {
            email: 'admin@turkhealth.com',
            name: 'Admin User',
            passwordHash,
            role: 'super_admin',
        },
    })
    console.log('✅ Admin user created:', admin.email)

    // 2. Clinics
    const clinic1 = await prisma.clinic.create({
        data: {
            name: 'Istanbul Hair Clinic',
            slug: 'istanbul-hair-clinic',
            city: 'Istanbul',
            specialties: ['hair'],
            phone: '+90 212 123 4567',
            email: 'info@istanbulhair.com',
            rating: 4.8,
            description: 'Leading hair transplant clinic with over 10 years of experience. We use the latest FUE and DHI techniques.',
            featured: true,
            verified: true,
            totalPatients: 1250,
        },
    })

    const clinic2 = await prisma.clinic.create({
        data: {
            name: 'Smile Dental Turkey',
            slug: 'smile-dental-turkey',
            city: 'Antalya',
            specialties: ['dental'],
            phone: '+90 242 123 4567',
            email: 'info@smiledental.com',
            rating: 4.9,
            description: 'Premium dental clinic offering implants, veneers, and smile makeovers. State-of-the-art facilities.',
            featured: true,
            verified: true,
            totalPatients: 890,
        },
    })

    console.log('✅ Created 2 clinics')

    // 3. Applications
    await prisma.application.create({
        data: {
            name: 'Carlos Martinez',
            email: 'carlos@example.com',
            phone: '+34 612 345 678',
            country: 'Spain',
            age: 32,
            treatment: 'hair',
            message: 'Interested in FUE hair transplant. Please provide details.',
            status: 'pending',
        },
    })

    console.log('✅ Created 1 application')

    // 4. Blog Post
    await prisma.post.create({
        data: {
            title: 'Complete Guide to Hair Transplant in Turkey',
            slug: 'hair-transplant-turkey-guide',
            excerpt: 'Everything you need to know about getting a hair transplant in Turkey.',
            content: 'Full guide content here...',
            category: 'hair',
            tags: ['hair-transplant', 'turkey', 'guide'],
            published: true,
            featured: true,
            publishedAt: new Date(),
        },
    })

    console.log('✅ Created 1 blog post')
    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })