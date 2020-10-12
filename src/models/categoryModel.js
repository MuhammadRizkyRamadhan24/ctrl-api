const { concat } = require('joi');
const connection = require('../helpers/mysql');

module.exports = {
    getAllCategoryModel: function(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM categories', function(error, result){
                if (error) {
                    reject(error);
                };
                resolve(result);
            });
        });
    },

    postCategoryModel: function(setData){
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO categories SET ?', setData, function(error, result){
                if (error) {
                    reject(error);
                };
                const newData = {
                    id: result.insertId,
                    ...setData
                };
                resolve(newData);
            });
        });
    },

    putCategoryModel : function(setData, id){
        return new Promise((resolve, reject) =>{
            connection.query('UPDATE categories SET ? WHERE id=?', [setData, id], function(error){
                if (error){
                    reject(error);
                }
                const newData = {
                    id,
                    ...setData
                }
                resolve(newData);
            });
        });
    },

    deleteCategoryModel : function(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM categories WHERE id=?', id, function(error, result){
                if (error){
                    reject(error)
                } 
                resolve(result);
            });
        });
    }
}