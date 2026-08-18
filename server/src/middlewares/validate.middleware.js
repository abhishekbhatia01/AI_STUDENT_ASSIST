    export const validateRequest = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        console.log(result.error);
        if (!result.success) {
        return res.status(400).json({
            message: "Vlaidation error",
            errors: result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
            })),
        });
        }

        req.body = result.data;
        next();
    };
    };
