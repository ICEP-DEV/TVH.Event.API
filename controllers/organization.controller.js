const db = require("../config/config");


const getAllOrganizations = async (req, res) => {

    try{
        const response = await db.execute(
            "select * from organization"
        )
    
        return res.status(200).json({results : response[0]});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
}








module.exports = {
    getAllOrganizations

}
