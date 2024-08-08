export const logout = (req, res) => {
    try {
        res.cookie('token', '', {
            maxAge: 0,
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
