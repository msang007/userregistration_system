import mysql from "mysql";
import promiseMysql from "promise-mysql"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import util from "util";
const ENV = dotenv.config().parsed;
const db = mysql.createConnection({
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME
});
///////////////////////////////////////////////////////////////////////////////////////////
// juste dans le cas de tester mes routes avec postman


const connexion = promiseMysql.createConnection({
    host: ENV.DB_HOST,
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME
});

const getAllUsers = async (req, res) => {

    const con = await connexion
    let sql = "SELECT name,email FROM users"
    try {
        const result = await con.query(sql)
        res.status(200).json({ data: result })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }

}

const getUsersById = async (req, res) => {
    const con = await connexion
    let { id } = req.params
    if (!id) return res.status(400).json({ message: 'id is required' })
    let sql = "SELECT * FROM users WHERE id=?"
    try {
        const result = await con.query(sql, id)
        res.status(200).json({ data: result })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

const adduser = async (req, res) => {
    const con = await connexion
    let sql = 'INSERT INTO users(name,email,password) VALUES(?)'
    const user = [req.body.name, req.body.email, req.body.password]
    try {
        const result = await con.query(sql, [user]);
        res.status(201).json({ data: result, message: "user ajoute avec succes!" })
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}
const deleteuser = async (req, res) => {
    const con = await connexion
    const { id } = req.params
    if (!id) return res.status(404).json({ error: true, message: "id est requis" })
    let sql = " DELETE FROM users WHERE id=?"
    try {
        const result = await con.query(sql, id)
        res.status(200).json({ message: `L'utilisateur ${id} a ete supprime avec succes` })

    }
    catch (error) {
        res.status(404).json({ error: true, message: error.message })
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render("login", {
                msg: "Please Enter Your Email and Password",
                msg_type: "error",
            });

        }

        db.query(
            "select * from users where email=?",
            [email],
            async (error, result) => {
                console.log(result);
                if (result.length <= 0) {
                    return res.status(401).render("login", {
                        msg: "Please Enter Your Email and Password",
                        msg_type: "error",
                    });
                } else {
                    if (!(await bcrypt.compare(password, result[0].password))) {
                        return res.status(401).render("login", {
                            msg: "Please Enter Your Email and Password",
                            msg_type: "error",
                        });
                    } else {
                        const id = result[0].id;
                        const token = jwt.sign({ id: id }, ENV.JWT_SECRET, {
                            expiresIn: ENV.JWT_EXPIRES_IN,
                        });
                        console.log("The Token is " + token);
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() +
                                ENV.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true,
                        };
                        res.cookie("Mamadou", token, cookieOptions);
                        res.status(200).redirect("/home");
                    }
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
};
const register = (req, res) => {
    console.log(req.body);
    /*
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    console.log(name);
    console.log(email);
      //res.send("Form Submitted");
    */
    const { name, email, password, confirm_password } = req.body;
    db.query(
        "select email from users where email=?",
        [email],
        async (error, result) => {
            if (error) {
                confirm.log(error);
            }

            if (result.length > 0) {
                return res.render("register", {
                    msg: "Email id already Taken",
                    msg_type: "error",
                });
            } else if (password !== confirm_password) {
                return res.render("register", {
                    msg: "Password do not match",
                    msg_type: "error",
                });
            }
            let hashedPassword = await bcrypt.hash(password, 8);
            //console.log(hashedPassword);

            db.query(
                "insert into users set ?",
                { name: name, email: email, password: hashedPassword },
                (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(result);
                        return res.render("register", {
                            msg: "User Registration Success",
                            msg_type: "good",
                        });
                    }
                }
            );
        }
    );
};

const isLoggedIn = async (req, res, next) => {
    //req.name = "Check Login....";
    //console.log(req.cookies);
    if (req.cookies.Mamadou) {
        try {
            const decode = await util.promisify(jwt.verify)(
                req.cookies.Mamadou,
                ENV.JWT_SECRET
            );
            //console.log(decode);
            db.query(
                "select * from users where id=?",
                [decode.id],
                (err, results) => {
                    //console.log(results);
                    if (!results) {
                        return next();
                    }
                    req.user = results[0];
                    return next();
                }
            );
        } catch (error) {
            console.log(error);
            return next();
        }
    } else {
        next();
    }
};

const logout = async (req, res) => {
    res.cookie("Mamadou", "logout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).redirect("/");
};


export default { login, register, isLoggedIn, logout, getAllUsers, getUsersById, adduser, deleteuser }