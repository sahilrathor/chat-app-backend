// export const logout = (req, res) => {
//     // res.cookie("jwt", "", {
//     //     httpOnly: true,
//     //     expires: new Date(0)
//     // })
//     // res.status(200).json({message: "User logged out"});

//     try {
//         res.cookie("jwt", '', {maxAge: 0});
//         res.status(200).json({message: "Logout successfully"})
//     } catch (err) {
//         res.status(500).json({error: 'server error'})
//         console.log('log out error: ', err.message)
//     }
// }

export const logout = (req, res) => {
    try {
        res.cookie('token', '', {
            maxAge: 0, // Sets the expiration date to the past
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== "development",
            path: '/'
        });
        res.status(200).json({ message: 'Logout successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
        console.error('Logout error:', err.message);
    }
};
