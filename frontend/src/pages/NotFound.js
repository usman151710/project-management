const { Result } = require("antd")

const NotFound = () => {
    return (
        <div className="not-found">
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
            />
        </div>
    )
}

export default NotFound;