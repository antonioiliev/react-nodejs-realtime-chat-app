class User {
    static async login(user) {
        console.log('Users.signin', user);
        const userIsLoggedIn = {
            status: false,
            message: 'Your username or password is invalid'
        };

        if (user.username !== undefined && user.password !== undefined) {
            const userDB = await global.knex('users')
            .where({ username: user.username })
            .first()
            .then(row => row)
            .catch(error => console.log(error));

            if (userDB !== undefined && userDB !== null) {
                if (userDB.email === user.email && userDB.password === user.password) {
                    userIsLoggedIn.status = true;
                    userIsLoggedIn.message = 'Success';
                    return userIsLoggedIn;
                }
            }
        }

        return userIsLoggedIn;
    };

    static async register(user) {
        console.log('User.register', user)
        if (user.username !== undefined && user.password !== undefined) {
            const userIsRegistered = {};
            const userExists = await global.knex('users')
            .where({ username: user.username })
            .first()
            .then(row => row)
            .catch(error => console.log(error));

            if (userExists !== undefined) {
                userIsRegistered.status = false;
                return userIsRegistered;
            } 

            const registeredUser = await global.knex('users')
            .insert(user)
            .then(row => row)
            .catch(error => console.log(error));

            userIsRegistered.status = true;
            userIsRegistered.id = registeredUser[0];
            userIsRegistered.username = user.username;
            
            return userIsRegistered;
        }
    }
}

export default User;