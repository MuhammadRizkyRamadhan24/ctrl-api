const helper = require('../helpers/index');
const portoModel = require('../models/portoModel');
const fs = require('fs');
const path = './src/public/images';

module.exports = {
    getAllPorto: async function(req, res){
        console.log(req.decodedToken);
        try{
            const result = await portoModel.getAllPortoModel();
            return helper.response(res, 'success', result, 200);
        } catch (error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    getPortoById: async function(req, res){
        try{
            const id = req.params.id;
            const result = await portoModel.getDataById(id);
            return helper.response(res, 'success', result, 200);
        } catch (error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    getSeacrhPorto: async function(req, res){
        const limit = parseInt(req.query.limit) || 20;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'asc';
        const order = req.query.order || 'created_at';
        const search = `%${req.query.search}%` || '';
        try{
            const result = await portoModel.getSearchPortoModel(search, order, sort, limit, page)
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

    postPorto: async function(req, res){
        const setData = req.body;
        setData.image_project = req.file.filename;
        try {
            const result = await portoModel.postPortoModel(setData);
            return helper.response(res, 'success', result, 200);
        } catch(error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },

    putPorto: async function(req, res){
        try{
            const body = req.body;
            const id = req.params.id;
            const oldData = await portoModel.getDataById(id);
            const setData = {
                ...body,
                image_project: req.file.filename
            }
            const result = await portoModel.putPortoModel(setData, id);
            const newData = {
                id: id,
                ...setData
            }

            if (result.affectedRows > 0){
                fs.unlinkSync(path + '/' + oldData[0].image_project);
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

    deletePorto: async function(req, res){
        const id = req.params.id;
        const data = await portoModel.getDataById(id);
        try{
            const result = await portoModel.deletePortoModel(id);
            if(result.affectedRows > 0 ){
                fs.unlinkSync(path + '/' + data[0].image_project);
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