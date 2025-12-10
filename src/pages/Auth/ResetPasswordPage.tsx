import { Alert, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"
import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/routePaths";
import { userService } from "../../services/userService";


export const ResetPasswordPage: React.FC = () => {
    
    const [email, setEmail] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || ROUTES.HOME;
    
    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await userService.resetPassword(email);
            setSuccess(true)

        }
        catch (e: any) {
            setError(e.message || "A aparut o eroare");
        }
        finally {
            setLoading(false);
        }

    }

    return <>
    <Container
        maxWidth="xs"
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
        }}>
        <Paper
            elevation={6}
            sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            }}
        >
            <Typography component="h1" variant="h5" gutterBottom>
                Reset Password
            </Typography>

            <Box
                component="form"
                onSubmit={handleResetPassword}
                noValidate
                sx={{ mt: 1, width: "100%" }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email (user@example.com)"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                >

                </TextField>
                {success ? 
                <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
                    Reset password email was sent successfuly!
                </Alert>:
                <></>}
                {error && (
                    <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    loading={loading}
                >
                    Submit
                </Button>
            </Box>

        </Paper>
        
    </Container>
    </>
}