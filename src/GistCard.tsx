import React, { useEffect, useState } from 'react';
import 'fontsource-roboto';
import dayjs from 'dayjs';
import { Gist } from './types';
import { v4 as uuidv4 } from 'uuid';
import { SxProps } from '@material-ui/system';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CheckIcon from '@material-ui/icons/Check';
import {
    Box,
    Card,
    CardContent,
    CardActionArea,
    Chip,
    Avatar,
    Typography,
    Divider,
    AvatarGroup,
} from '@material-ui/core';

interface Props {
    gist: Gist;
    sx?: SxProps;
}

function GistCard({ gist, ...rest }: Props) {
    const title = gist?.files[Object.keys(gist?.files)[0]]?.filename;
    const date = dayjs(gist.created_at).format('MMM D, YYYY');
    const [forks, setForks] = useState([]);

    const tags = [''];
    Object.entries(gist.files).map(([, file]) => {
        const language = file?.language;
        if (language && !tags.includes(language) && language !== 'Processing') {
            tags.push(language);
        }
    });

    const fetchForks = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        setForks(data.length ? data.slice() : []);
    };

    useEffect(() => {
        fetchForks(gist.forks_url);
    }, [gist.forks_url]);

    return (
        <Card {...rest} sx={{ minHeight: 314 }}>
            <CardActionArea
                onClick={() => {
                    window.open(gist.html_url, '_blank', 'noopener,noreferrer');
                }}
                sx={{ flexGrow: 1, minHeight: 244 }}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 2,
                        }}
                    >
                        <AccessTimeIcon color="action" />
                        <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                            {date}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            p: 2,
                        }}
                    >
                        <Typography
                            align="center"
                            color="textPrimary"
                            gutterBottom
                            variant="h5"
                            sx={{ wordBreak: 'break-word', width: '100%' }}
                        >
                            {title}
                        </Typography>

                        <Box sx={{ textAlign: 'center', pt: 2 }}>
                            {tags.map(
                                (tag) =>
                                    !!tag && (
                                        <Chip
                                            size="small"
                                            icon={<CheckIcon />}
                                            label={tag}
                                            key={uuidv4()}
                                            sx={{ margin: '3px' }}
                                        />
                                    ),
                            )}
                        </Box>
                    </Box>
                </CardContent>
            </CardActionArea>
            <Box sx={{ flexGrow: 1 }} />
            <Divider />
            <Box sx={{ p: 2, minHeight: 76, justifyContent: 'space-between', flexGrow: 0 }}>
                <CallSplitIcon color="action" sx={{ position: 'absolute', marginTop: '9px' }} />
                <AvatarGroup max={6}>
                    {forks.map((fork: { owner: { login: string; avatar_url: string }; html_url: string }) => (
                        <Avatar
                            alt={fork?.owner?.login}
                            src={fork?.owner?.avatar_url}
                            variant="circular"
                            onClick={() => {
                                window.open(fork?.html_url, '_blank', 'noopener,noreferrer');
                            }}
                        />
                    ))}
                </AvatarGroup>
            </Box>
        </Card>
    );
}

export default GistCard;
