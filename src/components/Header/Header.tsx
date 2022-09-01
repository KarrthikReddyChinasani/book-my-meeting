import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    Book a meeting
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
