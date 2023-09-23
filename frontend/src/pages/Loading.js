const { Spin } = require("antd")

const Loading = () => {
    return (
        <div className="loader">
            <Spin size="large" />
        </div>
    )
}

export default Loading;