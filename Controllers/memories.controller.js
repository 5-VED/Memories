const { StatusCodes } = require('http-status-codes')
const Memory = require('../Models/memories.model')
const User = require('../Models/user.model')



exports.createPost = async (req, res) => {
    try {
        const { avatar, gallery } = req.files;// Access uploaded files using req.files

        // Access other form fields from req.body
        const { title, create, message, tags, userId } = req.body;

        // Create a new Memory object with the uploaded files and form data
        const result = await new Memory({
            title,
            create,
            message,
            tags,
            avatar: avatar[0].path,  // Assuming only one file for 'avatar'
            gallery: gallery[0].path,  // Map all 'gallery' files
            userId
        });

        // Save the newMemory object to the database (assuming you have a database)
        await result.save();

        return res.status(StatusCodes.CREATED).json({ message: 'Post created successfully', data: result });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong try againg later ", error: error.message })
    }
}

exports.getPost = async (req, res) => {
    try {

        const result = await Memory.findOne({ _id: req.params.id })

        if (!result) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Memory does not exist please enter valid input" })
        }

        return res.status(StatusCodes.OK).json({ message: "Data Fetched Successfuly", data: result })


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong try againg later ", error: error })
    }
}

exports.getAllPosts = async (req, res) => {
    try {

        const userId = req.params.userId

        const userExists = await User.exists({ _id: userId })

        if (!userExists) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
        }

        const result = await Memory.find({ userId })

        if (result.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'No Post Found' });
        }
        return res.status(StatusCodes.OK).json({ message: "Posts Fetched Successfully", data: result })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong try againg later ", error: error })
    }
}