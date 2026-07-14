type SessionsPageProps = {
    searchParams: Promise<{
        year?: string;
        month?: string;
        day?: string;
    }>;
};

export default async function SessionsPage({
    searchParams,
}: SessionsPageProps) {

    const params = await searchParams;

    return (
        <main style={{ padding: "30px" }}>
            <h1>Sessions</h1>

            <p>
                {params.day}/{params.month}/{params.year}
            </p>
        </main>
    );
}