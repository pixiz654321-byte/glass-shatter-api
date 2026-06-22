export default async function handler(req, res) {
    // 🌍 બ્લોગર સાઇટ પરથી કનેક્શન આપવા માટે CORS હેડર્સ લોક કર્યા
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'માત્ર POST રિક્વેસ્ટ જ ચાલશે' });
    }

    try {
        const { image, duration, pieces } = req.body;
        
        res.setHeader('Content-Type', 'video/webm');
        return res.status(200).send(Buffer.from(image.split(',')[1], 'base64')); 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
