// import "@/styles/index.scss";

// export default function App({ Component, pageProps }) {
//     return <Component {...pageProps} />;
// }
import "../styles/index.scss";
import { Provider } from "react-redux";
import store from "../App/store";
function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
export default App;
