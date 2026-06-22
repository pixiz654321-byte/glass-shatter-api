export default async function handler(req, res) {
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

