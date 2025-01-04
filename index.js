import app from './app.js';

app.listen(3005, () => {
    console.log("Running a graphql server at port 3005");
});

export default app;