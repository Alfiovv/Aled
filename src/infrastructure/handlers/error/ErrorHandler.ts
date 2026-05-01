import { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const ErrorHandler = (err: Error, c: Context) => {


    if (err instanceof HTTPException) {

        if (err.status >= 500) {
            console.error(err)
        }
        return c.json(
            {
                success: false,
                error: err.message,
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
