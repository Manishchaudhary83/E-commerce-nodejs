const express = require("express")
const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(express.json())

app.use("/api/auth", authRoutes)


app.use((error, req, res, next) => {
    res.status(error.status ?? 500).json({
        message: error.message ?? "Intrenal server error"
    })
})

module.exports = app