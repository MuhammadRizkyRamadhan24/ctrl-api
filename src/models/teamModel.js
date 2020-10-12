const connection =  require('../helpers/mysql');
const { resolve } = require('path');

module.exports = {
    getAllTeamModel : function(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM teams', function(error, result){
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    getDataById: function(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM teams WHERE id = ?', id, function(error, result){
                if (error) {
                    reject(error);
                }
                resolve(result);
            });
        });
    },
   

    getSearchTeamModel : function(search, order, sort, limit, page){
        return new Promise((resolve, reject) =>{
            const offset = (limit * page) - limit;
            connection.query(`SELECT * FROM teams WHERE name_member LIKE ? OR position LIKE ? ORDER BY ${order} ${sort} LIMIT ? OFFSET ?`, [search, search, limit, offset], function(error, result){
                if (error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    postTeamModel : function(setData){
        return new Promise((resolve, reject) =>{
            connection.query('INSERT INTO teams SET ?', setData, function(error, result){
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

    putTeamModel : function(setData, id){
        return new Promise((resolve, reject) =>{
            connection.query('UPDATE teams SET ? WHERE id=?', [setData, id], function(error, result){
                if (error){
                    reject(error);
                }
                resolve(result);
            });
        });
    },

    deleteTeamModel : function(id){
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM teams WHERE id=?', id, function(error, result){
                if (error){
                    reject(error)
                } 
                resolve(result);
            });
        })
    },
}