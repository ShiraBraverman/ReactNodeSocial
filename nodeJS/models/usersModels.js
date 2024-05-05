const pool = require('../server.js');

async function getUsers() {
    try {
        const sql = 'SELECT * FROM users';

        const [rows, fields] = await pool.query(sql);
        console.log(rows);

        return rows;
    } catch (err) {
        console.log(err);
    }
}

async function getUser(id) {
    try {
        const sql = 'SELECT * FROM users where id=?';

        const result = await pool.query(sql, [id]);

        return result[0][0];

    } catch (err) {
        console.log(err);
    }
}



//   async function createUser(name,location) {
//     try {
//       const sql = "INSERT INTO users (`name`, `location`) VALUES(?, ?)";
//       ;

//       const result = await pool.query(sql,[name,location]);

//       return result[0];

//     } catch (err) {
//       console.log(err);
//     }
//   }
//   async function deleteBranch(id) {
//     try {
//       const sql = `DELETE FROM branches WHERE id = ?`;
//       const result = await pool.query(sql, [id]);
//     } catch (err) {
//       console.error('Error deleting toy:', err);
//       throw err;
//     }
//   }
//   async function updateBranch(id,name,location)  {
//     try {
//       const sql = `UPDATE branches SET name = ?, location = ? WHERE id = ?`;
//       const result = await pool.query(sql, [name,location, id]);
//       return result;
//     } catch (err) {
//       console.error('Error updating branch:', err);
//       throw err;
//     }
//   }

// module.exports = {updateBranch, getBranch, getBranches, deleteBranch, createBranch}
module.exports = { getUser,getUsers }