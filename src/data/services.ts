import type { Service } from '../types';

export const services: Service[] = [
    {
        slug: 'hair-transplant',
        title: 'Hair Transplant',
        shortDescription: 'Advanced FUE and DHI techniques for natural-looking results',
        fullDescription: `Turkey has become the world's leading destination for hair transplant procedures, offering cutting-edge FUE (Follicular Unit Extraction) and DHI (Direct Hair Implantation) techniques. Our partner clinics use the latest technology and methods to ensure natural-looking results with minimal scarring.

The procedure involves extracting individual hair follicles from donor areas and implanting them in balding or thinning areas. With experienced surgeons and state-of-the-art facilities, patients achieve excellent density and natural hairlines.

Our clinics provide comprehensive aftercare support and guarantee optimal results. The procedure is performed under local anesthesia, making it virtually painless with quick recovery times.`,
        benefits: [
            'Natural-looking results with advanced FUE/DHI techniques',
            'Minimal scarring and fast recovery time',
            'Experienced surgeons with international training',
            'Lifetime warranty on transplanted grafts',
            'All-inclusive packages with accommodation',
            'Personalized treatment plans'
        ],
        price: {
            min: 1500,
            max: 3000,
            currency: 'EUR'
        },
        duration: '6-8 hours',
        recovery: '7-10 days',
        icon: 'User',
        image: '/images/hair-transplant.jpg'
    },
    {
        slug: 'dental-implants',
        title: 'Dental Implants',
        shortDescription: 'Premium dental implants with German-quality materials',
        fullDescription: `Transform your smile with high-quality dental implants performed by expert dentists in Turkey. Our partner clinics use premium materials from leading European manufacturers, ensuring durability and natural aesthetics.

Dental implants are the gold standard for replacing missing teeth. Unlike dentures or bridges, implants are permanently anchored into your jawbone, providing stability and preventing bone loss. The procedure involves placing titanium posts that fuse with your bone, followed by custom-made crowns that match your natural teeth.

Turkish dental clinics are equipped with the latest CAD/CAM technology for precise planning and execution. With significantly lower costs compared to Western Europe and the US, you can achieve a perfect smile without breaking the bank.`,
        benefits: [
            'Premium Swiss/German implant materials',
            'Digital smile design technology',
            'Experienced prosthodontists and oral surgeons',
            'Lifetime warranty on implants',
            'All-on-4 and All-on-6 options available',
            'Save up to 70% compared to EU/US prices'
        ],
        price: {
            min: 400,
            max: 800,
            currency: 'EUR'
        },
        duration: '3-5 days (multiple visits)',
        recovery: '3-7 days',
        icon: 'Heart',
        image: '/images/dental-implants.jpg'
    },
    {
        slug: 'cosmetic-surgery',
        title: 'Cosmetic Surgery',
        shortDescription: 'Expert plastic surgery procedures with natural results',
        fullDescription: `Turkey is renowned for its world-class plastic surgeons who specialize in various cosmetic procedures including rhinoplasty, breast augmentation, liposuction, tummy tucks, and facelifts. Our partner surgeons are internationally certified and have performed thousands of successful procedures.

Turkish plastic surgeons combine European training with competitive pricing, making Turkey a top destination for medical tourism. Procedures are performed in JCI-accredited hospitals with the latest technology and strict safety protocols.

Whether you're looking for facial rejuvenation, body contouring, or reconstructive surgery, our clinics provide personalized treatment plans tailored to your goals. Pre-operative consultations include 3D simulations to help you visualize expected results.`,
        benefits: [
            'Board-certified plastic surgeons',
            'JCI-accredited hospital facilities',
            'Comprehensive pre and post-operative care',
            '3D simulation technology for planning',
            'VIP transfer and luxury accommodation',
            'Save 50-70% compared to Western countries'
        ],
        price: {
            min: 2500,
            max: 6000,
            currency: 'EUR'
        },
        duration: '2-4 hours (varies by procedure)',
        recovery: '1-3 weeks',
        icon: 'Sparkles',
        image: '/images/cosmetic-surgery.jpg'
    },
    {
        slug: 'eye-surgery',
        title: 'Eye Surgery (LASIK)',
        shortDescription: 'Advanced laser eye surgery for vision correction',
        fullDescription: `Achieve perfect vision with advanced LASIK and laser eye surgery in Turkey. Our partner ophthalmology clinics use the latest femtosecond laser technology for bladeless, precise corrections of nearsightedness, farsightedness, and astigmatism.

Turkish eye clinics are equipped with cutting-edge diagnostic equipment including wavefront analyzers and corneal topographers for detailed eye mapping. Experienced surgeons perform thorough pre-operative evaluations to determine the best treatment method for each patient.

The procedure takes only 10-15 minutes per eye and is virtually painless. Most patients experience improved vision within 24 hours and achieve 20/20 vision or better. With lifetime follow-up care and enhancement guarantees, you can trust Turkish eye clinics for safe, effective results.`,
        benefits: [
            'Latest femtosecond laser technology',
            'Experienced ophthalmologists',
            'Bladeless, computer-guided procedures',
            'Comprehensive pre-operative screening',
            'Lifetime enhancement guarantee',
            'Quick recovery with minimal discomfort'
        ],
        price: {
            min: 1200,
            max: 2000,
            currency: 'EUR'
        },
        duration: '15-20 minutes per eye',
        recovery: '24-48 hours',
        icon: 'Eye',
        image: '/images/eye-surgery.jpg'
    }
];

export function getServiceBySlug(slug: string): Service | undefined {
    return services.find(service => service.slug === slug);
}