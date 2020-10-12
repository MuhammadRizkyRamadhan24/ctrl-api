const connection =  require('../helpers/mysql');
const { resolve } = require('path');

module.exports = {
    getAllPortoModel : function(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT portofolios.id, portofolios.name_project, portofolios.image_project, portofolios.description_project, portofolios.category_id, (SELECT name_category FROM categories WHERE portofolios.category_id = categories.id) AS name_category, portofolios.start_project, portofolios.finish_project, portofolios.created_at, portofolios.updated_at FROM portofolios INNER JOIN categories ON portofolios.category_id=categories.id', function(error, result){
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    getDataById: function(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT portofolios.id, portofolios.name_project, portofolios.image_project, portofolios.description_project, portofolios.category_id, (SELECT name_category FROM categories WHERE portofolios.category_id = categories.id) AS name_category, portofolios.start_project, portofolios.finish_project, portofolios.created_at, portofolios.updated_at FROM portofolios INNER JOIN categories ON portofolios.category_id=categories.id WHERE portofolios.id = ?', id, function(error, result){
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    },
   

    getSearchPortoModel : function(search, order, sort, limit, page){
        return new Promise((resolve, reject) =>{
            const offset = (limit * page) - limit;
            connection.query(`SELECT portofolios.id, portofolios.name_project, portofolios.image_project, portofolios.description_project, portofolios.category_id, (SELECT name_category FROM categories WHERE portofolios.category_id = categories.id) AS name_category, portofolios.start_project, portofolios.finish_project, portofolios.created_at, portofolios.updated_at FROM portofolios INNER JOIN categories ON portofolios.category_id=categories.id WHERE name_project LIKE ? OR name_category LIKE ? ORDER BY ${order} ${sort} LIMIT ? OFFSET ?`, [search, search, limit, offset], function(error, result){
                if (error){
                    reject(error);
                }
                
                resolve(result);
            });
        });
    },

    postPortoModel : function(setData, image_project){
        return new Promise((resolve, reject) =>{
            connection.query('INSERT INTO portofolios SET ?', setData, function(error, result){
                if (error) {
                    reject(error);
                };
                const newData = {
                    id: result.insertId,
                    ...setData
                }
                resolve(newData);
            });
        });
    },

    putPortoModel : function(setData, id){
        return new Promise((resolve, reject) =>{
            connection.query('UPDATE portofolios SET ? WHERE id=?', [setData, id], function(error, result){
                if (error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    deletePortoModel : function(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM portofolios WHERE id=?', id, function(error, result){
                if (error){
                    reject(error)
                } 
                resolve(result);
            });
        })
    },
}