import * as React from 'react';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Paper, InputBase, IconButton, Badge, Collapse, Card, CardContent, CardActionArea, Grid, Menu, MenuItem } from '@mui/material';
import { Home as HomeIcon, AccountCircle as AccountCircleIcon, Explore as ExploreIcon, DynamicFeed, AddComment, Notifications, Search, ExpandMore, ExpandLess, PostAdd, Settings, Today, SmartToy, InsertEmoticon } from '@mui/icons-material';
import { NavLink, Routes, Route, Outlet } from 'react-router-dom';
import Logo from '../assets/images/SocialSphereLogo.png';
import MyProfile from './Dashboard/Profile';
import ExploreCareers from './Dashboard/ExploreCareers';
import PostScheduler from './Dashboard/DbPostScheduler';
import InstagramFeed from './Dashboard/DbInstagram';
import FacebookDashboard from './Dashboard/DbFacebook';
import FacebookPostCreator from './Dashboard/DbCreateFBPost';
import LinkedInPostCreator from './Dashboard/DbCreateLinkedIn';
import LinkedInFeed from './Dashboard/DbLinkedIn';
import AIPostGenerator from './Dashboard/DbAutomation';
import InstagramConnect from './Dashboard/DbCreateIGPost';
import InstagramAnalysis from './Dashboard/DbTrendAnalysis';
import Chatbot from './Dashboard/ExploreCareers';

const drawerWidth = 260;

// Mock user data
const user = { name: 'Priyank Sutaria', username: 'priyank', avatar: 'https://i.pravatar.cc/150?img=3' };

function Dashboard() {
  const [openSocialFeeds, setOpenSocialFeeds] = React.useState(true); // For Social Feeds collapsible menu
  const [openCreatePosts, setOpenCreatePosts] = React.useState(true); // For Create Posts collapsible menu
  const [anchorEl, setAnchorEl] = React.useState(null); // For user dropdown menu

  const handleCollapseSocialFeeds = () => {
    setOpenSocialFeeds(!openSocialFeeds);
  };

  const handleCollapseCreatePosts = () => {
    setOpenCreatePosts(!openCreatePosts);
  };

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#F4F7FC' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          background: 'linear-gradient(135deg, rgb(56, 54, 162) 30%, #006c7f 100%)',
          color: 'white',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          height: '64px',
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <NavLink to={'/'}>
              <img
                src={Logo}
                alt="Navbar"
                width="60px"
                style={{
                  marginRight: '15px',
                  transition: 'transform 0.3s ease',
                }}
                className="logo-hover"
              />
            </NavLink>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
                "&:hover": { color: '#ffdd57' }
              }}
            >
              SocialSphere
            </Typography>
          </Box>

          {/* Search Bar and Icons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, borderRadius: '20px' }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>

            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton color="inherit">
              <Settings />
            </IconButton>

            <IconButton onClick={handleUserMenuOpen} color="inherit">
              <Avatar alt={user.name} src={user.avatar} sx={{ width: 40, height: 40, cursor: 'pointer' }} />
            </IconButton>

            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              sx={{ mt: '45px' }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar Navigation */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, rgb(56, 54, 162) 30%, #006c7f 100%)',
            color: 'white',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* User Info Card */}
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: 2,
            backgroundColor: '#00a8cc',
            borderRadius: '0 0 20px 20px',
          }}
        >
          <Avatar alt={user.name} src={user.avatar} sx={{ bgcolor: '#FFF', color: 'rgb(56, 54, 162)', marginRight: 1 }} />
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem', color: '#e0e0e0' }}>@{user.username}</Typography>
          </Box>
        </Paper>

        <Divider sx={{ mt: 2 }} />

        {/* Sidebar Menu */}
        <List>
          {/* Home */}
          <ListItem disablePadding>
            <NavLink
              to="/"
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                backgroundColor: isActive ? 'rgb(16, 15, 84)' : 'transparent',
                borderRadius: '8px',
                margin: '5px 10px',
                transition: 'background-color 0.3s ease',
              })}
            >
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
                <ListItemIcon sx={{ color: 'white' }}><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Profile */}
          <ListItem disablePadding>
            <NavLink
              to=""
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: 'inherit',
                width: '100%',
                backgroundColor: isActive ? 'rgb(16, 15, 84)' : 'transparent',
                borderRadius: '8px',
                margin: '5px 10px',
                transition: 'background-color 0.3s ease',
              })}
            >
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
                <ListItemIcon sx={{ color: 'white' }}><AccountCircleIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </NavLink>
          </ListItem>

          {/* Social Feeds */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleCollapseSocialFeeds} sx={{ borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
              <ListItemIcon sx={{ color: 'white' }}><DynamicFeed /></ListItemIcon>
              <ListItemText primary="Social Feeds" />
              {openSocialFeeds ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openSocialFeeds} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { text: 'LinkedIn Feed', route: 'dblinkedin' },
                { text: 'Facebook Feed', route: 'dbfacebook' },
                { text: 'Instagram Feed', route: 'dbinstafeed' },
              ].map((subItem) => (
                <ListItem key={subItem.text} disablePadding>
                  <NavLink
                    to={subItem.route}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%',
                      backgroundColor: isActive ? 'rgb(16, 15, 84)' : 'transparent',
                      borderRadius: '8px',
                      margin: '5px 10px',
                      transition: 'background-color 0.3s ease',
                    })}
                  >
                    <ListItemButton sx={{ pl: 4, borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {/* Create Posts */}
          <ListItem disablePadding>
            <ListItemButton onClick={handleCollapseCreatePosts} sx={{ borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
              <ListItemIcon sx={{ color: 'white' }}><PostAdd /></ListItemIcon>
              <ListItemText primary="Create Posts" />
              {openCreatePosts ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCreatePosts} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {[
                { text: 'Create IG Post', route: 'dbcreateinstagram' },
                { text: 'Create FB Post', route: 'dbcreatefacebook' },
                { text: 'Create LinkedIn Post', route: 'dbcreatelinkedin'}
              ].map((subItem) => (
                <ListItem key={subItem.text} disablePadding>
                  <NavLink
                    to={subItem.route}
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      color: 'inherit',
                      width: '100%',
                      backgroundColor: isActive ? 'rgb(16, 15, 84)' : 'transparent',
                      borderRadius: '8px',
                      margin: '5px 10px',
                      transition: 'background-color 0.3s ease',
                    })}
                  >
                    <ListItemButton sx={{ pl: 4, borderRadius: '8px', '&:hover': { backgroundColor: 'rgb(104, 143, 191)' } }}>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </List>
          </Collapse>
          <ListItem disablePadding>
            <NavLink to="dbpostschedule" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: '#006c7f' } }}>
                <ListItemIcon sx={{ color: 'white' }}><Today /></ListItemIcon>
                <ListItemText primary="Post Scheduler" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to="dbaiautomation" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: '#006c7f' } }}>
                <ListItemIcon sx={{ color: 'white' }}><SmartToy /></ListItemIcon>
                <ListItemText primary="AI Automated Posting" />
              </ListItemButton>
            </NavLink>
          </ListItem>
          <ListItem disablePadding>
            <NavLink to="dbtrend" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: '#006c7f' } }}>
                <ListItemIcon sx={{ color: 'white' }}><ExploreIcon /></ListItemIcon>
                <ListItemText primary="Trend Analysis" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>

        <Divider sx={{ mt: 'auto', mb: 1 }} />

        {/* Bottom Section */}
        <List>
          <ListItem disablePadding>
            <NavLink to="dbchatbot" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
              <ListItemButton sx={{ borderRadius: '8px', '&:hover': { backgroundColor: '#006c7f' } }}>
                <ListItemIcon sx={{ color: 'white' }}><InsertEmoticon /></ListItemIcon>
                <ListItemText primary="Personal Bot" />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Quick Access</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Jump to your favorite features</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Recent Activity</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Check your latest actions</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: '16px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Notifications</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>View all notifications</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Routes>
          <Route path='/dblinkedin' element={<LinkedInFeed />} />
          <Route path='/dbfacebook' element={<FacebookDashboard />} />
          <Route path='/dbinstafeed' element={<InstagramFeed />} />
          <Route path='/dbcreatefacebook' element={<FacebookPostCreator />} />
          <Route path='/dbcreatelinkedin' element={<LinkedInPostCreator />} />
          <Route path='/dbcreateinstagram' element={<InstagramConnect />} />
          <Route path='/dbpostschedule' element={<PostScheduler />} />
          <Route path='/dbaiautomation' element={<AIPostGenerator />} />
          <Route path='/dbtrend' element={<InstagramAnalysis />} />
          <Route path='/dbchatbot' element={<Chatbot />} />

          <Route path='' element={<MyProfile />} />
        </Routes>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Dashboard;