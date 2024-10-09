const db = require('../config/config')



const createCategory = async(req, res) => {
    const { title } = req.body;
    await db.execute(
        'INSERT into category (title) values (?)',
        [title]
    ).then((response) => {
        return res.status(200).json({response});
    }).catch((e) => {
        return res.status(500).json({message : e.message});
    });
}

const getCategory = async(req, res) => {
    const { id } = req.params;
    await db.execute(
        'SELECT * FROM category WHERE category_id = ?',
        [id]
    ).then((response) => {
        return res.status(200).json({results : response[0]})
    }).catch((e) => {
        return res.status(500).json({message : e.message});
    });
}

const getAllCategory = async(req, res) => {
    await db.execute(
        'SELECT category_id, title from category'
    ).then((response) => {
        return res.status(200).json({results : response[0]})
    }).catch((e) => {
        return res.status(500).json({message : e.message});
    });
}

const updateCategory = async(req, res) => {

    const {category_id , title} = req.body;

    await db.execute(
        'UPDATE category set title = ? WHERE category_id = ?',
        [title, category_id]
    ).then((response) => {
        return res.status(200).json({response})
    }).catch((e) => {
        return res.status(500).json({message : e.message});
    });

}

const deleteCategory = async(req, res) => {
    const { category_id } = req.body;
    await db.execute(
        'DELETE from category where category_id = ?',
        [category_id]
    ).then((response) => {
        return res.status(200).json({response})
    }).catch((e) => {
        return res.status(500).json({message : e.message});
    });
}


module.exports = {
    createCategory,
    getCategory,
    getAllCategory,
    updateCategory,
    deleteCategory
}