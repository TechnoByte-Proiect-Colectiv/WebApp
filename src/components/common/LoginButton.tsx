import {
  useState,
  useEffect,
  FC,
} from "react";
import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { userService } from "../../services/userService";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routePaths";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

type AuthMode = "login" | "signup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: AuthMode;
  value: AuthMode;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export const LoginButton: FC = () => {
  const { isAuthenticated, loginWithCredentials, login, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Sign up form state
  const [signupFirstName, setSignupFirstName] = useState("");
  const [signupLastName, setSignupLastName] = useState("");
  // const [signupAddress, setSignupAddress] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(userService.getCurrentUser());

  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(userService.getCurrentUser());
  }, [isAuthenticated]);

  useEffect(() => {
    const handleUserUpdate = () => {
      setCurrentUser(userService.getCurrentUser());
    };

    window.addEventListener('userUpdated', handleUserUpdate);

    return () => {
      window.removeEventListener('userUpdated', handleUserUpdate);
    };
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate(ROUTES.ACCOUNT);
    handleMenuClose();
  };

  const handleAuthClick = () => {
    setOpenAuthDialog(true);
    handleMenuClose();
    setError(null);
    resetForms();
  };

  const handleDialogClose = () => {
    setOpenAuthDialog(false);
    resetForms();
  };

  const resetForms = () => {
    setLoginEmail("");
    setLoginPassword("");
    setSignupFirstName("");
    setSignupLastName("");
    // setSignupAddress("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
    setError(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: AuthMode) => {
    setAuthMode(newValue);
    setError(null);
  };

  const handleLogin = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!loginEmail || !loginPassword) {
        setError("Please enter both email and password");
        setLoading(false);
        return;
      }

      await loginWithCredentials({ email: loginEmail, password: loginPassword });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);

    try {
      if (!signupFirstName || !signupLastName || 
        // !signupAddress || 
        !signupEmail || !signupPassword || !signupConfirmPassword) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const { token } = await userService.signup({
        firstName: signupFirstName,
        lastName: signupLastName,
        // address: signupAddress,
        email: signupEmail,
        password: signupPassword,
        confirmPassword: signupConfirmPassword,
      });
      if (token) login(token);
    } catch (err: any) {
      setError(err?.message || (err instanceof Error ? err.message : "Sign up failed"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      navigate(ROUTES.HOME, { replace: true });
      await userService.logout();
      logout();
      handleMenuClose();
      setOpenAuthDialog(false);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated && currentUser) {
    return (
      <>
        <Button
          onClick={handleMenuOpen}
          className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300"
          startIcon={
            currentUser.avatar ? (
              <Avatar
                alt={currentUser.name}
                src={currentUser.avatar}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <AccountCircleIcon />
            )
          }
        >
          {currentUser.name}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem disabled>
            <span className="text-xs text-neutral-500">{currentUser.email}</span>
          </MenuItem>

          <MenuItem onClick={handleProfileClick}>
            <AccountCircleIcon fontSize="small" className="mr-2" />
            Profile
          </MenuItem>

          {(currentUser.isAdmin) && (
            <MenuItem 
              onClick={() => {
                navigate("/admin/dashboard");
                handleMenuClose();
              }}
              className="text-purple-600 dark:text-purple-400 font-semibold"
            >
              <AdminPanelSettingsIcon fontSize="small" className="mr-2" />
              Admin Panel
            </MenuItem>
          )}

          <MenuItem onClick={handleLogout} disabled={loading}>
            <LogoutIcon fontSize="small" className="mr-2" />
            Logout
          </MenuItem>
        </Menu>
      </>
    );
  }

  return (
    <>
      <Button
        onClick={handleAuthClick}
        variant="contained"
        className="bg-brand-500 hover:bg-brand-600 text-white"
        startIcon={<LoginIcon />}
        size="small"
      >
        Sign In
      </Button>

      <Dialog
        open={openAuthDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          className: "bg-white dark:bg-neutral-800",
        }}
      >
        <DialogTitle className="text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-700">
          <Tabs
            value={authMode}
            onChange={handleTabChange}
            aria-label="auth tabs"
            sx={{
              "& .MuiTab-root": {
                color: "inherit",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "500",
              },
              "& .Mui-selected": {
                color: "#6366f1",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#6366f1",
              },
            }}
          >
            <Tab label="Sign In" value="login" id="auth-tab-login" aria-controls="auth-tabpanel-login" />
            <Tab label="Sign Up" value="signup" id="auth-tab-signup" aria-controls="auth-tabpanel-signup" />
          </Tabs>
        </DialogTitle>

        <DialogContent className="pt-6">
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <TabPanel value={authMode} index="login">
            <div className="space-y-4">
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="user@example.com"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              />

              <div className="bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded p-3 text-sm">
                <p className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                  Demo Credentials:
                </p>
                <ul className="text-neutral-600 dark:text-neutral-400 space-y-1 text-xs">
                  <li>user@example.com / password123</li>
                  <li>demo@example.com / demo123</li>
                </ul>
              </div>
            </div>
          </TabPanel>

          <TabPanel value={authMode} index="signup">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <TextField
                  fullWidth
                  label="First Name"
                  value={signupFirstName}
                  onChange={(e) => setSignupFirstName(e.target.value)}
                  placeholder="John"
                  disabled={loading}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    className: "dark:text-neutral-400",
                  }}
                  InputProps={{
                    className: "dark:text-neutral-100",
                  }}
                />

                <TextField
                  fullWidth
                  label="Last Name"
                  value={signupLastName}
                  onChange={(e) => setSignupLastName(e.target.value)}
                  placeholder="Doe"
                  disabled={loading}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    className: "dark:text-neutral-400",
                  }}
                  InputProps={{
                    className: "dark:text-neutral-100",
                  }}
                />
              </div>

              {/* <TextField
                fullWidth
                label="Address"
                value={signupAddress}
                onChange={(e) => setSignupAddress(e.target.value)}
                placeholder="Street, City, Country"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              /> */}

              <TextField
                fullWidth
                label="Email"
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={signupConfirmPassword}
                onChange={(e) => setSignupConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "dark:text-neutral-400",
                }}
                InputProps={{
                  className: "dark:text-neutral-100",
                }}
              />

              <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded p-3 text-sm">
                <p className="text-neutral-700 dark:text-neutral-300 text-xs">
                  <strong>Password requirements:</strong> Minimum 6 characters
                </p>
              </div>
            </div>
          </TabPanel>
        </DialogContent>

        <DialogActions className="border-t border-neutral-200 dark:border-neutral-700 p-4">
          <Button onClick={handleDialogClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={authMode === "login" ? handleLogin : handleSignUp}
            disabled={loading}
            variant="contained"
            className="bg-brand-500 hover:bg-brand-600 text-white"
          >
            {loading ? (authMode === "login" ? "Signing in..." : "Creating account...") : (authMode === "login" ? "Sign In" : "Sign Up")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
