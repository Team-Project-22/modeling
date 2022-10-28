import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';


function Header() {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				sx={{borderBottom: `1px solid blue`}}
			>
				<Toolbar>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						sx={{flexGrow: 1}}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Artwork Gallery
						</Link>
					</Typography>
					<nav>
						<Link
							color="textPrimary"
							href="#"
							sx={{margin: 1}}
							component={NavLink}
							to="/register"
						>
							Register
						</Link>
					</nav>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						sx={{margin: 1}}
						component={NavLink}
						to="/login"
					>
						Login
					</Button>
					<Button
						href="#"
						color="primary"
						variant="outlined"
						sx={{margin: 1}}
						component={NavLink}
						to="/logout"
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
