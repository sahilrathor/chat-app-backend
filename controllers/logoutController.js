export const logout = (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: "User logged out"});
}