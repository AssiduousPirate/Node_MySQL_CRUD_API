const { writePool, readPool } = require("../utils/database")
const fs = require("fs")
const path = require("path")

class ApiController {
    async index (req, res) {
        try{
            const data = readPool.query("SELECT * FROM `posts`")
            return res.status(200).json(data)
        } catch (err){
            return res.status(500).json("An error occurred!" + err)
        }
    }

    async post(req, res) {
        try {
            const id = req.params.id
            let data = await readPool.query("SELECT * FROM `posts` WHERE `id` = ?",[id])
            data = data[0]
            if (!data) return res.status(500).json("An error occurred!")

            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json("An error occurred!" + err)
        }
    }

    async create(req, res) {
        try {
            const { name, title, description, city, category, status, author } = req.body
            let image = req.file.filename
            const index = await writePool.query("INSERT INTO `posts` (`name`, `title`, `description`, `image`, `city`, `category`, `status`, `author`) VALUES ?", [
                [
                    [name, title, description, image, city, category, status, author]
                ]
            ])

            if(!index) return res.status(500).json("An error occurred!")

            let post = await readPool.query("SELECT * FROM `posts` WHERE `id` = ?", [index.insertId])
            post = post[0]
            return res.status(200).json(post)
        } catch (err) {
            return res.status(500).json("An error occurred!" + err)
        }
    }

    async update(req, res) {
        try {
            const { id, name, title, description, city, category, status, author } = req.body
            let image = req.file.filename
            let postExists = await readPool.query("SELECT * FROM `posts` WHERE `id` = ? AND `status` = ?", [id, 'active'])
            postExists = postExists[0]
            if(!postExists) return res.status(500).json("Post doesn't exists!")

            let index = await writePool.query("UPDATE `posts` SET `name` = ?, `title` = ?, `description` = ?, `image` = ?, `city` = ?, `category` = ?, `status` = ?, `author` = ? WHERE `id` = ?", 
            [
                [
                    name === "" ? postExists.name : name,
                    title === "" ? postExists.title : title,
                    description === "" ? postExists.description : description,
                    image === "" ? postExists.image : image,
                    city === "" ? postExists.city : city,
                    category === "" ? postExists.category : category,
                    status === "" ? postExists.status : status,
                    author === "" ? postExists.author : author,
                    id
                ]
            ])

            const imagePath = path.join(__dirname, "..", "assets/image/" + image)

            fs.unlink(imagePath, function(err) {
                if (err) {
                    return res.status(500).json("An error occurred!")
                }
            })

            if(!index) return res.status(500).json("An error occurred!")

            return res.status(200).json("Post updated successfully!")
        } catch (err) {
            return res.status(500).json("An error occurred!" + err)
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id
            let postExists = await readPool.query("SELECT `name`, `image` FROM `posts` WHERE `id` = ?", [id])
            postExists = postExists[0]
            if(!postExists) return res.status.json("Post dosn't exists!")

            const imagePath = path.join(__dirname, "..", "assets/image/" + postExists.image)

            fs.unlink(imagePath, function(err) {
                if (err) {
                    return res.status(500).json("An error occurred!")
                }
            })

            let deletePost = await writePool.query("DELETE FROM `posts` WHERE `id` = ?", [id])

            if(!deletePost) return res.status(500).json("An error occurred!")
            return res.status(200).json("Post deleted successfully!")
        } catch (err) {
            return res.status(500).json("An error occurred!" + err)
        }
    }
}
module.exports = new ApiController()