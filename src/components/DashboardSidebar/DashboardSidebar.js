import {useContext, useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import PropTypes from 'prop-types';
import {Avatar, Box, Button, Divider, Drawer, Hidden, List, Typography} from '@material-ui/core';
import {
    BarChart as BarChartIcon,
    Users as UsersIcon,
    UserPlus as UserPlusIcon,
    GitPullRequest as GitPullRequestIcon,
    Activity as ActivityIcon
} from 'react-feather';

import {NavItem} from 'src/components';
import {permissions} from "src/common/context/AccessControl/authorization";
import {AccessControlContext} from "src/common/context/AccessControl";

const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith'
};

const items = [
    {
        href: '/app/Dashboard',
        icon: BarChartIcon,
        title: 'Dashboard',
        permissions: ['*']
    },
    {
        href: '/app/user',
        icon: UsersIcon,
        title: 'Users',
        permissions: [permissions.view_user]
    },
    {
        href: '/app/group',
        icon: UserPlusIcon,
        title: 'Groups',
        permissions: [permissions.view_group]
    },
    {
        href: '/app/permission',
        icon: GitPullRequestIcon,
        title: 'Permissions',
        permissions: [permissions.view_permission]
    },
    {
        href: '/app/reports/ar',
        icon: ActivityIcon,
        title: 'A/R Aging Report',
        permissions: ["*"]
    },
];

const DashboardSidebar = ({onMobileClose, openMobile}) => {
    const location = useLocation();
    const {hasPermissions, hasGroups} = useContext(AccessControlContext);

    const allowedMenuItems = items.filter(menuItem => {
        return !!hasGroups(menuItem.groups) || !!hasPermissions(menuItem.permissions)
    });

    useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, [location.pathname, onMobileClose, openMobile]);

    const content = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2
                }}
            >
                <Avatar
                    component={RouterLink}
                    src={user.avatar}
                    sx={{
                        cursor: 'pointer',
                        width: 64,
                        height: 64
                    }}
                    to="/app/account"
                />
                <Typography
                    color="textPrimary"
                    variant="h5"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.jobTitle}
                </Typography>
            </Box>
            <Divider/>
            <Box sx={{p: 2}}>
                <List>
                    {allowedMenuItems.map((item) => (
                        <NavItem
                            href={item.href}
                            key={item.title}
                            title={item.title}
                            icon={item.icon}
                        />
                    ))}
                </List>
            </Box>
            <Box sx={{flexGrow: 1}}/>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    m: 2,
                    p: 2
                }}
            >
                <Typography
                    align="center"
                    gutterBottom
                    variant="h4"
                >
                    Need more?
                </Typography>
                <Typography
                    align="center"
                    variant="body2"
                >
                    Be the best version of you
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 2
                    }}
                >
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Execute action
                    </Button>
                </Box>
            </Box>
        </Box>
    );

    return (
        <>
            <Hidden lgUp>
                <Drawer
                    anchor="left"
                    onClose={onMobileClose}
                    open={openMobile}
                    variant="temporary"
                    PaperProps={{
                        sx: {
                            width: 256
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
            <Hidden xlDown>
                <Drawer
                    anchor="left"
                    open
                    variant="persistent"
                    PaperProps={{
                        sx: {
                            width: 256,
                            top: 64,
                            height: 'calc(100% - 64px)'
                        }
                    }}
                >
                    {content}
                </Drawer>
            </Hidden>
        </>
    );
};

DashboardSidebar.propTypes = {
    onMobileClose: PropTypes.func,
    openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
    onMobileClose: () => {
    },
    openMobile: false
};

export default DashboardSidebar;