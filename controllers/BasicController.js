require('dotenv').config()

class BasicController {
    handle(req, res, callback) {
        try {
            return callback(req, res)
        } catch (e) {
            console.log(e)
            this.responseError(res, e)
        }
    }

    responseError(res, e) {
        const data = {message: 'Server error.'}

        if (process.env.APP_ENV !== 'production') {
            data.stackTrace = e.toString()
        }

        return res.status(500)
            .json(data)
    }
}

module.exports = BasicController