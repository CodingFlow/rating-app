import { HttpError, PageProps } from "fresh";

export default function ErrorPage(props: PageProps) {
    const error = props.error; // Contains the thrown Error or HTTPError
    if (error instanceof HttpError) {
        const status = error.status; // HTTP status code

        // Render a 404 not found page
        if (status === 404) {
            return <h1>404 - Page not found</h1>;
        }

        if (status === 500) {
            return (
                <div style={{ padding: "2rem", fontFamily: "monospace" }}>
                    <h1>500 Internal Error</h1>
                    <p>Caught in _500.tsx:</p>
                    <pre style={{ background: "#eee", padding: "1rem" }}>
            {error instanceof Error ? error.stack : String(error)}
                    </pre>
                </div>
            );
        }
    }

    return (
        <div>
            <h1>Oh no...</h1>
            <p>Error statuscode: {(error as Error).cause}</p>
            <p>Error statuscode: {(error as Error).message}</p>
            <p>Error statuscode: {(error as Error).stack}</p>
        </div>
    );
}
