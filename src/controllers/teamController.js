const helper = require('../helpers/index');
const teamModel = require('../models/teamModel');
const fs = require('fs');
const path = './src/public/images';

module.exports = {
    getAllTeam: async function(req, res){
        console.log(req.decodedToken);
        try{
            const result = await teamModel.getAllTeamModel();
            return helper.response(res, 'success', result, 200);
        } catch (error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    getTeamById: async function(req, res){
        try{
            const id = req.params.id;
            const result = await teamModel.getDataById(id);
            return helper.response(res, 'success', result, 200);
        } catch (error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    getSeacrhTeam: async function(req, res){
        const limit = parseInt(req.query.limit) || 8;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'asc';
        const order = req.query.order || 'created_at';
        const search = `%${req.query.search}%` || '';
        try{
            const result = await teamModel.getSearchTeamModel(search, order, sort, limit, page)
            if(result[0]){
                return helper.response(res, 'success', result, 200);
            } else {
                return helper.response(res, 'fail', 'Not find data', 404);
            }
        } catch(error){
            console.log(error);
                return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    postTeam: async function(req, res){
        const setData = req.body;
        setData.image_member = req.file.filename;
        try {
            const result = await teamModel.postTeamModel(setData);
            return helper.response(res, 'success', result, 200);
        } catch(error){
            console.log(error);
            fs.unlinkSync(path + '/' + req.file.filename);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    putTeam: async function(req, res){
        try{
            const body = req.body;
            const id = req.params.id;
            const oldData = await teamModel.getDataById(id);
            const setData = {
                ...body,
                image_member: req.file.filename
            }
            const result = await teamModel.putTeamModel(setData, id);
            const newData = {
                id: id,
                ...setData
            }

            if (result.affectedRows > 0){
                fs.unlinkSync(path + '/' + oldData[0].image_member);
                return helper.response(res, "success", newData, 200);
            } else {
                fs.unlinkSync(path + '/' + req.file.filename);
                return helper.response(res, "fail", "Data Not Found", 404);
            }
        } catch(error) {
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteTeam: async function(req, res){
        const id = req.params.id;
        const data = await teamModel.getDataById(id);
        try{
            const result = await teamModel.deleteTeamModel(id);
            if(result.affectedRows > 0 ){
                fs.unlinkSync(path + '/' + data[0].image_member);
                return helper.response(res,'success', `Successfully Deleted data ${id}`  , 200);
            } else {
                return helper.response(res, 'fail', 'Data Not Found', 404)
            }
        } catch(error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },
}