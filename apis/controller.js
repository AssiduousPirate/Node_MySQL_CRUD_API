class ApiController {
    async index (req, res){
        try{
            const data = readPool.query("SELECT * FROM posts")
            res.status(200).json(data)
        } catch (err){
            res.status(404).json(err)
        }
    }
}
module.exports = new ApiController()