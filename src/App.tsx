import React, { useCallback, useEffect, useState } from 'react';
import 'fontsource-roboto';
import store from 'store2';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';
import { Container, CssBaseline, Button, Box, Grid, Typography } from '@material-ui/core';
import { Gist } from './types';
import Toolbar from './Toolbar';
import GistCard from './GistCard';

function App() {
    const [username, setUsername] = useState(store('username') || '');
    const [gists, setGists] = useState<Gist[] | []>([]);
    const [page, setPage] = useState(1);

    const fetchGists = async (username: string, page: number = 1) => {
        const response = await fetch(`https://api.github.com/users/${username}/gists?per_page=10&page=${page}`);
        const data = await response.json();

        if (!data.length) {
            setGists([]);
        } else if (page === 1) {
            setGists(data);
        } else {
            setGists([...gists, ...data]);
        }

        if (data?.message && data.message.includes('API rate limit exceeded')) {
            alert(data.message);
        }
    };

    const debouncedFetch = useCallback(
        debounce(fetchGists, 2000, {
            leading: true,
            trailing: true,
        }),
        [],
    );

    const getNextPage = () => {
        fetchGists(username, page + 1);
        setPage(page + 1);
    };

    useEffect(() => {
        setPage(1);
        if (username.length > 1) {
            store('username', username);
            debouncedFetch(username);
        } else {
            setGists([]);
        }
    }, [username]);

    //kentcdodds

    return (
        <>
            <CssBaseline />
            <Helmet>
                <title>Public Gist Search</title>
            </Helmet>

            <Container maxWidth="md" sx={{ py: 3 }}>
                <Toolbar
                    username={username}
                    onUsernameChange={(newUsername) => {
                        setUsername(newUsername.trim());
                    }}
                />
                <Grid container spacing={3} sx={{ pt: 3 }}>
                    {gists.length ? (
                        gists.map((gist: Gist) => (
                            <Grid item key={gist.id} lg={4} md={6} xs={12}>
                                <GistCard gist={gist} sx={{ height: '100%' }} />
                            </Grid>
                        ))
                    ) : (
                        <Typography align="center" sx={{ py: 12, width: '100%' }}>
                            Enter GitHub username to see their public Gists.
                        </Typography>
                    )}
                </Grid>
                <Box sx={{ textAlign: 'center', p: 6 }}>
                    {gists.length >= 10 && !(gists.length % 10) && (
                        <Button variant="contained" size="large" onClick={() => getNextPage()}>
                            Load More
                        </Button>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default App;
