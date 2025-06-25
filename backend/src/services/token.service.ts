import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import config from '../config';
import { prisma } from '../config/prisma-client';

export function generateAccessToken(user: { id: string }) {
    const payload = { userId: user.id };

    const options: jwt.SignOptions = {
      expiresIn: config.jwt.expiresIn as jwt.SignOptions["expiresIn"],
    };

    return jwt.sign(payload, config.jwt.accessTokenSecret, options);
}

// Hàm tạo Refresh Token và lưu vào DB
export async function generateRefreshToken(userId: string, ipAddress: string, deviceInfo: string) {
    const refreshToken = crypto.randomBytes(40).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + config.jwt.refreshTokenExpiresInDays);

    await prisma.refreshToken.create({
        data: {
            userId,
            hashedToken,
            expiresAt,
            ipAddress,
            deviceInfo,
        },
    });

    return refreshToken;
}