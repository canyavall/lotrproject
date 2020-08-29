import app from './app'

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running properly at https://localhost:${PORT}`);
});