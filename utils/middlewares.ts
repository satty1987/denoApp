const NOT_FOUND = ({ response }: { response: any }) => {
    response.status = 404;
    response.body = { msg: "Not Found" };
};

const ERROR_HANDLER = async ({ response }: { response: any }, nextFn: any) => {
    try {
        await nextFn();
    } catch (err) {
        response.status = 500;
        response.body = { msg: err.message };
    }
};

export { NOT_FOUND, ERROR_HANDLER }