
import { AuthPAge } from "../pages/Auth"
import { MainChatPage } from "../pages/MainChat";
import { useAuth } from "../shared/hooks/checkPage";
function App() {
  const { isAuthenticated, handleLogin } = useAuth();

   return (
    <>
          {isAuthenticated ? (
        <MainChatPage /> 
      ) : (
        <AuthPAge changePage={handleLogin} /> 
      )}
    </>
  )
}

export default App
