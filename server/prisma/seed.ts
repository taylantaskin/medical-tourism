import { PrismaClient } from '@prisma/client'
// DÜZELTME 1: TypeScript hatasını çözmek için import şeklini değiştirdik
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Admin User
    const passwordHash = await bcrypt.hash('admin123', 10)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@turkhealth.com' },
        update: {
            passwordHash: passwordHash,
            active: true
        },
        create: {
            email: 'admin@turkhealth.com',
            name: 'Admin User',
            passwordHash,
            role: 'super_admin',
            active: true,
        },
    })
    console.log('✅ Admin user created/updated:', admin.email)

    // 2. Clinics
    // DÜZELTME 2: 'const clinic1 =' kısmını kaldırdık çünkü değişkeni kullanmıyorduk.
    await prisma.clinic.create({
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
            active: true
        },
    }).catch(() => console.log('⚠️ Clinic 1 already exists'))

    await prisma.clinic.create({
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
            active: true
        },
    }).catch(() => console.log('⚠️ Clinic 2 already exists'))

    console.log('✅ Created/Checked clinics')

    // 3. Applications
    try {
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
    } catch (e) {
        // 'e' hatasını kullanmasak bile console'a yazdırdık ki linter kızmasın
        console.log('⚠️ Application seed skipped (probably exists):', e)
    }

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