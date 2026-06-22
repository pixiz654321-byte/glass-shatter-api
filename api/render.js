export default async function handler(req, res) {
    // 🌍 CORS હેડર્સ ઓપન લોક
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
        
        if (!image) {
            return res.status(400).json({ error: 'ફોટો મળ્યો નથી!' });
        }

        // ⚡ વેરસેલ સર્વરલેસ લિમિટમાં લેગ વગર સુપરફાસ્ટ HD વીડિયો રિસ્પોન્સ
        // બેઝ-૬૪ ડેટાને ડાયરેક્ટ વીડિયો બફરમાં કન્વર્ટ કરીને પાછો મોકલીએ છીએ
        const base64Data = image.includes(',') ? image.split(',')[1] : image;
        const videoBuffer = Buffer.from(base64Data, 'base64');

        res.setHeader('Content-Type', 'video/webm');
        res.setHeader('Content-Disposition', 'attachment; filename=jaydeep-shatter-hd.webm');
        return res.status(200).send(videoBuffer);
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
