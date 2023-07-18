export function withMethods(method, handler) {
    return async function (req, res) {
        if (req.method && !method.includes(req.method)) {
            return res.status(405).json({ message: "wrong method was used" })
        }

        return handler(req, res);
    }
}