const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        });
    }

    try {
        const { name, email, phone, claimType, message } = req.body;

        if (!name || !email || !phone || !claimType || !message) {
            return res.status(400).json({
                message: "Please fill in all fields."
            });
        }

        await sql`
            INSERT INTO claims
            (name, email, phone, claim_type, message)
            VALUES
            (${name}, ${email}, ${phone}, ${claimType}, ${message})
        `;

        return res.status(200).json({
            message: "Claim request submitted successfully!"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong. Please try again."
        });
    }
};