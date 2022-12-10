import {QueryClient, QueryClientProvider} from "react-query";

const Querystate = (props) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {props.children}
        </QueryClientProvider>
    )
}

export default Querystate;