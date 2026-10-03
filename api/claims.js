const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {

    if (req.method !== "GET") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    // Check admin password
    const authHeader = req.headers.authorization || "";

    const password = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : "";

    if (!password || password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {

        const claims = await sql`
            SELECT
                id,
                name,
                email,
                phone,
                claim_type,
                message,
                submitted_at
            FROM claims
            ORDER BY submitted_at DESC
        `;

        return res.status(200).json(claims);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Unable to load claims."
        });
    }
};