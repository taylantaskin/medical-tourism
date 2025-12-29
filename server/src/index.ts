import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireAdmin, AuthRequest } from './middleware/auth';

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = (process.env.JWT_SECRET || 'fallback-secret-key') as string;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '7d') as string;

// Initialize Prisma
export const prisma = new PrismaClient();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'TurkHealth API is running' });
});

// ============================================
// AUTH ENDPOINTS
// ============================================

// POST /api/auth/login - Admin login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: 'Email and password are required'
            });
        }

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user || !user.active) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
        );

        // Update last login
        await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() }
        });

        res.json({
            success: true,
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: 'Login failed'
        });
    }
});


// GET /api/auth/me - Get current user
app.get('/api/auth/me', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user!.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                active: true,
                createdAt: true,
                lastLogin: true
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get user'
        });
    }
});

// ============================================
// CLINICS ENDPOINTS
// ============================================

// GET /api/clinics - Get all clinics
app.get('/api/clinics', async (req, res) => {
    try {
        const { specialty, city, featured } = req.query;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {
            active: true
        };

        if (specialty) {
            where.specialties = {
                has: specialty as string
            };
        }

        if (city) {
            where.city = city as string;
        }

        if (featured === 'true') {
            where.featured = true;
        }

        const clinics = await prisma.clinic.findMany({
            where,
            orderBy: [
                { featured: 'desc' },
                { rating: 'desc' }
            ]
        });

        res.json({
            success: true,
            data: clinics,
            count: clinics.length
        });
    } catch (error) {
        console.error('Error fetching clinics:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch clinics'
        });
    }
});

// GET /api/clinics/:id - Get single clinic
app.get('/api/clinics/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const clinic = await prisma.clinic.findUnique({
            where: { id },
            include: {
                applications: {
                    take: 10,
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!clinic) {
            return res.status(404).json({
                success: false,
                error: 'Clinic not found'
            });
        }

        res.json({
            success: true,
            data: clinic
        });
    } catch (error) {
        console.error('Error fetching clinic:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch clinic'
        });
    }
});

// POST /api/clinics - Create new clinic (admin)
app.post('/api/clinics', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const {
            name,
            slug,
            city,
            country,
            address,
            specialties,
            phone,
            email,
            website,
            description,
            featured,
            verified
        } = req.body;

        // Validation
        if (!name || !slug || !city || !phone || !email || !description || !specialties) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const clinic = await prisma.clinic.create({
            data: {
                name,
                slug,
                city,
                country: country || 'Turkey',
                address,
                specialties,
                phone,
                email,
                website,
                description,
                featured: featured || false,
                verified: verified || false
            }
        });

        res.status(201).json({
            success: true,
            data: clinic,
            message: 'Clinic created successfully'
        });
    } catch (error) {
        console.error('Error creating clinic:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create clinic'
        });
    }
});

// PUT /api/clinics/:id - Update clinic (admin)
app.put('/api/clinics/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            slug,
            city,
            country,
            address,
            specialties,
            phone,
            email,
            website,
            description,
            featured,
            verified,
            active
        } = req.body;

        const clinic = await prisma.clinic.update({
            where: { id },
            data: {
                name,
                slug,
                city,
                country,
                address,
                specialties,
                phone,
                email,
                website,
                description,
                featured,
                verified,
                active
            }
        });

        res.json({
            success: true,
            data: clinic,
            message: 'Clinic updated successfully'
        });
    } catch (error) {
        console.error('Error updating clinic:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update clinic'
        });
    }
});

// DELETE /api/clinics/:id - Delete clinic (admin) - Soft delete
app.delete('/api/clinics/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;

        // Soft delete - set active to false
        const clinic = await prisma.clinic.update({
            where: { id },
            data: { active: false }
        });

        res.json({
            success: true,
            data: clinic,
            message: 'Clinic deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting clinic:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete clinic'
        });
    }
});

// ============================================
// APPLICATIONS ENDPOINTS
// ============================================

// POST /api/applications - Create new application
app.post('/api/applications', async (req, res) => {
    try {
        console.log('\n========================================');
        console.log('📨 NEW APPLICATION RECEIVED!');
        console.log('========================================');
        console.log('⏰ Time:', new Date().toLocaleString('en-US'));
        console.log('📋 Request Body:', JSON.stringify(req.body, null, 2));

        const {
            name,
            email,
            phone,
            country,
            age,
            treatment,
            message,
            budget,
            urgency
        } = req.body;

        // Validation
        if (!name || !email || !phone || !treatment || !message) {
            console.log('❌ Validation Error: Missing required fields');
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        console.log('✅ Validation Successful');
        console.log('💾 Saving to database...');

        const application = await prisma.application.create({
            data: {
                name,
                email,
                phone,
                country: country || 'Spain',
                age,
                treatment,
                message,
                budget,
                urgency: urgency || 'normal',
                status: 'pending'
            }
        });

        console.log('✅ Successfully Saved!');
        console.log('🆔 Application ID:', application.id);
        console.log('👤 Name:', application.name);
        console.log('📧 Email:', application.email);
        console.log('📱 Phone:', application.phone);
        console.log('🏥 Treatment:', application.treatment);
        console.log('📊 Status:', application.status);
        console.log('========================================\n');

        res.status(201).json({
            success: true,
            data: application,
            message: 'Application submitted successfully'
        });
    } catch (error) {
        console.error('\n❌❌❌ ERROR OCCURRED! ❌❌❌');
        console.error('Error creating application:', error);
        console.error('========================================\n');
        res.status(500).json({
            success: false,
            error: 'Failed to submit application'
        });
    }
});

// GET /api/applications - Get all applications (admin)
app.get('/api/applications', authenticateToken, requireAdmin, async (req: AuthRequest, res) => {
    try {
        const { status, treatment } = req.query;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const where: any = {};

        if (status) {
            where.status = status as string;
        }

        if (treatment) {
            where.treatment = treatment as string;
        }

        const applications = await prisma.application.findMany({
            where,
            include: {
                clinic: true
            },
            orderBy: { createdAt: 'desc' }
        });

        res.json({
            success: true,
            data: applications,
            count: applications.length
        });
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch applications'
        });
    }
});

// ============================================
// STATS ENDPOINT
// ============================================

// GET /api/stats - Get platform statistics
app.get('/api/stats', async (req, res) => {
    try {
        const [clinicsCount, applicationsCount, totalPatients] = await Promise.all([
            prisma.clinic.count({ where: { active: true } }),
            prisma.application.count(),
            prisma.clinic.aggregate({
                _sum: {
                    totalPatients: true
                }
            })
        ]);

        res.json({
            success: true,
            data: {
                clinics: clinicsCount,
                applications: applicationsCount,
                totalPatients: totalPatients._sum.totalPatients || 0,
                countries: 100 // Static for now
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stats'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║   🏥 TURKHEALTH BACKEND SERVER 🏥     ║');
    console.log('╚════════════════════════════════════════╝\n');
    console.log('✅ Server Status: RUNNING');
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🗄️  Database: Connected (Supabase)`);
    console.log('\n📋 Available Endpoints:');
    console.log('   POST   /api/applications  (Public)');
    console.log('   GET    /api/clinics       (Public)');
    console.log('   POST   /api/auth/login    (Public)');
    console.log('   GET    /api/applications  (Admin)');
    console.log('   POST   /api/clinics       (Admin)');
    console.log('\n💡 Logs are active - You will see them here when forms are submitted!\n');
    console.log('════════════════════════════════════════\n');
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit(0);
});