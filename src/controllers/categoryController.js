const helper = require('../helpers/index');
const categoryModel = require('../models/categoryModel');

module.exports = {
    getAllCategory: async function(request , response){
        try {
            const result = await categoryModel.getAllCategoryModel();
            return helper.response(response, 'success', result, 200);
        } catch (error){
            console.log(error);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    postCategory: async function(request, response){
        const setData = request.body;
        try {
            const result = await categoryModel.postCategoryModel(setData);
            return helper.response(response, 'success', result, 200);
        } catch(error) {
            console.log(error);
            return helpers.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    putCategory: async function(request, response){
        const setData = request.body;
        const id = request.params.id;
        try {
            const result =  await categoryModel.putCategoryModel(setData,id);
            return helper.response(response, 'success', result, 200);
        } catch(error) {
            console.log(error);
            return helper.response(response, 'fail', 'Internal Server Error', 500);
        }
    },

    deleteCategory: async function(req, res){
        const id = req.params.id;
        try{
            const result = await categoryModel.deleteCategoryModel(id);
            return helper.response(res, 'success', 'Berhasil Hapus data ke '+id , 200);
        } catch(error){
            console.log(error);
            return helper.response(res, 'fail', 'Internal Server Error', 500);
        }
    },
};