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
import TrendAnalysis from './Dashboard/DbTrendAnalysis';
import Chatbot from './Dashboard/ExploreCareers';

const drawerWidth = 280;

// Mock user data
const user = { name: 'Priyank Sutaria', username: 'priyank', avatar: 'https://i.pravatar.cc/150?img=3' };

function Dashboard() {
  const [openSocialFeeds, setOpenSocialFeeds] = React.useState(true);
  const [openCreatePosts, setOpenCreatePosts] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

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
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#0F172A', overflow: 'hidden' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          backgroundColor: 'rgba(30, 41, 59, 0.9)', // Dark slate gray with transparency
          backdropFilter: 'blur(10px)', // Glassmorphism effect
          color: '#F9FAFB', // Light gray text for contrast
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          height: '70px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Toolbar sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%', 
          height: '100%',
          px: 2, // Added padding for better spacing
        }}>
          {/* Left Section: Dashboard Title and Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: '#F9FAFB',
                letterSpacing: '1px',
                fontFamily: 'Arial, sans-serif',
                transition: 'opacity 0.3s ease-in-out',
                opacity: 1,
                '&:hover': { opacity: 0.9 },
              }}
            >
              Dashboard
            </Typography>
            <Paper
              component="form"
              sx={{ 
                p: '4px 12px', 
                display: 'flex', 
                alignItems: 'center', 
                width: 300, 
                borderRadius: '0.75rem', // Increased radius for modern look
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(249, 250, 251, 0.1)',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              }}
            >
              <IconButton type="submit" sx={{ p: '8px', transition: 'transform 0.3s ease-in-out' }} aria-label="search">
                <Search sx={{ color: '#F9FAFB' }} />
              </IconButton>
              <InputBase
                sx={{ 
                  ml: 1, 
                  flex: 1, 
                  color: '#F9FAFB',
                  '::placeholder': { color: 'rgba(249, 250, 251, 0.6)' },
                }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Paper>
          </Box>

          {/* Right Section: Icons and User */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '0.75rem',
                width: '32px',
                height: '32px',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Badge badgeContent={4} color="error">
                <Notifications sx={{ color: '#F9FAFB', fontSize: 20 }} />
              </Badge>
            </IconButton>

            <IconButton 
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.05)', 
                borderRadius: '0.75rem',
                width: '32px',
                height: '32px',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Settings sx={{ color: '#F9FAFB', fontSize: 20 }} />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleUserMenuOpen}>
              <Avatar 
                alt={user.name} 
                src={user.avatar} 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  border: '2px solid #4B5563', // Subtle border color
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }} 
              />
              <Box sx={{ ml: 1, display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: '#F9FAFB', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>
                  {user.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#D1D5DB', fontSize: '12px', fontFamily: 'Arial, sans-serif' }}>
                  Admin
                </Typography>
              </Box>
            </Box>
          
            {/* User Dropdown Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleUserMenuClose}
              sx={{ 
                mt: '45px',
                '& .MuiPaper-root': {
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 12px rgba(30, 41, 59, 0.3)',
                  backgroundColor: 'rgba(30, 41, 59, 0.95)',
                  border: '1px solid rgba(249, 250, 251, 0.1)',
                  backdropFilter: 'blur(10px)',
                  animation: 'fadeIn 0.2s ease-in-out',
                  color: '#F9FAFB',
                },
              }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, mx: 1, borderRadius: '0.5rem', fontSize: '14px', color: '#F9FAFB', '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.1)' }, transition: 'background-color 0.3s ease-in-out' }}>Profile</MenuItem>
              <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, mx: 1, borderRadius: '0.5rem', fontSize: '14px', color: '#F9FAFB', '&:hover': { backgroundColor: 'rgba(79, 70, 229, 0.1)' }, transition: 'background-color 0.3s ease-in-out' }}>Settings</MenuItem>
              <Divider sx={{ my: 0.5, borderColor: 'rgba(249, 250, 251, 0.1)' }} />
              <MenuItem onClick={handleUserMenuClose} sx={{ py: 1.5, mx: 1, borderRadius: '0.5rem', fontSize: '14px', color: '#EF4444', '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' }, transition: 'background-color 0.3s ease-in-out' }}>Logout</MenuItem>
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
            background: '#070E1E',
            color: '#E2E8F0',
            borderRight: 'none',
            boxShadow: '2px 0 8px rgba(0, 0, 0, 0.3)',
            transition: 'box-shadow 0.3s ease-in-out',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2, mb: 1 }}>
          <img
            src={Logo}
            alt="SocialSphere"
            width="40px"
            style={{
              marginRight: '12px',
              transition: 'transform 0.3s ease-in-out',
              filter: 'brightness(0) invert(1)',
            }}
            className="logo-hover"
          />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: '1px',
              color: '#E2E8F0',
              fontFamily: 'Arial, sans-serif',
              fontSize: '20px',
              transition: 'opacity 0.3s ease-in-out',
              opacity: 1,
              '&:hover': { opacity: 0.9 },
            }}
          >
            SocialSphere
          </Typography>
        </Box>

        <Divider sx={{ borderColor: 'rgba(226, 232, 240, 0.1)' }} />

        {/* Sidebar Menu */}
        <Box sx={{ px: 1, py: 1, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle2" sx={{ color: '#94A3B8', px: 2, mb: 0.5, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
            Main Menu
          </Typography>
          <List sx={{ py: 0, flexGrow: 1 }}>
            {/* Home */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                })}
              >
                <ListItemButton 
                  sx={{ 
                    borderRadius: '0.5rem', 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                    },
                    py: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover .MuiListItemIcon-root': {
                      color: '#8B5CF6'
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#8B5CF6'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><HomeIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Home" 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      color: '#E2E8F0',
                      transition: 'color 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>

            {/* Profile */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <NavLink
                to=""
                style={({ isActive }) => ({
                  textDecoration: 'none',
                  color: 'inherit',
                  width: '100%',
                })}
              >
                <ListItemButton 
                  sx={{ 
                    borderRadius: '0.5rem', 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                    },
                    py: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover .MuiListItemIcon-root': {
                      color: '#8B5CF6'
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#8B5CF6'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><AccountCircleIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Profile" 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      color: '#E2E8F0',
                      transition: 'color 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>

            <Typography variant="subtitle2" sx={{ color: '#94A3B8', px: 2, mt: 2, mb: 0.5, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Social Media
            </Typography>

            {/* Social Feeds */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={handleCollapseSocialFeeds} 
                sx={{ 
                  borderRadius: '0.5rem', 
                  '&:hover': { 
                    backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                  },
                  py: 1,
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover .MuiListItemIcon-root': {
                    color: '#8B5CF6'
                  },
                  '&:hover .MuiListItemText-primary': {
                    color: '#8B5CF6'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><DynamicFeed /></ListItemIcon>
                <ListItemText 
                  primary="Social Feeds" 
                  primaryTypographyProps={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    fontFamily: 'Arial, sans-serif',
                    color: '#E2E8F0',
                    transition: 'color 0.3s ease-in-out',
                  }} 
                />
                {openSocialFeeds ? <ExpandLess sx={{ color: '#E2E8F0', transition: 'color 0.3s ease-in-out' }} /> : <ExpandMore sx={{ color: '#E2E8F0', transition: 'color 0.3s ease-in-out' }} />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openSocialFeeds} timeout="auto" unmountOnExit sx={{ animation: 'slideIn 0.3s ease-in-out' }}>
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {[
                  { text: 'LinkedIn Feed', route: 'dblinkedin' },
                  { text: 'Facebook Feed', route: 'dbfacebook' },
                  { text: 'Instagram Feed', route: 'dbinstafeed' },
                ].map((subItem) => (
                  <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                    <NavLink
                      to={subItem.route}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: 'inherit',
                        width: '100%',
                      })}
                    >
                      <ListItemButton 
                        sx={{ 
                          borderRadius: '0.5rem', 
                          '&:hover': { 
                            backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                          },
                          py: 0.5,
                          pl: 4,
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.3s ease-in-out',
                          '&:hover .MuiListItemText-primary': {
                            color: '#8B5CF6'
                          }
                        }}
                      >
                        <ListItemText 
                          primary={subItem.text} 
                          primaryTypographyProps={{ 
                            fontSize: '13px', 
                            fontWeight: 400,
                            color: '#E2E8F0',
                            fontFamily: 'Arial, sans-serif',
                            transition: 'color 0.3s ease-in-out',
                          }} 
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Create Posts */}
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton 
                onClick={handleCollapseCreatePosts} 
                sx={{ 
                  borderRadius: '0.5rem', 
                  '&:hover': { 
                    backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                  },
                  py: 1,
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.3s ease-in-out',
                  '&:hover .MuiListItemIcon-root': {
                    color: '#8B5CF6'
                  },
                  '&:hover .MuiListItemText-primary': {
                    color: '#8B5CF6'
                  }
                }}
              >
                <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><PostAdd /></ListItemIcon>
                <ListItemText 
                  primary="Create Posts" 
                  primaryTypographyProps={{ 
                    fontSize: '14px', 
                    fontWeight: 500,
                    fontFamily: 'Arial, sans-serif',
                    color: '#E2E8F0',
                    transition: 'color 0.3s ease-in-out',
                  }} 
                />
                {openCreatePosts ? <ExpandLess sx={{ color: '#E2E8F0', transition: 'color 0.3s ease-in-out' }} /> : <ExpandMore sx={{ color: '#E2E8F0', transition: 'color 0.3s ease-in-out' }} />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCreatePosts} timeout="auto" unmountOnExit sx={{ animation: 'slideIn 0.3s ease-in-out' }}>
              <List component="div" disablePadding sx={{ pl: 2 }}>
                {[
                  { text: 'Create IG Post', route: 'dbcreateinstagram' },
                  { text: 'Create FB Post', route: 'dbcreatefacebook' },
                  { text: 'Create LinkedIn Post', route: 'dbcreatelinkedin' },
                ].map((subItem) => (
                  <ListItem key={subItem.text} disablePadding sx={{ mb: 0.5 }}>
                    <NavLink
                      to={subItem.route}
                      style={({ isActive }) => ({
                        textDecoration: 'none',
                        color: 'inherit',
                        width: '100%',
                      })}
                    >
                      <ListItemButton 
                        sx={{ 
                          borderRadius: '0.5rem', 
                          '&:hover': { 
                            backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                          },
                          py: 0.5,
                          pl: 4,
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.3s ease-in-out',
                          '&:hover .MuiListItemText-primary': {
                            color: '#8B5CF6'
                          }
                        }}
                      >
                        <ListItemText 
                          primary={subItem.text} 
                          primaryTypographyProps={{ 
                            fontSize: '13px', 
                            fontWeight: 400,
                            color: '#E2E8F0',
                            fontFamily: 'Arial, sans-serif',
                            transition: 'color 0.3s ease-in-out',
                          }} 
                        />
                      </ListItemButton>
                    </NavLink>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <Typography variant="subtitle2" sx={{ color: '#94A3B8', px: 2, mt: 2, mb: 0.5, fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Arial, sans-serif' }}>
              Tools
            </Typography>

            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <NavLink to="dbpostschedule" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton 
                  sx={{ 
                    borderRadius: '0.5rem', 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                    },
                    py: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover .MuiListItemIcon-root': {
                      color: '#8B5CF6'
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#8B5CF6'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><Today /></ListItemIcon>
                  <ListItemText 
                    primary="Post Scheduler" 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      color: '#E2E8F0',
                      transition: 'color 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
            
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <NavLink to="dbaiautomation" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton 
                  sx={{ 
                    borderRadius: '0.5rem', 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                    },
                    py: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover .MuiListItemIcon-root': {
                      color: '#8B5CF6'
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#8B5CF6'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><SmartToy /></ListItemIcon>
                  <ListItemText 
                    primary="AI Automated Posting" 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      color: '#E2E8F0',
                      transition: 'color 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
            
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <NavLink to="dbtrend" style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                <ListItemButton 
                  sx={{ 
                    borderRadius: '0.5rem', 
                    '&:hover': { 
                      backgroundColor: 'rgba(139, 92, 246, 0.15)' 
                    },
                    py: 1,
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s ease-in-out',
                    '&:hover .MuiListItemIcon-root': {
                      color: '#8B5CF6'
                    },
                    '&:hover .MuiListItemText-primary': {
                      color: '#8B5CF6'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: '#E2E8F0', minWidth: '40px', transition: 'color 0.3s ease-in-out' }}><ExploreIcon /></ListItemIcon>
                  <ListItemText 
                    primary="Trend Analysis" 
                    primaryTypographyProps={{ 
                      fontSize: '14px', 
                      fontWeight: 500,
                      fontFamily: 'Arial, sans-serif',
                      color: '#E2E8F0',
                      transition: 'color 0.3s ease-in-out',
                    }} 
                  />
                </ListItemButton>
              </NavLink>
            </ListItem>
          </List>
        </Box>

        {/* Fixed Footer for Sidebar */}
        <Box sx={{ p: 1, borderTop: '1px solid rgba(226, 232, 240, 0.1)', backgroundColor: 'rgba(7, 14, 30, 0.9)', animation: 'fadeIn 0.3s ease-in-out' }}>
          <Typography variant="body2" sx={{ color: '#94A3B8', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
            © 2025 SocialSphere. All rights reserved.
          </Typography>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 4, backgroundColor: '#0F172A', minHeight: '100vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Toolbar />
        
        {/* Welcome Section */}
        <Box sx={{ mb: 6, animation: 'fadeIn 0.5s ease-in-out' }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#E2E8F0', mb: 2, fontFamily: 'Arial, sans-serif' }}>
            Welcome back, Priyank
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', fontFamily: 'Arial, sans-serif', maxWidth: '600px' }}>
            Here's what's happening with your social accounts today
          </Typography>
        </Box>
        
        {/* Quick Actions Cards */}
        {/* <Box sx={{ mb: 6, flexGrow: 1 }}>
          <Grid container spacing={4} sx={{ animation: 'fadeInUp 0.5s ease-in-out' }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(7, 14, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(226, 232, 240, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                },
              }}>
                <CardActionArea sx={{ height: '100%', p: 2 }}>
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B5CF6', fontSize: '1.25rem', mb: 2, fontFamily: 'Arial, sans-serif' }}>Quick Access</Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, fontFamily: 'Arial, sans-serif' }}>Jump to your favorite features</Typography>
                    </Box>
                    <Box sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.03)', 
                      p: 2, 
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(226, 232, 240, 0.05)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}>
                      <PostAdd sx={{ color: '#A78BFA', fontSize: 36 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(7, 14, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(226, 232, 240, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                },
              }}>
                <CardActionArea sx={{ height: '100%', p: 2 }}>
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B5CF6', fontSize: '1.25rem', mb: 2, fontFamily: 'Arial, sans-serif' }}>Recent Activity</Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, fontFamily: 'Arial, sans-serif' }}>Check your latest actions</Typography>
                    </Box>
                    <Box sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.03)', 
                      p: 2, 
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(226, 232, 240, 0.05)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}>
                      <DynamicFeed sx={{ color: '#A78BFA', fontSize: 36 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                borderRadius: '0.5rem', 
                backgroundColor: 'rgba(7, 14, 30, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(226, 232, 240, 0.1)',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: '0 8px 24px rgba(139, 92, 246, 0.3)',
                },
              }}>
                <CardActionArea sx={{ height: '100%', p: 2 }}>
                  <CardContent sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#8B5CF6', fontSize: '1.25rem', mb: 2, fontFamily: 'Arial, sans-serif' }}>Notifications</Typography>
                      <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, fontFamily: 'Arial, sans-serif' }}>View all notifications</Typography>
                    </Box>
                    <Box sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.03)', 
                      p: 2, 
                      borderRadius: '0.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(226, 232, 240, 0.05)',
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}>
                      <Notifications sx={{ color: '#A78BFA', fontSize: 36 }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Box> */}

        {/* Fixed Footer for Main Content */}
      

        <Routes>
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/explore" element={<ExploreCareers />} />
          <Route path="/dbpostschedule" element={<PostScheduler />} />
          <Route path="/dbinstafeed" element={<InstagramFeed />} />
          <Route path="/dbfacebook" element={<FacebookDashboard />} />
          <Route path="/dblinkedin" element={<LinkedInFeed />} />
          <Route path="/dbaiautomation" element={<AIPostGenerator />} />
          <Route path="/dbchatbot" element={<Chatbot />} />
          <Route path="/dbtrend" element={<TrendAnalysis />} />
        </Routes>
        <Box sx={{ py: 2, mt: 'auto', borderTop: '1px solid rgba(226, 232, 240, 0.1)', backgroundColor: 'rgba(7, 14, 30, 0.9)', animation: 'fadeIn 0.3s ease-in-out' }}>
          <Typography variant="body2" sx={{ color: '#94A3B8', textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
            © 2025 SocialSphere. All rights reserved. | <a href="#" style={{ color: '#A78BFA', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Privacy Policy</a> | <a href="#" style={{ color: '#A78BFA', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>Terms of Service</a>
          </Typography>
        </Box>
      </Box>
      
    </Box>
  );
}

// CSS Animations
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { transform: translateX(-10px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;

// Inject CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Dashboard;