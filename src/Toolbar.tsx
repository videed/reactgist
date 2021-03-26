import { Box, TextField, InputAdornment, SvgIcon } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
    username: string;
    onUsernameChange: (newUsername: string) => void;
}

const Toolbar = ({ username, onUsernameChange }: Props) => (
    <Box sx={{ my: 5, mx: 'auto', maxWidth: 500, flex: 1 }}>
        <TextField
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                            <SearchIcon />
                        </SvgIcon>
                    </InputAdornment>
                ),
            }}
            onChange={(event) => {
                onUsernameChange(event.target.value);
            }}
            defaultValue={username}
            placeholder="GitHub Username"
            variant="outlined"
            fullWidth
        />
    </Box>
);

export default Toolbar;
