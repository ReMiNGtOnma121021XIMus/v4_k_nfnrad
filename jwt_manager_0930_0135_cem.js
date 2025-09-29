// 代码生成时间: 2025-09-30 01:35:23
const jwt = require('jsonwebtoken');

// 配置文件
const config = {
    // 密钥
    secretKey: process.env.JWT_SECRET_KEY || 'your-secret-key',
    // 过期时间（例如：'1h' 表示1小时）
    expiresIn: '1h'
};

// 生成JWT令牌
function generateToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, config.secretKey, { expiresIn: config.expiresIn }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });
}

// 验证JWT令牌
function verifyToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, (err, payload) => {
            if (err) reject(err);
            else resolve(payload);
        });
    });
}

// 检查令牌是否过期
function isTokenExpired(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.secretKey, (err, payload) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    resolve(false);
                } else {
                    reject(err);
                }
            } else {
                resolve(true);
            }
        });
    });
}

// 导出模块
module.exports = {
    generateToken,
    verifyToken,
    isTokenExpired
};

// 使用示例
/*
const token = await generateToken({ username: 'user1' });
console.log('Generated Token:', token);

try {
    const verified = await verifyToken(token);
    console.log('Verified Payload:', verified);
} catch (error) {
    console.error('Verification Error:', error.message);
}

try {
    const notExpired = await isTokenExpired(token);
    console.log('Is Token Expired?', notExpired);
} catch (error) {
    console.error('Check Token Expiration Error:', error.message);
}
*/