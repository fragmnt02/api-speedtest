module.exports = (req, res) => {
    console.log({body: req.body});
    res.json({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    })
}