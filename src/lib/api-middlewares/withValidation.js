import * as z from "zod"

export default function withValidation(schema, handler) {
    return async function (req, res) {
        try {
            const body = await req.body ? await req.body : {};
            await schema.parse(body)
            return handler(req, res)
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(422).json({ ZodError: error.issues })
            } else {
                return res.status(422).end();
            }
        }
    }
}