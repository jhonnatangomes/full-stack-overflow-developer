import app from "./app";

app.listen(process.env.PORT, () => {
    console.log(`Server running in PORT ${process.env.PORT}`);
    console.log(`Application running in ${process.env.NODE_ENV} mode`);
})