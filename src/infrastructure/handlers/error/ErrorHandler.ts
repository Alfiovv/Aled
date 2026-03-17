import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const ErrorHandler = (err: Error, c: Context) => {
    console.error(err)

    if (err instanceof HTTPException) {
        return c.json(
            {
                success: false,
                message: err.message,
            },
            err.status
        )
    }

    return c.json(
        {
            success: false,
            message: 'Internal Server Error',
        },
        500
    )
}
