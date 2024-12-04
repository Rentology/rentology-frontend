import React from 'react';
import { Card, CardContent, Typography, Avatar, Button, Box } from '@mui/material';

interface UserCardProps {
    name: string;
    role: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, role}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: 2,
                maxWidth: 400,
            }}
        >

            <Box sx={{ flex: 1 }}>
                <CardContent sx={{ padding: 0 }}>
                    <Typography variant="h6">{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        {role}
                    </Typography>
                </CardContent>

            </Box>
            <Avatar
                sx={{
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    fontSize: 24,
                    marginRight: 2,
                }}
            >
                {name[0].toUpperCase()}
            </Avatar>
        </Box>
    );
};

export default UserCard;
